import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { getUserConversations } from "../services/createChat";

export interface Message {
  message: string;
  date: number;
  sender: number;
}

export interface Conversation {
  name: string;
  id: number;
  status: boolean;
  messages: Message[];
  image: string;
}

interface ServerToClientEvents {
  "chat:fetchConversation": (userId: number) => void;
}

interface ClientToServerEvents {
  "chat:addConversation": (userId: number, senderId: number) => void;
}

export const useConversationsStore = defineStore("conversations", {
  state: () => {
    return {
      conversations: [] as Conversation[],
      status: true as boolean,
      searchQuery: "" as string,
      isConnected: false as boolean,
      socket: null as Socket<ServerToClientEvents, ClientToServerEvents> | null,
    };
  },

  actions: {
    applyUserConversations(conversation: Conversation[]) {
      try {
        this.conversations = conversation;
      } catch (error) {
        return error;
      }
    },

    connect(): void {
      if (this.socket) return;

      this.socket = io("http://localhost:8080") as Socket<
        ServerToClientEvents,
        ClientToServerEvents
      >;

      this.socket.on("connect", () => {
        this.status = true;
        this.isConnected = true;
      });

      this.socket.on("disconnect", () => {
        this.status = false;
        this.isConnected = false;
      });

      this.socket.on("chat:fetchConversation", async (userId) => {
        const userConversations = await getUserConversations(userId);

        this.conversations = userConversations;
      });
    },

    createChat(userId: number, senderId: number): void {
      if (!this.socket) return;

      this.socket.emit("chat:addConversation", userId, senderId);
    },
  },

  getters: {
    filteredConversations(state) {
      if (!state.searchQuery) return state.conversations;

      return state.conversations.filter((conversation) =>
        conversation.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
  },
});
