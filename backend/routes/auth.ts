import express from "express";
import type { Request, Response } from "express";
import type { credentials } from "../types";

const authRouter = express.Router();

authRouter.post("/sign-up", (req: Request, res: Response) => {
  const { email, username, password }: credentials = req.body;

  const credentials = {
    email,
    username,
    password,
  };

  res.json({
    data: {
      credentials,
    },
  });
});

export default authRouter;
