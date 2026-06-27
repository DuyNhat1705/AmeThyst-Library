import pool from '../config/postgres.mjs';
import { cleanText, buildFilterSQL } from './search.services.mjs';

/**
 * Lấy chi tiết một cuốn sách bằng ID
 */
export const getBookById = async (id) => {
  const query = `
    SELECT 
      b.*, 
      EXTRACT(YEAR FROM b.publication_date)::INTEGER AS publication_year, 
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
    .filter(row => row.branch_name) // Loại bỏ nếu null
    .map(row => ({
      location: row.branch_name,
      address: row.branch_address,
      shelf: row.shelf || 'N/A',
      availableCopies: row.available_quantity !== undefined ? row.available_quantity : 0
    }));

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
    inventory: inventory
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
 * Xử lý đặt sách
 */
export const createReservation = async (userId, book_id) => {
  // Kiểm tra tồn kho
  const checkQuery = 'SELECT available_quantity FROM public.library WHERE book_id = $1 AND available_quantity > 0';
  const checkRes = await pool.query(checkQuery, [book_id]);
  
  if (checkRes.rows.length === 0) {
    return { error: 'Book currently unavailable for reservation' };
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Giảm số lượng khả dụng
    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity - 1 WHERE book_id = $1',
      [book_id]
    );
    
    // Giả lập lưu reservation (Database schema hiện tại chưa có bảng reservations riêng biệt rõ ràng như logic cũ, 
    // chúng ta sẽ follow theo logic borrow_book nếu cần, nhưng tạm thời giữ logic response thành công)
    
    await client.query('COMMIT');
    return { 
      reservation: {
        id: `res_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        bookId: book_id,
        status: 'confirmed'
      }
    };
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
