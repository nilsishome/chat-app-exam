import express from "express";
import { Request, Response } from "express";

const app = express();
export const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Express Server is listening on port ${port}`);
});
