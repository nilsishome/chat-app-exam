import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { hashPass, signUpDataToDb, validateSignIn, validateSignUp } from "../sql/auth-db";

const authRouter = express.Router();

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  if (!validateSignUp(credentials)) {
    res.status(400).json({
      error: "Invalid credentials!",
    });
    return;
  }

  credentials.password = await hashPass(credentials.password);

  await signUpDataToDb(credentials);

  res.status(201).json({
    message: "New user created!",
  });
});

authRouter.post("/sign-in", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  const result = await validateSignIn(credentials);

  if (!result.ok) {
    res.status(404).json({
      error: result.error,
    });
    return;
  }

  res.json({
    message: "SUCCESS!!!",
  });
});

export default authRouter;
