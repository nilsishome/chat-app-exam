import express from "express";
import type { Request, Response } from "express";
import { hashPass, signUpDataToDb, validateSignIn, validateSignUp } from "../sql/auth-db";

const authRouter = express.Router();

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  if (validateSignUp(credentials)) {
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

authRouter.post("/sign-in", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  const userInfo = await validateSignIn(credentials);

  if (userInfo === credentials) {
    res.json({
      message: "SUCCESS!!!",
    });
    return;
  }
  res.status(404).json({
    error: userInfo,
  });
});

export default authRouter;
