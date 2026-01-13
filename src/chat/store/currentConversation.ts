import { defineStore } from "pinia";
import type { conversation } from "./conversations";

export const useCurrentConversationStore = defineStore("conversation", {
  state: () => {
    return {
      conversation: [] as conversation[],
      chatToggle: false as boolean,
    };
  },

  actions: {
    async applyCurrentConversation(conversation: conversation[]) {
      try {
        this.conversation = conversation;
        this.chatToggle = true;
      } catch (error) {
        return error;
      }
    },

    resetCurrentConversation() {
      this.conversation = [];
      this.chatToggle = false;
    },
  },
});
