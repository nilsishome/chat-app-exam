import type { Ref } from "vue";
export const sendMessage = async (userId: number, senderId: number, message: Ref<string>) => {
  console.log("test", userId, senderId, message.value);
  try {
    const response = await fetch("/api/chat/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        senderId: senderId,
        message: message.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    const data = await response;

    console.log("sent message:", data);
  } catch (errorMessage) {
    console.error(errorMessage);
  }
};
