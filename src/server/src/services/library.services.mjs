import pool from '../config/postgres.mjs';

/**
 * Hàm dọn dẹp các ký tự lỗi mã hóa UTF-8 thường gặp trong database
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/â”€Ã©â”¬âŒ/g, 'Ré')
    .replace(/â”€Ã©â”¬Â¿/g, 'è')
    .replace(/â”€Ã©â”¬Ã¡/g, 'à')
    .replace(/â• Ã‡â•¦Ã¥/g, 'å')
    .replace(/â”œÃ³Î“Ã©Â¼Î“Ã‡Â£/g, '"')
    .replace(/â”œÃ³Î“Ã©Â¼Î“Ã‡Â¥/g, '"')
    .replace(/â”€Ã©â”¬â–“/g, 'ô')
    .replace(/â”€Ã©â”¬â”‚/g, 'ó')
    .replace(/\t/g, ' ')
    .trim();
}

/**
 * Lấy chi tiết một cuốn sách bằng ID
 */
/**
 * Lấy chi tiết một cuốn sách bằng ID
 */
export const getBookById = async (id, userId = null) => {
  const query = `
    SELECT 
      b.*, 
      EXTRACT(YEAR FROM b.publication_date)::INTEGER AS publication_year, 
      l.branch_id,
      l.shelf, 
      l.quantity, 
      l.available_quantity,
      br.name as branch_name,
      br.address as branch_address
    FROM public.books b
    LEFT JOIN public.library l ON b.book_id = l.book_id
    LEFT JOIN public.branches br ON l.branch_id = br.branch_id
    WHERE b.book_id = $1
  `;
  const result = await pool.query(query, [id]);
  
  if (result.rows.length === 0) return null;
  
  const book = result.rows[0];
  
  // Lấy danh sách các chi nhánh
  const inventory = result.rows
    .filter(row => row.branch_name)
    .map(row => ({
      branchId: row.branch_id,
      location: row.branch_name,
      address: row.branch_address,
      shelf: row.shelf || 'N/A',
      availableCopies: row.available_quantity !== undefined ? row.available_quantity : 0
    }));

  // Check for user's active reservation
  let userReservation = null;
  if (userId) {
    const reservationQuery = `
      SELECT bb.*, br.name as branch_name 
      FROM public.borrow_book bb
      JOIN public.branches br ON bb.branch_id = br.branch_id
      WHERE bb.user_id = $1 AND bb.book_id = $2 AND bb.status = 'pending'
      ORDER BY bb.reserve_date DESC LIMIT 1
    `;
    const reservationResult = await pool.query(reservationQuery, [userId, id]);
    if (reservationResult.rows.length > 0) {
      const res = reservationResult.rows[0];
      userReservation = {
        reservationId: res.borrow_id,
        branchId: res.branch_id,
        branchName: res.branch_name,
        reserveDate: res.reserve_date,
        expiresAt: res.expired_at,
        status: res.status
      };
    }
  }

  return {
    id: book.book_id,
    title: cleanText(book.title),
    author: book.author ? book.author.map(cleanText).join(', ') : 'Unknown Author',
    description: cleanText(book.description),
    isbn: book.isbn,
    language: book.language_code ? book.language_code.toUpperCase() : 'ENG',
    publisher: cleanText(book.publisher) || 'N/A',
    publicationYear: book.publication_year || 'N/A',
    numPages: book.num_pages || 'N/A',
    rating: book.rating ? `${book.rating} / 5` : 'N/A',
    coverImage: book.image_url || null,
    inventory: inventory,
    userReservation: userReservation
  };
};

/**
 * Lấy danh sách sách có phân trang
 */
export const getBooksList = async (page = 1, limit = 24) => {
  const offset = (page - 1) * limit;
  
  const countQuery = 'SELECT COUNT(*) FROM public.books';
  const booksQuery = `
    SELECT book_id, title, author, isbn, image_url
    FROM public.books 
    ORDER BY title ASC 
    LIMIT $1 OFFSET $2
  `;
  
  const [countRes, booksRes] = await Promise.all([
    pool.query(countQuery),
    pool.query(booksQuery, [limit, offset])
  ]);
  
  const totalBooks = parseInt(countRes.rows[0].count);
  
  return {
    books: booksRes.rows.map(book => ({
      id: book.book_id,
      title: cleanText(book.title),
      author: book.author ? book.author.map(cleanText).join(', ') : 'Unknown Author',
      isbn: book.isbn,
      coverImage: book.image_url || null
    })),
    totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
    currentPage: page
  };
};

/**
 * Lấy gợi ý sách ngẫu nhiên từ database để tạo tính năng khám phá sách
 */
export const getRecommendations = async (id) => {
  const recQuery = `
    SELECT book_id, title, author, isbn, image_url
    FROM public.books 
    WHERE book_id != $1
    LIMIT 6
  `;
  const recRes = await pool.query(recQuery, [id]);
  
  return recRes.rows.map(book => ({
    id: book.book_id,
    title: cleanText(book.title),
    author: book.author ? book.author.map(cleanText).join(', ') : 'Unknown Author',
    coverImage: book.image_url || null
  }));
};

/**
 * Xử lý đặt sách - Reserve a book at a specific branch
 */
