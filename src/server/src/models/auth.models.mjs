import pool from '../config/postgres.mjs';

// ─── users ────────────────────────────────────────────────────────────────────

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

// ─── pending_users ────────────────────────────────────────────────────────────

export const getPendingByToken = async (token) => {
  const result = await pool.query(
    'SELECT * FROM pending_users WHERE token = $1',
    [token]
  );
  return result.rows[0] || null;
};

export const getPendingByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM pending_users WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const deletePendingByToken = async (token, client = pool) => {
  await client.query('DELETE FROM pending_users WHERE token = $1', [token]);
};

export const deletePendingByEmail = async (email) => {
  await pool.query('DELETE FROM pending_users WHERE email = $1', [email]);
};

export const insertUserFromPending = async ({ email, passwordHash, username }, client = pool) => {
  const result = await client.query(
    `INSERT INTO users (email, password_hash, username, phone_number, avatar, role)
     VALUES ($1, $2, $3, NULL, NULL, 'user')
     RETURNING user_id, email, username, phone_number, avatar, role`,
    [email, passwordHash, username]
  );
  return result.rows[0];
};

// ─── otp_store ────────────────────────────────────────────────────────────────

// UPSERT: nếu email đã có row thì ghi đè (user gửi lại OTP)
export const saveOtpDB = async (email, otp, expiredAt) => {
  await pool.query(
    `INSERT INTO otp_store (email, otp, expired_at, verified)
     VALUES ($1, $2, $3, false)
     ON CONFLICT (email) DO UPDATE
       SET otp        = EXCLUDED.otp,
           expired_at = EXCLUDED.expired_at,
           verified   = false`,
    [email, otp, expiredAt]
  );
};

export const getOtpDB = async (email) => {
  const result = await pool.query(
    'SELECT * FROM otp_store WHERE email = $1',
    [email]
  );
  return result.rows[0] || null;
};

export const markVerifiedDB = async (email, newExpiredAt) => {
  await pool.query(
    `UPDATE otp_store
     SET verified = true, expired_at = $2
     WHERE email = $1`,
    [email, newExpiredAt]
  );
};

export const deleteOtpDB = async (email) => {
  await pool.query('DELETE FROM otp_store WHERE email = $1', [email]);
};

