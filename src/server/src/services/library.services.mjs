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
