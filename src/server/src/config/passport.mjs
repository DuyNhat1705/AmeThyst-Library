import './env.mjs';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import pool from './postgres.mjs';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
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
        }

        return done(null, result.rows[0]);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
