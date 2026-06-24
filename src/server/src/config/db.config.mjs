import pool from './postgres.mjs';

export const initPgVector = async () => {
  try {
    await pool.query("CREATE EXTENSION IF NOT EXISTS vector");
    console.log("pgvector extension verified/enabled in database");

    // Check if the query column exists, if so rename it to search_content
    const checkQueryCol = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='search_history' AND column_name='query'
    `);
    if (checkQueryCol.rows.length > 0) {
      // Drop the old array-based search_content column if it exists to avoid conflicts
      await pool.query("ALTER TABLE search_history DROP COLUMN IF EXISTS search_content;");
      // Rename query to search_content
      await pool.query("ALTER TABLE search_history RENAME COLUMN query TO search_content;");
      console.log("Database migration: renamed query to search_content in search_history table");
    }
  } catch (err) {
    console.error("Failed to verify/enable pgvector extension or run migrations:", err);
  }
};

export default pool;
