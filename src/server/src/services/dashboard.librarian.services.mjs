import pool from '../config/postgres.mjs';


/**
 * Find a borrow record by PIN (must not be expired)
 * @param {string} pin - The 6-digit PIN
 * @param {string} [status='pending'] - Expected borrow_book status ('pending' for borrow, 'pending_return' for return)
 */
export const verifyReturnPin = async (pin) => {
  const record = await findBorrowRecordByPin(pin, 'pending_return');
  if (!record) {
    return { error: { code: 'PIN_NOT_FOUND', message: 'The PIN has expired or does not exist.' }, statusCode: 404 };
  }

  return {
    borrowId: record.borrow_id,
    borrower: {
      username: record.username,
      gender: record.gender,
      phone_number: record.phone_number,
      email: record.email,
      birth_date: record.birth_date
    },
    book: {
      title: record.book_title,
      author: Array.isArray(record.book_author) ? record.book_author.join(', ') : record.book_author,
      publisher: record.book_publisher,
      genres: Array.isArray(record.book_genres) ? record.book_genres.join(', ') : record.book_genres,
      image_url: record.image_url,
      price: record.book_price
    },
    borrowing: {
      reserve_date: record.reserve_date,
      borrow_date: record.borrow_date,
      due_date: record.due_date
    }
  };
};

