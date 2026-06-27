import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

export default pool;
