import type { credentialsUser } from "@/types";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "" as string,
      status: true as boolean,
      id: 0 as number,
      image: "" as string,
    };
  },

  persist: true,

  actions: {
    setUser(credentials: credentialsUser) {
      this.name = credentials.name;
      this.id = credentials.id;
      this.image = credentials.image;
    },
  },
});