export const getOutstandingDebts = async (search) => {
  try {
    let query = `
      SELECT bp.penalty_id, bp.borrow_id, bp.user_id, bp.issue, bp.description,
             bp.penalty_amount, bp.record_date, bp.is_paid, u.username
      FROM public.book_penalty bp
      JOIN public.users u ON bp.user_id = u.user_id
      WHERE bp.is_paid = false
    `;
    const params = [];

    if (search) {
      query += ` AND u.username ILIKE $1`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY bp.record_date DESC`;

    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching outstanding debts:', error);
    throw error;
  }
};

export const confirmPayment = async (penaltyId) => {
  try {
    const check = await pool.query(
      `SELECT penalty_id, is_paid FROM public.book_penalty WHERE penalty_id = $1`,
      [penaltyId]
    );

    if (check.rows.length === 0) {
      return { error: { code: 'NOT_FOUND', message: 'Penalty record not found' }, statusCode: 404 };
    }

    if (check.rows[0].is_paid) {
      return { error: { code: 'ALREADY_PAID', message: 'This penalty has already been paid' }, statusCode: 409 };
    }

    const result = await pool.query(
      `UPDATE public.book_penalty SET is_paid = true, paid_at = NOW() WHERE penalty_id = $1 RETURNING paid_at`,
      [penaltyId]
    );

    return { penalty_id: penaltyId, is_paid: true, paid_at: result.rows[0].paid_at };
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

export const confirmReturn = async (borrowId, branchId, conditions, description, isLost) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const recordRes = await client.query(
      `SELECT bb.user_id, bb.book_id, bb.borrow_date, bb.due_date, b.price
       FROM public.borrow_book bb
       JOIN public.books b ON bb.book_id = b.book_id
       WHERE bb.borrow_id = $1 AND bb.status = 'pending_return'`,
      [borrowId]
    );

    if (recordRes.rows.length === 0) {
      await client.query('ROLLBACK');
      return { error: { code: 'NOT_FOUND', message: 'Borrow record not found or not in pending_return status' }, statusCode: 404 };
    }

    const { user_id, book_id, due_date, price } = recordRes.rows[0];
    const returnDate = new Date();
    const isOverdue = due_date ? returnDate > new Date(due_date) : false;
    const overdueDays = isOverdue ? Math.ceil((returnDate - new Date(due_date)) / (1000 * 60 * 60 * 24)) : 0;

    let penaltyAmount = 0;
    let issue = null;
    let returnId = null;

    if (isLost) {
      penaltyAmount = price * 2;
      if (isOverdue) {
        const overdueCost = 0.05 * price + Math.max(0, overdueDays - 3) * 0.02 * price;
        penaltyAmount += overdueCost;
      }
      issue = 'lost';
    } else if (conditions && conditions.length > 0 && !conditions.includes('perfect_condition')) {
      const damageCoefficients = {
        'slight_cover_scratches': 0.05,
        'folded_pages': 0.10,
        'pencil_marks': 0.15,
        'ink_marks': 0.40,
        'torn_pages': 0.50,
        'water_damage': 0.70,
        'damaged_binding': 0.30,
        'missing_mats': 0.30,
        'missing_pages': 1.00
      };

      const coefficients = conditions.map(c => damageCoefficients[c] || 0).filter(c => c > 0);
      const m_max = Math.max(...coefficients, 0);
      const N_errors = conditions.length;
      const Fee_admin = 1;
      const Fee_addon = 0.5;

      let damageCost = (coefficients.length > 0 ? m_max : 0) * price + Fee_admin + (N_errors - 1) * Fee_addon;
      damageCost = Math.max(0, damageCost);
      damageCost = Math.min(damageCost, price * 2);

      penaltyAmount = damageCost;
      issue = 'damaged';

      if (isOverdue) {
        const overdueCost = 0.05 * price + Math.max(0, overdueDays - 3) * 0.02 * price;
        penaltyAmount = damageCost + overdueCost;
        issue = 'combined';
      }
    }

    if (isOverdue && penaltyAmount === 0) {
      const overdueCost = 0.05 * price + Math.max(0, overdueDays - 3) * 0.02 * price;
      penaltyAmount = overdueCost;
      issue = 'overdue';
    }

    const isPerfect = conditions && conditions.includes('perfect_condition');

    if (isLost) {
      if (!issue || !['overdue', 'damaged', 'lost', 'combined'].includes(issue)) {
        await client.query('ROLLBACK');
        return { error: { code: 'INVALID_ISSUE', message: 'Invalid penalty issue type for lost book' }, statusCode: 500 };
      }
      await client.query(
        `INSERT INTO public.book_penalty (borrow_id, user_id, issue, description, record_date, penalty_amount)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [borrowId, user_id, issue, description, returnDate, penaltyAmount]
      );
    } else {
      if (penaltyAmount > 0) {
        if (!issue || !['overdue', 'damaged', 'lost', 'combined'].includes(issue)) {
          await client.query('ROLLBACK');
          return { error: { code: 'INVALID_ISSUE', message: 'Invalid penalty issue type' }, statusCode: 500 };
        }
        const penaltyRes = await client.query(
          `WITH new_return AS (
             INSERT INTO public.return_book (borrow_id, branch_id, return_date, is_overdue)
             VALUES ($1, $2, $3, $4) RETURNING return_id
           )
           INSERT INTO public.book_penalty (borrow_id, return_id, user_id, issue, description, record_date, penalty_amount)
           SELECT $1, return_id, $5, $6, $7, $3, $8 FROM new_return
           RETURNING return_id`,
          [borrowId, branchId, returnDate, isOverdue, user_id, issue, description, penaltyAmount]
        );
        returnId = penaltyRes.rows[0].return_id;
      } else {
        const returnIdRes = await client.query(
          `INSERT INTO public.return_book (borrow_id, branch_id, return_date, is_overdue)
           VALUES ($1, $2, $3, $4) RETURNING return_id`,
          [borrowId, branchId, returnDate, isOverdue]
        );
        returnId = returnIdRes.rows[0].return_id;
      }

      if (!isLost) {
        await client.query(
          `UPDATE public.library SET available_quantity = available_quantity + 1 WHERE book_id = $1 AND branch_id = $2`,
          [book_id, branchId]
        );
      }
    }

    await client.query(
      `UPDATE public.users SET borrow_num = GREATEST(borrow_num - 1, 0) WHERE user_id = $1`,
      [user_id]
    );

    await client.query(
      `UPDATE public.borrow_book SET pin = NULL, expired_at = NULL WHERE borrow_id = $1`,
      [borrowId]
    );

    await client.query('COMMIT');

    return {
      success: true,
      data: {
        returnId: isLost ? null : returnId,
        penaltyId: null,
        penaltyAmount,
        issue,
        inventoryUpdated: !isLost
      }
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error confirming return:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const findBorrowRecordByPin = async (pin, status = 'pending') => {


  const query = `
    SELECT
      bb.borrow_id,
      bb.user_id,
      bb.branch_id,
      bb.book_id,
      bb.status,
      bb.reserve_date,
      bb.borrow_date,
      bb.due_date,
      u.username,
      u.gender,
      u.phone_number,
      u.email,
      u.birth_date,
      b.title as book_title,
      b.author as book_author,
      b.publisher as book_publisher,
      b.genres as book_genres,
      b.image_url,
      b.price as book_price
    FROM public.borrow_book bb
    JOIN public.users u ON bb.user_id = u.user_id
    JOIN public.books b ON bb.book_id = b.book_id
    WHERE bb.pin = $1 AND bb.expired_at > NOW() AND bb.status = $2
  `;

  const params = [pin, status];


  const result = await pool.query(query, params);


  if (result.rows.length > 0) {


  } else {


  }
  return result.rows.length > 0 ? result.rows[0] : null;
};


/**
 * Check if a user is eligible to borrow (no overdue books, not suspended)
 */
export const checkUserEligibility = async (userId) => {
  const overdueQuery = `
    SELECT COUNT(*) as overdue_count
    FROM public.borrow_book
    WHERE user_id = $1 AND status = 'borrowed' AND due_date < NOW()
  `;
  const userQuery = `SELECT user_id FROM public.users WHERE user_id = $1`;


  const [overdueRes, userRes] = await Promise.all([
    pool.query(overdueQuery, [userId]),
    pool.query(userQuery, [userId])
  ]);


  if (userRes.rows.length === 0) {
    return { eligible: false, reason: 'User not found.' };
  }


  const overdueCount = parseInt(overdueRes.rows[0].overdue_count);
  if (overdueCount > 0) {
    return { eligible: false, reason: 'User has overdue books.' };
  }


  return { eligible: true, reason: 'User is eligible.' };
};


/**
 * Verify a PIN and return borrower + book details with branch check
 */
export const verifyPin = async (pin, librarianBranchId) => {



  const record = await findBorrowRecordByPin(pin);
  if (!record) {


    return { error: { code: 'PIN_NOT_FOUND', message: 'The PIN has expired or does not exist.' }, statusCode: 404 };
  }


  if (record.branch_id !== librarianBranchId) {


    return { error: { code: 'WRONG_BRANCH', message: 'You have arrived at the wrong book borrowing branch.' }, statusCode: 403 };
  }


  return {
    borrowId: record.borrow_id,
    borrower: {
      username: record.username,
      gender: record.gender,
      phone_number: record.phone_number,
      email: record.email
    },
    book: {
      title: record.book_title,
      author: Array.isArray(record.book_author) ? record.book_author.join(', ') : record.book_author,
      publisher: record.book_publisher,
      genre: Array.isArray(record.book_genres) ? record.book_genres.join(', ') : record.book_genres,
      price: record.book_price
    }
  };
};


/**
 * Confirm a borrowing: update status to borrowed, set due_date, create calendar event, nullify expired_reserve
 */
export const confirmBorrowing = async (borrowId) => {



  const client = await pool.connect();
  try {
    await client.query('BEGIN');



    const recordQuery = 'SELECT user_id, book_id, branch_id FROM public.borrow_book WHERE borrow_id = $1';
    const recordRes = await client.query(recordQuery, [borrowId]);



    if (recordRes.rows.length === 0) {


      await client.query('ROLLBACK');
      return { error: { code: 'NOT_FOUND', message: 'Borrow record not found.' }, statusCode: 404 };
    }


    const { user_id, book_id } = recordRes.rows[0];



    const eligibility = await checkUserEligibility(user_id);


    if (!eligibility.eligible) {


      await client.query('ROLLBACK');
      return { error: { code: 'USER_INELIGIBLE', message: 'Borrower has overdue books or is suspended. Cannot confirm borrowing.' }, statusCode: 409 };
    }


    const updateQuery = `
      UPDATE public.borrow_book
      SET status = 'borrowed', borrow_date = NOW(), due_date = NOW() + INTERVAL '14 days', pin = NULL, expired_at = NULL
      WHERE borrow_id = $1
      RETURNING due_date
    `;
    const updateRes = await client.query(updateQuery, [borrowId]);



    if (updateRes.rows.length === 0) {


      await client.query('ROLLBACK');
      return { error: { code: 'UPDATE_FAILED', message: 'Failed to update borrow record.' }, statusCode: 500 };
    }


    const dueDate = updateRes.rows[0].due_date;



    await client.query('COMMIT');



    return { borrowId, status: 'borrowed', due_date: dueDate };
  } catch (error) {


    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


/**
 * Cancel a borrowing: delete borrow record and increment book quantity
 */
export const cancelBorrowing = async (borrowId) => {



  const client = await pool.connect();
  try {
    await client.query('BEGIN');



    const recordQuery = 'SELECT book_id, branch_id, user_id FROM public.borrow_book WHERE borrow_id = $1';
    const recordRes = await client.query(recordQuery, [borrowId]);



    if (recordRes.rows.length === 0) {


      await client.query('ROLLBACK');
      return { error: { code: 'NOT_FOUND', message: 'Borrow record not found.' }, statusCode: 404 };
    }


    const { book_id, branch_id, user_id } = recordRes.rows[0];



    await client.query(
      'DELETE FROM public.borrow_book WHERE borrow_id = $1',
      [borrowId]
    );



    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity + 1 WHERE book_id = $1 AND branch_id = $2',
      [book_id, branch_id]
    );



    await client.query(
      'UPDATE public.users SET borrow_num = GREATEST(borrow_num - 1, 0) WHERE user_id = $1',
      [user_id]
    );



    await client.query('COMMIT');



    return { borrowId, status: 'cancelled' };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Fetch all borrow/pickup records from public.borrow_book joined with books, users, branches
 */
export const getPickupsService = async () => {
  const query = `
    SELECT 
      bb.borrow_id,
      bb.user_id,
      bb.book_id,
      bb.branch_id,
      bb.reserve_date,
      bb.borrow_date,
      bb.due_date,
      bb.pin,
      bb.expired_at,
      bb.status,
      b.title as book_title,
      b.isbn as book_isbn,
      b.image_url as book_image_url,
      u.username,
      u.email,
      u.avatar,
      br.name as branch_name,
      br.name_short
    FROM public.borrow_book bb
    JOIN public.books b ON bb.book_id = b.book_id
    JOIN public.users u ON bb.user_id = u.user_id
    JOIN public.branches br ON bb.branch_id = br.branch_id
    ORDER BY bb.reserve_date DESC, bb.expired_at ASC
  `;

  const res = await pool.query(query);
  return res.rows.map((r) => ({
    borrow_id: r.borrow_id,
    user_id: r.user_id,
    book_id: r.book_id,
    branch_id: r.branch_id,
    reserve_date: r.reserve_date,
    borrow_date: r.borrow_date,
    due_date: r.due_date,
    pin: r.pin,
    expired_at: r.expired_at,
    status: r.status,
    book_title: r.book_title || 'Untitled',
    book_isbn: r.book_isbn || 'N/A',
    book_image_url: r.book_image_url || '/BookCover.png',
    username: r.username || 'User',
    email: r.email || '',
    avatar: r.avatar || null,
    branch_name: r.branch_name,
    name_short: r.name_short || `CS${r.branch_id}`
  }));
};

