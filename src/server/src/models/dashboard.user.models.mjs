import pool from '../config/postgres.mjs';

const findEventsByMonth = async (userId, month, year) => {
  const result = await pool.query(
    `SELECT event_id, title, event_date, event_time, location, event_type, description
     FROM calendar_events
     WHERE user_id = $1 AND EXTRACT(MONTH FROM event_date) = $2 AND EXTRACT(YEAR FROM event_date) = $3
     ORDER BY event_date, event_time`,
    [userId, month, year]
  );
  return result.rows;
};

const findEventsByDateRange = async (userId, startDate, endDate) => {
  const result = await pool.query(
    `SELECT event_id, title, event_date, event_time, location, event_type, description
     FROM calendar_events
     WHERE user_id = $1 AND event_date >= $2 AND event_date <= $3
     ORDER BY event_date, event_time`,
    [userId, startDate, endDate]
  );
  return result.rows;
};

const insertEvent = async (userId, { title, date, time, location, type, description }) => {
  const result = await pool.query(
    `INSERT INTO calendar_events (user_id, title, event_date, event_time, location, event_type, description)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING event_id, title, event_date, event_time, location, event_type, description`,
    [userId, title, date, time || null, location || null, type, description || null]
  );
  return result.rows[0];
};

export { findEventsByMonth, findEventsByDateRange, insertEvent };
