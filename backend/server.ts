import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response } from "express";
import pool from "./db";

const app = express();
export const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.get("/test-db", async (_, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`Express Server is listening on port ${port}`);
});

import { run } from "./sql/test-db";

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
