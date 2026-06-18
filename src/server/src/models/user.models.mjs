import pool from '../config/index.mjs';

const getUserById = async (userId) => {
  const result = await pool.query(
    'SELECT user_id, email, username, phone_number, avatar FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] || null;
};

const getUserWithPassword = async (userId) => {
  const result = await pool.query(
    'SELECT user_id, email, username, phone_number, avatar, password_hash FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] || null;
};

const updateUser = async (userId, { username, phoneNumber, avatar }) => {
  const result = await pool.query(
    `UPDATE users 
     SET username = COALESCE($1, username),
         phone_number = COALESCE($2, phone_number),
         avatar = COALESCE($3, avatar)
     WHERE user_id = $4
     RETURNING user_id, email, username, phone_number, avatar`,
    [username, phoneNumber, avatar, userId]
  );
  return result.rows[0];
};

const updatePassword = async (userId, passwordHash) => {
  await pool.query(
    'UPDATE users SET password_hash = $1 WHERE user_id = $2',
    [passwordHash, userId]
  );
};

export { getUserById, getUserWithPassword, updateUser, updatePassword };
