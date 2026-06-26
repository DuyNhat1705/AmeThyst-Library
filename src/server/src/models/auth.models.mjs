import pool from '../config/postgres.mjs';

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

const createUser = async ({ email, passwordHash, username, phoneNumber, avatar, role }) => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, username, phone_number, avatar, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id, email, username, phone_number, avatar, role`,
    [email, passwordHash, username, phoneNumber || null, avatar || null, role || 'user']
  );
  return result.rows[0];
};

export { findUserByEmail, createUser };