export const createReservation = async (userId, bookId, branchId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 0. Check if user exists
    const userCheck = await client.query('SELECT user_id FROM public.users WHERE user_id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'USER_NOT_FOUND', message: 'User account not found. Please re-login.' },
        statusCode: 404
      };
    }

    // 1. Check if book exists at the specified branch with row locking
    const inventoryQuery = `
      SELECT available_quantity, shelf 
      FROM public.library 
      WHERE book_id = $1 AND branch_id = $2 
      FOR UPDATE
    `;
    const inventoryResult = await client.query(inventoryQuery, [bookId, branchId]);
    
    if (inventoryResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'BOOK_NOT_FOUND', message: 'Book not found at the selected branch' },
        statusCode: 404
      };
    }

    const { available_quantity } = inventoryResult.rows[0];

    // 2. Check if book is available
    if (available_quantity <= 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'BOOK_UNAVAILABLE', message: 'No available copies at the selected branch' },
        statusCode: 400
      };
    }

    // 3. Check for duplicate reservation (user cannot have multiple active reservations for same book)
    const duplicateQuery = `
      SELECT borrow_id FROM public.borrow_book 
      WHERE user_id = $1 AND book_id = $2 AND status = 'pending'
    `;
    const duplicateResult = await client.query(duplicateQuery, [userId, bookId]);
    
    if (duplicateResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'ALREADY_RESERVED', message: 'You already have an active reservation for this book' },
        statusCode: 400
      };
    }

    // 4. Decrement available quantity
    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity - 1 WHERE book_id = $1 AND branch_id = $2',
      [bookId, branchId]
    );

    // 5. Set expiration (1 week)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 6. Insert reservation into borrow_book table
    const insertQuery = `
      INSERT INTO public.borrow_book (user_id, book_id, branch_id, expired_at, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING borrow_id, reserve_date
    `;
    const insertResult = await client.query(insertQuery, [userId, bookId, branchId, expiresAt]);
    const { borrow_id, reserve_date } = insertResult.rows[0];

    // 7. Get branch name for response
    const branchQuery = 'SELECT name, address FROM public.branches WHERE branch_id = $1';
    const branchResult = await client.query(branchQuery, [branchId]);
    const { name: branchName, address: branchAddress } = branchResult.rows[0];

    // 8. Get shelf for response
    const shelf = inventoryResult.rows[0].shelf || 'N/A';

    await client.query('COMMIT');

    return {
      reservation: {
        reservationId: borrow_id,
        bookId,
        branchId,
        branchName,
        branchAddress,
        shelf,
        reserveDate: reserve_date,
        expiresAt,
        status: 'pending'
      }
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Hủy đặt sách - Cancel a reservation
 */
export const cancelReservationById = async (userId, reservationId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Check if reservation exists and belongs to user
    const checkQuery = `
      SELECT borrow_id, book_id, branch_id, status 
      FROM public.borrow_book 
      WHERE borrow_id = $1 AND user_id = $2
    `;
    const checkResult = await client.query(checkQuery, [reservationId, userId]);
    
    if (checkResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'NOT_FOUND', message: 'Reservation not found' },
        statusCode: 404
      };
    }

    const reservation = checkResult.rows[0];

    // 2. Check if reservation can be cancelled (only pending reservations)
    if (reservation.status !== 'pending') {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'CANNOT_CANCEL', message: 'Only pending reservations can be cancelled' },
        statusCode: 400
      };
    }

    // 3. Increment available quantity
    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity + 1 WHERE book_id = $1 AND branch_id = $2',
      [reservation.book_id, reservation.branch_id]
    );

    // 4. Delete reservation from borrow_book
    await client.query(
      'DELETE FROM public.borrow_book WHERE borrow_id = $1',
      [reservationId]
    );

    await client.query('COMMIT');

    return {
      reservationId,
      status: 'expired'
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Lấy danh sách mượn sách của người dùng
 */
export const getUserBorrowRecords = async (userId) => {
  const query = `
    SELECT 
      bb.borrow_id,
      bb.book_id,
      bb.branch_id,
      bb.status,
      bb.borrow_date,
      bb.due_date,
      rb.return_date,
      bb.reserve_date,
      bb.expired_at,
      b.title,
      b.author,
      b.image_url,
      br.name as branch_name,
      br.address as branch_address
    FROM public.borrow_book bb
    JOIN public.books b ON bb.book_id = b.book_id
    JOIN public.branches br ON bb.branch_id = br.branch_id
    LEFT JOIN public.return_book rb ON bb.borrow_id = rb.borrow_id
    WHERE bb.user_id = $1
    ORDER BY 
      CASE bb.status 
        WHEN 'pending' THEN 1
        WHEN 'borrowed' THEN 2
        WHEN 'expired' THEN 3
      END,
      bb.borrow_date DESC NULLS LAST,
      bb.reserve_date DESC NULLS LAST
  `;
  const result = await pool.query(query, [userId]);
  
  const current = [];
  const history = [];
  
  for (const row of result.rows) {
    const record = {
      id: row.borrow_id,
      bookId: row.book_id,
      title: cleanText(row.title),
      author: row.author ? row.author.map(cleanText).join(', ') : 'Unknown Author',
      coverImage: row.image_url || null,
      branchId: row.branch_id,
      branchName: row.branch_name,
      branchAddress: row.branch_address,
      status: row.status,
      borrowDate: row.borrow_date,
      dueDate: row.due_date,
      returnDate: row.return_date,
      reserveDate: row.reserve_date,
      expiresAt: row.expired_at
    };
    
    if (['pending', 'borrowed'].includes(row.status)) {
      current.push(record);
    } else {
      history.push(record);
    }
  }
  
  return { current, history };
};
