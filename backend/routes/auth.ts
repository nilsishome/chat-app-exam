import express from "express";
import type { Request, Response } from "express";
import { hashPass, signUpDataToDb, validate } from "../sql/auth-db";

const authRouter = express.Router();

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  if (validate(credentials)) {
    credentials.password = await hashPass(credentials.password);

    await signUpDataToDb(credentials);

    res.status(201).json({
      message: "New user created!",
    });
    return;
  }
  res.status(400).json({
    error: "Invalid credentials!",
  });
});

export default authRouter;
