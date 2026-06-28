import pool from '../config/postgres.mjs';
import { cleanText, buildFilterSQL } from './search.services.mjs';

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
    ORDER BY l.branch_id ASC
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
      WHERE bb.user_id = $1 AND bb.book_id = $2 AND bb.status IN ('reserved', 'pending')
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
export const getBooksList = async (page = 1, limit = 24, filters = {}) => {
  const offset = (page - 1) * limit;
  const { genres = [], branches = [], availableOnly = false, startYear = null, endYear = null } = filters;

  // 1. Prepare/Map filters for buildFilterSQL compatibility
  const mappedFilters = {
    genres: genres.includes('Others') ? [] : genres, 
    publicationDate: { start: startYear, end: endYear }
  };

  // Call the helper starting at index 1
  let { sql: helperSql, params: queryParams, nextIdx: paramIndex } = buildFilterSQL(mappedFilters, 1);

  // 2. Handle the specialized/missing clauses manually
  const extraClauses = [];

  // Handle the 'Others' genre logic if present
  if (genres.includes('Others')) {
    const standardGenres = ['Mathematics', 'Physics', 'Biology', 'Computer Science', 'Fiction', 'Nonfiction', 'Philosophy', 'Psychology', 'Literature'];
    const selectedStandard = genres.filter(g => g !== 'Others');
    
    let genreCondition = `(b.genres IS NULL OR NOT (b.genres && ARRAY[${standardGenres.map(g => `'${g}'`).join(',')}]))`;
    
    // If there were ALSO standard genres selected along with 'Others'
    if (selectedStandard.length > 0) {
      queryParams.push(selectedStandard);
      genreCondition = `(b.genres && $${paramIndex++} OR ${genreCondition})`;
    }
    extraClauses.push(genreCondition);
  }

  // Handle branches (Not covered by buildFilterSQL)
  if (branches.length > 0) {
    queryParams.push(branches);
    extraClauses.push(`l.branch_id = ANY($${paramIndex++})`);
  }

  // Handle availableOnly (Not covered by buildFilterSQL)
  if (availableOnly) {
    extraClauses.push(`l.available_quantity > 0`);
  }

  // 3. Combine buildFilterSQL result with extra clauses
  let finalWhereString = '';
  let allClauses = [];

  // Stripping leading ' AND ' if buildFilterSQL generated clauses
  if (helperSql) {
    allClauses.push(helperSql.replace(/^\s*AND\s*/i, ''));
  }
  if (extraClauses.length > 0) {
    allClauses.push(...extraClauses);
  }

  if (allClauses.length > 0) {
    finalWhereString = `WHERE ${allClauses.join(' AND ')}`;
  }

  // 4. Execute Queries
  const countQuery = `
    SELECT COUNT(DISTINCT b.book_id) 
    FROM public.books b
    LEFT JOIN public.library l ON b.book_id = l.book_id
    ${finalWhereString}
  `;

  const limitParam = `$${paramIndex++}`;
  const offsetParam = `$${paramIndex++}`;
  
  const booksQuery = `
    SELECT DISTINCT b.book_id, b.title, b.author, b.isbn, b.image_url
    FROM public.books b
    LEFT JOIN public.library l ON b.book_id = l.book_id
    ${finalWhereString}
    ORDER BY b.title ASC
    LIMIT ${limitParam} OFFSET ${offsetParam}
  `;

  const [countRes, booksRes] = await Promise.all([
    pool.query(countQuery, queryParams),
    pool.query(booksQuery, [...queryParams, limit, offset])
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
 * Lấy sách cùng chủ đề (genres)
 */
export const getRelatedBooks = async (id) => {
  // 1. Lấy genres của sách hiện tại
  const bookQuery = 'SELECT genres FROM public.books WHERE book_id = $1';
  const bookRes = await pool.query(bookQuery, [id]);
  
  if (bookRes.rows.length === 0 || !bookRes.rows[0].genres || bookRes.rows[0].genres.length === 0) {
    // Fallback: Nếu không có genres thì trả về random
    return getRecommendations(id);
  }
  
  const genres = bookRes.rows[0].genres;
  
  // 2. Tìm sách khác có ít nhất một genre chung (&&)
  const recQuery = `
    SELECT book_id, title, author, isbn, image_url
    FROM public.books 
    WHERE book_id != $1 AND genres && $2
    ORDER BY RANDOM()
    LIMIT 20
  `;
  const recRes = await pool.query(recQuery, [id, genres]);
  
  // Fallback: Nếu không tìm thấy sách cùng chủ đề, trả về random
  if (recRes.rows.length === 0) {
    return getRecommendations(id);
  }
  
  return recRes.rows.map(book => ({
    id: book.book_id,
    title: cleanText(book.title),
    author: book.author ? book.author.map(cleanText).join(', ') : 'Unknown Author',
    coverImage: book.image_url || null
  }));
};

/**
 * Xử lý đặt sách
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

    // 0.5 Check user's borrow_num against limit
    const MAX_BORROW_LIMIT = 5;
    const userBorrowQuery = 'SELECT borrow_num FROM public.users WHERE user_id = $1';
    const userBorrowResult = await client.query(userBorrowQuery, [userId]);
    const currentBorrowNum = userBorrowResult.rows[0].borrow_num || 0;

    if (currentBorrowNum >= MAX_BORROW_LIMIT) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'BORROW_LIMIT_EXCEEDED', message: `You have reached the maximum borrow limit of ${MAX_BORROW_LIMIT} books` },
        statusCode: 400
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
      WHERE user_id = $1 AND book_id = $2 AND status IN ('reserved', 'pending')
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

    // 5. Insert reservation into borrow_book table
    const insertQuery = `
      INSERT INTO public.borrow_book (user_id, book_id, branch_id, status)
      VALUES ($1, $2, $3, 'reserved')
      RETURNING borrow_id, reserve_date
    `;
    const insertResult = await client.query(insertQuery, [userId, bookId, branchId]);
    const { borrow_id, reserve_date } = insertResult.rows[0];

    // 6.5 Increment user's borrow_num
    await client.query(
      'UPDATE public.users SET borrow_num = borrow_num + 1 WHERE user_id = $1',
      [userId]
    );

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
        status: 'reserved'
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

    // 2. Check if reservation can be cancelled (pending or reserved)
    if (reservation.status !== 'pending' && reservation.status !== 'reserved') {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'CANNOT_CANCEL', message: 'Only pending or reserved reservations can be cancelled' },
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

    // 5. Decrement user's borrow_num
    await client.query(
      'UPDATE public.users SET borrow_num = GREATEST(borrow_num - 1, 0) WHERE user_id = $1',
      [userId]
    );

    await client.query('COMMIT');

    return {
      reservationId,
      status: 'cancelled'
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
      bb.reserve_date,
      bb.expired_at,
      bb.pin,
      b.title,
      b.author,
      b.image_url,
      br.name as branch_name,
      br.address as branch_address
    FROM public.borrow_book bb
    JOIN public.books b ON bb.book_id = b.book_id
    JOIN public.branches br ON bb.branch_id = br.branch_id
    WHERE bb.user_id = $1
    ORDER BY 
      CASE bb.status 
        WHEN 'pending' THEN 1
        WHEN 'borrowed' THEN 2
        WHEN 'reserved' THEN 3
      END,
      bb.borrow_date DESC NULLS LAST,
      bb.reserve_date DESC NULLS LAST
  `;
  const result = await pool.query(query, [userId]);
  
  const records = result.rows.map(row => ({
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
    reserveDate: row.reserve_date,
    expiresAt: row.expired_at,
    pin: row.pin || null
  }));
  
  return { current: records };
};

/**
 * Generate a 6-digit pickup PIN for a reservation
 */
export const generatePickupPin = async (userId, borrowId) => {
  try {
    const check = await pool.query(
      `SELECT borrow_id, user_id FROM public.borrow_book WHERE borrow_id = $1 AND user_id = $2 AND status IN ('reserved', 'pending')`,
      [borrowId, userId]
    );

    if (check.rows.length === 0) {
      return { error: { code: 'RESERVATION_NOT_FOUND', message: 'Reservation not found or invalid status' }, statusCode: 404 };
    }

    const active = await pool.query(
      `SELECT pin, expired_at FROM public.borrow_book WHERE borrow_id = $1 AND pin IS NOT NULL AND expired_at > NOW()`,
      [borrowId]
    );

    if (active.rows.length > 0) {
      return { pin: active.rows[0].pin, expiresAt: active.rows[0].expired_at };
    }

    await pool.query(
      `UPDATE public.borrow_book SET pin = NULL, expired_at = NULL, status = 'reserved' WHERE borrow_id = $1`,
      [borrowId]
    );

    for (let attempt = 0; attempt < 3; attempt++) {
      const pin = String(Math.floor(100000 + Math.random() * 900000));
      const expiresAt = new Date(Date.now() + 15 * 1000);

      try {
        const updated = await pool.query(
          `UPDATE public.borrow_book SET pin = $1, expired_at = $2, status = 'pending' WHERE borrow_id = $3`,
          [pin, expiresAt, borrowId]
        );

        if (updated.rowCount > 0) {
          return { pin, expiresAt };
        }
      } catch (err) {
        if (err.code === '23505') {
          continue;
        }
        throw err;
      }
    }

    return { error: { code: 'PIN_GENERATION_FAILED', message: 'Failed to generate unique PIN after 3 attempts' }, statusCode: 500 };
  } catch (error) {
    console.error('Error generating pickup PIN:', error);
    throw error;
  }
};

/**
 * Cleanup expired PINs: revert pending reservations with expired PINs back to reserved
 */
export const cleanupExpiredPins = async () => {
  try {
    const query = `
      UPDATE public.borrow_book
      SET pin = NULL, expired_at = NULL, status = 'reserved'
      WHERE status = 'pending' AND expired_at IS NOT NULL AND expired_at <= NOW()
    `;
    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    console.error('Error cleaning up expired PINs:', error);
    return 0;
  }
};

/**
 * Cleanup a specific reservation's expired PIN
 */
export const cleanupReservationPin = async (userId, borrowId) => {
  try {
    const result = await pool.query(
      `UPDATE public.borrow_book SET pin = NULL, expired_at = NULL, status = 'reserved'
       WHERE borrow_id = $1 AND user_id = $2 AND status = 'pending'`,
      [borrowId, userId]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error cleaning up reservation PIN:', error);
    return false;
  }
};

/**
 * Clear all pending PINs on server startup
 */
export const clearAllPins = async () => {
  try {
    const query = `
      UPDATE public.borrow_book
      SET pin = NULL, expired_at = NULL, status = 'reserved'
      WHERE status = 'pending'
    `;
    const result = await pool.query(query);
    return result.rowCount;
  } catch (error) {
    console.error('Error clearing all pending PINs:', error);
    return 0;
  }
};
