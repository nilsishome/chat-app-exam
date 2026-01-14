import pool from "../db";

export async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2)`, ["Test", "test@example.com"]);
  const res = await pool.query("SELECT * FROM users");
  console.log(res.rows);
  await pool.end();
}
