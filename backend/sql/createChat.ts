import { pool } from "../db";

export const createConversationDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      conversationId SERIAL PRIMARY KEY,
      userId SERIAL NOT NULL,
      senderId SERIAL NOT NULL,
      messages JSONB,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const getConversation = async (userId: number, senderId: number) => {
  const { rows } = await pool.query(
    `
    SELECT 
      *
    FROM 
      conversations
    WHERE
      (userId = $1 AND senderId = $2)
    OR
      (userId = $2 AND senderId = $1)
    `,
    [userId, senderId],
  );

  return rows;
};

export const createChat = async (userId: number, senderId: number) => {
  const conversation = await getConversation(userId, senderId);
  const validUser = await findId(senderId);

  if (validUser.length !== 0) {
    if (conversation.length === 0) {
      await pool.query(
        `INSERT INTO conversations (userId, senderId, messages) VALUES ($1, $2, $3)`,
        [userId, senderId, "[]"],
      );

      return {
        response: true,
        message: "Created a new chat between id:" + userId + " & " + senderId,
      };
    } else {
      return {
        response: false,
        message:
          "Conversation already exists. Did not create a new conversation between id: " +
          userId +
          " & " +
          senderId,
      };
    }
  } else {
    return { response: false, message: "Id: " + senderId + " is not a valid id for a user." };
  }
};

const findId = async (id: number) => {
  const { rows } = await pool.query(
    `
    SELECT 
      name
    FROM 
      users
    WHERE
      (id = $1)
    `,
    [id],
  );

  return rows;
};

export const getAllUserConversations = async (id: number) => {
  const { rows } = await pool.query(
    `
    SELECT 
      *
    FROM 
      conversations
    WHERE
      (userId = $1)
    OR
      (senderId = $1)
    `,
    [id],
  );

  return rows;
};

export const getUnknownUserFromConversation = async (
  myUser: number,
  userId: number,
  senderId: number,
) => {
  const { rows } = await pool.query(
    `
    SELECT 
      id, name
    FROM 
      users
    WHERE 
      id 
    IN 
      ($2, $3)
    AND 
      id <> $1
    `,
    [myUser, userId, senderId],
  );

  const user = rows[0];

  return {
    name: user.name,
    id: user.id,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small_2x/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
  };
};
