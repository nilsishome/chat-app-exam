import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import type { credentialsSignUp, credentialsSignIn, credentialsFromDB } from "../types";

export const signUpDataToDb = async (credentials: credentialsSignUp) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL,
      email VARCHAR UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      password VARCHAR NOT NULL,
      image VARCHAR DEFAULT ''
    );
  `);

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`,
    [credentials.username, credentials.email, credentials.password],
  );
};

export const validateSignInFromDb = async (credentials: credentialsSignIn) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [credentials.email]);

  if (rows.length === 0) {
    console.error("error: Finns ingen matchning på användare i DB!");
    return {
      ok: false,
      error: {
        email: "E-postadressen är inte registrerad",
        password: "",
      },
    };
  }

  const user: credentialsFromDB = rows[0];

  const isValid = await bcrypt.compare(credentials.password, user.password);

  if (!isValid) {
    console.error("error: Inkorrekt lösenord för användare!");
    return {
      ok: false,
      error: {
        email: "",
        password: "Lösenordet är inkorrekt",
      },
    };
  }

  return {
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      image: user.image,
    },
  };
};

export const validateSignUpFromClient = (credentials: credentialsSignUp) => {
  let valid: boolean = true;

  const isValidEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!credentials.email) {
    console.error("error: E-post krävs");
    valid = false;
  } else if (!isValidEmail.test(credentials.email)) {
    console.error("error: Ogiltig e-postadress");
    valid = false;
  }

  if (!credentials.username) {
    console.error("error: Användarnamn krävs");
    valid = false;
  } else if (credentials.username.length < 2) {
    console.error("error: Minst 2 tecken");
    valid = false;
  }

  if (!credentials.password) {
    console.error("error: Lösenord krävs");
    valid = false;
  } else if (credentials.password.length < 6) {
    console.error("error: Minst 6 tecken");
    valid = false;
  }

  return valid;
};

export const hashPass = async (pass: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};

export const jwtToken = (id: number, name: string) => {
  try {
    return jwt.sign(
      {
        userId: id,
        name: name,
      },
      String(process.env.JWT_SECRET),
      { expiresIn: "1h" },
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

export const deleteUserFromDatabase = async (userId) => {
  const result = await pool.query(
    `
    DELETE FROM 
      users
    WHERE
      id = $1;
    `,
    [userId],
  );

  return result;
};
