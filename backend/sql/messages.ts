import createPool from "../db";
import { getConversation } from "./createChat";

export const sendMessage = async (userId: number, senderId: number, message: string) => {
  // const pool = createPool();
  const conversation = await getConversation(userId, senderId);

  let currentMessages = conversation[0].messages;

  if (currentMessages.length == 0) {
  }
};
