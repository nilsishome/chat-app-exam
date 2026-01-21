import { defineStore } from "pinia";
import type { Conversation } from "./conversations";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "./user";

interface ServerToClientEvents {
  "chat:fetchMessage": (conversation: Conversation) => void;
}

interface ClientToServerEvents {
  "chat:sendMessage": (userId: number, senderId: number, message: string) => void;
}

interface recievingConversation extends Conversation {
  conversationid: number;
  created_at: number;
  senderid: number;
  userid: number;
}

export const useCurrentConversationStore = defineStore("conversation", {
  state: () => {
    return {
      conversation: {} as Conversation,
      chatToggle: false as boolean,
      isConnected: false as boolean,
      socket: null as Socket<ServerToClientEvents, ClientToServerEvents> | null,
    };
  },

  actions: {
    async applyCurrentConversation(conversation: Conversation) {
      try {
        this.conversation = conversation;
        this.chatToggle = true;
      } catch (error) {
        return error;
      }
    },

    resetCurrentConversation() {
      this.conversation = {} as Conversation;
      this.chatToggle = false;
    },

    connect(): void {
      const userStore = useUserStore();

      this.socket = io("http://localhost:8080") as Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;

      this.socket.on("connect", () => {
        this.isConnected = true;
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
      });

      this.socket.on("chat:fetchMessage", async (conversation: Conversation) => {
        const conv = conversation as recievingConversation;
        console.log(this.conversation);

        if (conv.userid == userStore.id || conv.senderid == userStore.id) {
          if (this.conversation) {
            if (this.conversation.conversationid == conv.conversationid) {
              this.conversation.messages = conversation.messages;
            }
          }
        }
      });
    },

    sendMessage(userId: number, senderId: number, message: string): void {
      if (!this.socket) return;

      this.socket.emit("chat:sendMessage", userId, senderId, message);
    },
  },
});
