import pool from '../config/postgres.mjs';
import { cleanText, buildFilterSQL } from './search.services.mjs';
import { invalidateUserRecommendationCache, getUserRecommendations } from './recommendation.services.mjs';

export const MAX_BORROW_LIMIT = 5;

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
      WHERE bb.user_id = $1 AND bb.book_id = $2 AND bb.status IN ('reserved', 'pending', 'borrowed')
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

  // 1. Pack unified configurations directly into the helper call starting at index 1
  const searchFilters = {
    genres,
    branches,
    availableOnly,
    publicationDate: { start: startYear, end: endYear }
  };

  let { sql: filterSql, params: queryParams, nextIdx: paramIndex } = buildFilterSQL(searchFilters, 1);

  // 2. Strip leading ' AND ' to construct pristine SQL conditional blocks
  let finalWhereString = '';
  if (filterSql) {
    finalWhereString = `WHERE ${filterSql.replace(/^\s*AND\s*/i, '')}`;
  }

  // 3. Prepare Dynamic Pagination Indices
  const limitParam = `$${paramIndex++}`;
  const offsetParam = `$${paramIndex++}`;
  
  const countQuery = `
    SELECT COUNT(DISTINCT b.book_id) 
    FROM public.books b
    LEFT JOIN public.library l ON b.book_id = l.book_id
    ${finalWhereString}
  `;

  const booksQuery = `
    SELECT DISTINCT b.book_id, b.title, b.author, b.isbn, b.image_url
    FROM public.books b
    LEFT JOIN public.library l ON b.book_id = l.book_id
    ${finalWhereString}
    ORDER BY b.title ASC
    LIMIT ${limitParam} OFFSET ${offsetParam}
  `;

  // 4. Execute Queries concurrently
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
export const getRecommendations = async (id, limit = 20) => {
  const recQuery = `
    SELECT book_id, title, author, isbn, image_url
    FROM public.books 
    WHERE book_id != $1
    ORDER BY RANDOM()
    LIMIT $2
  `;
  const recRes = await pool.query(recQuery, [id, limit]);
  
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
  // 1. Fetch current book's genres
  const bookQuery = 'SELECT genres FROM public.books WHERE book_id = $1';
  const bookRes = await pool.query(bookQuery, [id]);
  
  if (bookRes.rows.length === 0 || !bookRes.rows[0].genres || bookRes.rows[0].genres.length === 0) {
    // Fallback: If no genres found, return random books
    return getRecommendations(id, 20);
  }
  
  const genres = bookRes.rows[0].genres;
  
  // 2. Query books in the same genres (ordered by RANDOM)
  const recQuery = `
    SELECT book_id, title, author, isbn, image_url
    FROM public.books 
    WHERE book_id != $1 AND genres && $2
    ORDER BY RANDOM()
    LIMIT 20
  `;
  const recRes = await pool.query(recQuery, [id, genres]);
  
  // Fallback: If no related books found in same genres, return random books
  if (recRes.rows.length === 0) {
    return getRecommendations(id, 20);
  }
  
  return recRes.rows.map(book => ({
    id: book.book_id,
    title: cleanText(book.title),
    author: book.author ? book.author.map(cleanText).join(', ') : 'Unknown Author',
    coverImage: book.image_url || null
  }));
};
export const createReservation = async (userId, bookId, branchId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userCheck = await client.query('SELECT user_id FROM public.users WHERE user_id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'USER_NOT_FOUND', message: 'User account not found. Please re-login.' },
        statusCode: 404
      };
    }

    // 0.5 Check user's borrow_num against limit
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

    if (available_quantity <= 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'BOOK_UNAVAILABLE', message: 'No available copies at the selected branch' },
        statusCode: 400
      };
    }

    const duplicateQuery = `
      SELECT borrow_id FROM public.borrow_book 
      WHERE user_id = $1 AND book_id = $2 AND status IN ('reserved', 'pending', 'borrowed')
    `;
    const duplicateResult = await client.query(duplicateQuery, [userId, bookId]);
    
    if (duplicateResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'ALREADY_RESERVED', message: 'You already have an active reservation or borrow for this book' },
        statusCode: 400
      };
    }

    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity - 1 WHERE book_id = $1 AND branch_id = $2',
      [bookId, branchId]
    );

    const insertQuery = `
      INSERT INTO public.borrow_book (user_id, book_id, branch_id, status)
      VALUES ($1, $2, $3, 'reserved')
      RETURNING borrow_id, reserve_date
    `;
    const insertResult = await client.query(insertQuery, [userId, bookId, branchId]);
    const { borrow_id, reserve_date } = insertResult.rows[0];

    await client.query(
      'UPDATE public.users SET borrow_num = borrow_num + 1 WHERE user_id = $1',
      [userId]
    );

    const branchQuery = 'SELECT name, address FROM public.branches WHERE branch_id = $1';
    const branchResult = await client.query(branchQuery, [branchId]);
    const { name: branchName, address: branchAddress } = branchResult.rows[0];

    const shelf = inventoryResult.rows[0].shelf || 'N/A';

    await client.query('COMMIT');

    // Invalidate recommendation cache and precompute new recommendations
    invalidateUserRecommendationCache(userId);
    if (process.env.NODE_ENV !== 'test') {
      getUserRecommendations(userId).catch(err =>
        console.error(`[Precompute] Failed to precompute after reservation for user ${userId}:`, err)
      );
    }

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

/**
 * Automatically cancel reservations that have been in 'reserved' status
 * for more than 7 days (reserve_date + 7 days < NOW()).
 * Deletes the borrow_book record, restores available_quantity, and decrements borrow_num.
 */
export const cleanupExpiredReservations = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const expiredQuery = `
      SELECT borrow_id, book_id, branch_id, user_id
      FROM public.borrow_book
      WHERE status = 'reserved' AND reserve_date + INTERVAL '7 days' < NOW()
      FOR UPDATE
    `;
    const expired = await client.query(expiredQuery);

    if (expired.rows.length === 0) {
      await client.query('COMMIT');
      return 0;
    }

    const ids = expired.rows.map(r => r.borrow_id);
    await client.query(
      'DELETE FROM public.borrow_book WHERE borrow_id = ANY($1)',
      [ids]
    );

    const perBranch = {};
    const perUser = {};
    for (const row of expired.rows) {
      const key = `${row.book_id}:${row.branch_id}`;
      perBranch[key] = perBranch[key] || { book_id: row.book_id, branch_id: row.branch_id, count: 0 };
      perBranch[key].count++;
      perUser[row.user_id] = (perUser[row.user_id] || 0) + 1;
    }

    for (const b of Object.values(perBranch)) {
      await client.query(
        'UPDATE public.library SET available_quantity = available_quantity + $1 WHERE book_id = $2 AND branch_id = $3',
        [b.count, b.book_id, b.branch_id]
      );
    }

    for (const [userId, count] of Object.entries(perUser)) {
      await client.query(
        'UPDATE public.users SET borrow_num = GREATEST(borrow_num - $1, 0) WHERE user_id = $2',
        [count, userId]
      );
    }

    await client.query('COMMIT');
    return expired.rows.length;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error cleaning up expired reservations:', error);
    return 0;
  } finally {
    client.release();
  }
};


