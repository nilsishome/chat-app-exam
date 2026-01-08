import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "Fredrik" as string,
      status: true as boolean,
    };
  },
});
