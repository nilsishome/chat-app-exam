import { pool } from "../db";

export async function run() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR NOT NULL
    );
  `);

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`,
    ["Account1", "Account1@example.com", "123"],
  );
  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`,
    ["Account2", "Account2@example.com", "123"],
  );
  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`,
    ["Account3", "Account3@example.com", "123"],
  );
}
