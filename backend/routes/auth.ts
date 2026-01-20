import express from "express";
import type { Request, Response } from "express";
import {
  hashPass,
  jwtToken,
  signUpDataToDb,
  validateSignInFromDb,
  validateSignUpFromClient,
} from "../sql/auth-db";

const authRouter = express.Router();

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  if (!validateSignUpFromClient(credentials)) {
    res.status(400).json({
      error: "Felaktiga kontouppgifter!",
    });
    return;
  }

  credentials.password = await hashPass(credentials.password);

  await signUpDataToDb(credentials);

  res.status(201).json({
    message: "Ny användare skapad!",
  });
});

authRouter.post("/sign-in", async (req: Request, res: Response) => {
  const { credentials } = req.body;

  const result = await validateSignInFromDb(credentials);

  if (!result.ok) {
    res.status(404).json({
      error: result.error,
    });
    return;
  } else if (result.user) {
    const token = jwtToken(result.user.id, result.user.email);
    res.status(200).json({
      message: "Inloggningen lyckades!",
      user: result.user,
      token,
    });
  }
});

export default authRouter;
