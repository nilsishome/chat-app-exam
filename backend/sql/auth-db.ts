import type { Ref } from "vue";
import createPool from "../db";
import type { credentials } from "../types";

export async function signUpDataToDb(credentials: credentials) {
  const pool = createPool();

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
    [credentials.username, credentials.email, credentials.password],
  );

  await pool.end();
}

export const validate = (credentials: credentials) => {
  let valid: boolean = true;

  const isValidEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!credentials.email) {
    console.error("E-post krävs");
    valid = false;
  } else if (!isValidEmail.test(credentials.email)) {
    console.error("Ogiltig e-postadress");
    valid = false;
  }

  if (!credentials.username) {
    console.error("Användarnamn krävs");
    valid = false;
  } else if (credentials.username.length < 2) {
    console.error("Minst 2 tecken");
    valid = false;
  }

  if (!credentials.password) {
    console.error("Lösenord krävs");
    valid = false;
  } else if (credentials.password.length < 6) {
    console.error("Minst 6 tecken");
    valid = false;
  }

  return valid;
};
