import express from "express";
import {
  createChat,
  getAllUserConversations,
  getUnknownUserFromConversation,
} from "../sql/createChat";
import { Request, Response } from "express";

const chatRouter = express.Router();

chatRouter.post("/create-chat", async (req: Request, res: Response) => {
  const data = await createChat(req.body.userId, req.body.senderId);

  res.json({
    message: data.message,
    success: data.response,
  });
});

chatRouter.post("/get-chats", async (req: Request, res: Response) => {
  const data = await getAllUserConversations(req.body.id);

  res.json(data);
});

chatRouter.post("/get-unknown-user", async (req: Request, res: Response) => {
  const data = await getUnknownUserFromConversation(
    req.body.myUser,
    req.body.userId,
    req.body.senderId,
  );

  res.json(data);
});

export default chatRouter;
