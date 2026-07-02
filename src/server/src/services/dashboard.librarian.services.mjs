import pool from '../config/postgres.mjs';


/**
 * Find a borrow record by PIN (must not be expired)
 */
export const findBorrowRecordByPin = async (pin) => {


  const query = `
    SELECT
      bb.borrow_id,
      bb.user_id,
      bb.branch_id,
      bb.book_id,
      bb.status,
      bb.reserve_date,
      u.username,
      u.gender,
      u.phone_number,
      u.email,
      b.title as book_title,
      b.author as book_author,
      b.publisher as book_publisher,
      b.genres as book_genres,
      b.price as book_price
    FROM public.borrow_book bb
    JOIN public.users u ON bb.user_id = u.user_id
    JOIN public.books b ON bb.book_id = b.book_id
    WHERE bb.pin = $1 AND bb.expired_at > NOW()
  `;


  const result = await pool.query(query, [pin]);


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
 * Confirm a loan: update status to borrowed, set due_date, create calendar event, nullify expired_reserve
 */
export const confirmLoan = async (borrowId) => {



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
      return { error: { code: 'USER_INELIGIBLE', message: 'Borrower has overdue books or is suspended. Cannot confirm loan.' }, statusCode: 409 };
    }


    const updateQuery = `
      UPDATE public.borrow_book
      SET status = 'borrowed', due_date = NOW() + INTERVAL '14 days'
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
 * Cancel a loan: delete borrow record and increment book quantity
 */
export const cancelLoan = async (borrowId) => {



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

