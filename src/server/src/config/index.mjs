import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432, // Chuyển sang số
  database: process.env.DB_NAME,               // Bỏ giá trị mặc định để nó bắt buộc phải lấy từ .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;