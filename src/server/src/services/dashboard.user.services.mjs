import pool from '../config/postgres.mjs';
import { cleanText } from './search.services.mjs';

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
      const expiresAt = new Date(Date.now() + 180 * 1000);

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

export const cancelReservationById = async (userId, reservationId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

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

    if (reservation.status !== 'pending' && reservation.status !== 'reserved') {
      await client.query('ROLLBACK');
      return { 
        error: { code: 'CANNOT_CANCEL', message: 'Only pending or reserved reservations can be cancelled' },
        statusCode: 400
      };
    }

    await client.query(
      'UPDATE public.library SET available_quantity = available_quantity + 1 WHERE book_id = $1 AND branch_id = $2',
      [reservation.book_id, reservation.branch_id]
    );

    await client.query(
      'DELETE FROM public.borrow_book WHERE borrow_id = $1',
      [reservationId]
    );

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
