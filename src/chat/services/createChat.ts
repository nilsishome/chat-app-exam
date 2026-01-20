import type { conversation, message } from "../store/conversations";

export const createChat = async (userId: number, senderId: number) => {
  try {
    const response = await fetch("/api/chat/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        senderId: senderId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    const data = await response.json();
  } catch (errorMessage) {
    console.error(errorMessage);
  }
};

const getUserConversationsDB = async (userId: number) => {
  try {
    const response = await fetch("/api/chat/get-chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user chats");
    }

    const data = await response.json();

    return data;
  } catch (errorMessage) {
    console.error(errorMessage);
  }
};

const getUnknownUserFromConversationDB = async (
  myUser: number,
  userId: number,
  senderId: number,
) => {
  try {
    const response = await fetch("/api/chat/get-unknown-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        myUser: myUser,
        userId: userId,
        senderId: senderId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unknown user");
    }

    const data = await response.json();

    return data;
  } catch (errorMessage) {
    console.error(errorMessage);
  }
};

export const getUserConversations = async (userId: number) => {
  const convoDB = await getUserConversationsDB(userId);
  let sendingConversation = [] as conversation[];

  for (let currentIndex = 0; currentIndex < convoDB.length; currentIndex++) {
    const chat = convoDB[currentIndex];
    const unknownUserData = await getUnknownUserFromConversationDB(
      userId,
      chat.userid,
      chat.senderid,
    );

    let currentTable = {
      name: String(unknownUserData.name),
      id: Number(unknownUserData.id),
      status: Boolean(true), // Måste ändras senare.
      messages: chat.messages as message[],
      image: String(unknownUserData.image),
    };

    sendingConversation.push(currentTable);
  }

  return sendingConversation;
};
