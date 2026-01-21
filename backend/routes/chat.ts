import express from "express";
import {
  createChat,
  getAllUserConversations,
  getUnknownUserFromConversation,
} from "../sql/createChat";
import { Request, Response } from "express";
import { sendMessage } from "../sql/messages";

const chatRouter = express.Router();

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

chatRouter.post("/send-message", async (req: Request, res: Response) => {
  const data = await sendMessage(req.body.userId, req.body.senderId, req.body.message);

  res.json(data);
});

export default chatRouter;
