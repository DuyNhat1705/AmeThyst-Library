import pool from '../config/index.mjs';

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

const createUser = async ({ email, passwordHash, username, phoneNumber, avatar }) => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, username, phone_number, avatar)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING user_id, email, username, phone_number, avatar`,
    [email, passwordHash, username, phoneNumber || null, avatar || null]
  );
  return result.rows[0];
};

export { findUserByEmail, createUser };
