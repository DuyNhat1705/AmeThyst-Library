import './env.mjs';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './postgres.mjs';

export const googleVerifyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const username = profile.displayName;
    const avatar = profile.photos?.[0]?.value ?? null;

    let result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO users (email, username, avatar, password_hash, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, email, username, avatar, role`,
        [email, username, avatar, 'GOOGLE_AUTH', 'user']
      );
    } else {
      const user = result.rows[0];
      if (user.password_hash !== 'GOOGLE_AUTH') {
        return done(null, false, { message: 'account_exists_with_password' });
      }
    }

    return done(null, result.rows[0]);
  } catch (err) {
    return done(err, null);
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    googleVerifyCallback
  )
);

export default passport;
