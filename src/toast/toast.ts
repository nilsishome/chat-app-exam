import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => {
    return {
      open: false as boolean,
      title: "" as string,
      message: "" as string,
    };
  },

  actions: {
    setStatus(status: boolean, title: string, message: string) {
      this.open = status;
      this.title = title;
      this.message = message;
    },
  },
});
