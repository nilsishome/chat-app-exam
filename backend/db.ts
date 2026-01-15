import * as dotenv from "dotenv";
dotenv.config();

import pg from "pg";

const { Pool } = pg;

export default function createPool() {
  return new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_NAME,
  });
}
