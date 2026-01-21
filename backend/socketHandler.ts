import {
  createChat,
  getAllUserConversations,
  getConversation,
  getUnknownUserFromConversation,
} from "./sql/createChat.ts";
import { sendMessage } from "./sql/messages.ts";
import { io } from "./server.ts";
import { Server, Socket } from "socket.io";

export const registerChatSockets = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("chat:addConversation", async (userId, senderId) => {
      const data = await createChat(userId, senderId);

      io.emit("chat:fetchConversation", userId);
    });

    socket.on("chat:sendMessage", async (userId, senderId, message) => {
      const saved = await sendMessage(userId, senderId, message);

      const conv = await getConversation(userId, senderId);
      const user = await getUnknownUserFromConversation(userId, senderId, senderId);

      let newConversation = {
        ...user,
        ...conv[0],
      };

      io.emit("chat:fetchMessage", newConversation);
    });

    socket.on("disconnect", () => {});
  });
};
