import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import createPool from "./db";
import { port } from "./config";
import authRouter from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

app.get("/test-db", async (_, res) => {
  const pool = createPool();
  await pool.connect();

  const result = await pool.query("SELECT NOW()");
  res.json(result.rows[0]);

  await pool.end();
});

app.listen(port, () => {
  console.log(`Express Server is listening on port ${port}`);
});

import { run } from "./sql/test-db";

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
