import createPool from "../db";
import { getConversation } from "./createChat";

export const sendMessage = async (userId: number, senderId: number, message: string) => {
  const conversation = await getConversation(userId, senderId);

  let currentMessages = conversation[0].messages;
  let newMessage = {
    sender: userId,
    message: message,
    date: new Date(),
  };

  currentMessages.push(newMessage);

  const pool = createPool();

  const result = await pool.query(
    `
      UPDATE
        conversations
      SET
        "messages" = $1
      WHERE 
        "conversationid" = $2
    `,
    [JSON.stringify(currentMessages), conversation[0].conversationid],
  );

  pool.end();

  if (result.rowCount > 0) {
    return true;
  } else {
    return false;
  }
};

// export const saveMessagesToDb = async (messages, conversationId) => {
//   const pool = createPool();

//   const result = await pool.query(
//     `
//       UPDATE
//         conversations
//       SET
//         "messages" = $1
//       WHERE
//         "conversationid" = $2
//     `,
//     [JSON.stringify(messages), conversationId],
//   );

//   pool.end();

//   if (result.rowCount > 0) {
//     return true;
//   } else {
//     return false;
//   }
// };
