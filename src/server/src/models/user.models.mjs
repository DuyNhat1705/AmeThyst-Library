import pool from '../config/postgres.mjs';

const getUserById = async (userId) => {
  const result = await pool.query(
    `SELECT 
       user_id AS "userId", 
       email, 
       username, 
       phone_number AS "phoneNumber", 
       avatar, 
       role, 
       borrow_num AS "borrowNum", 
       occupation, 
       birth_date AS "birthDate", 
       gender, 
       hometown, 
       description, 
       (password_hash = 'GOOGLE_AUTH') AS "isGoogleAccount" 
     FROM users WHERE user_id = $1`,
    [userId]
  );
  return result.rows[0] || null;
};

const getUserWithPassword = async (userId) => {
  const result = await pool.query(
    'SELECT user_id, email, username, phone_number, avatar, role, password_hash FROM users WHERE user_id = $1',
    [userId]
  );
  return result.rows[0] || null;
};

const updateUser = async (userId, { username, phoneNumber, occupation, birthDate, gender, hometown, description, avatar }) => {
  const result = await pool.query(
    // phần này có nên dùng COALESCE để giữ nguyên giá trị cũ nếu không có giá trị mới được cung cấp ko, có gì sửa giúp t <3
    `UPDATE users 
     SET username = COALESCE($1, username),
         phone_number = COALESCE($2, phone_number),
         occupation = COALESCE($3, occupation),
         birth_date = COALESCE($4, birth_date),
         gender = COALESCE($5, gender),
         hometown = COALESCE($6, hometown),
         description = COALESCE($7, description),
         avatar = COALESCE($8, avatar)
     WHERE user_id = $9
     RETURNING 
       user_id AS "userId", 
       email, 
       username, 
       phone_number AS "phoneNumber", 
       avatar, 
       role,
       borrow_num AS "borrowNum",
       occupation,
       birth_date AS "birthDate",
       gender,
       hometown,
       description`,
    [username, phoneNumber, occupation, birthDate, gender, hometown, description, avatar, userId]
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
