import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'lib_admin',
  password: process.env.DB_PASSWORD || 'Methyst1306',
  host: 'localhost',
  database: process.env.DB_NAME || 'library_db',
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
});

export default pool;
