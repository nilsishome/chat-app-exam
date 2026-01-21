import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "" as string,
      status: true as boolean,
      id: 0 as number,
      image:
        "https://img.freepik.com/free-photo/portrait-sensitive-man_23-2149444531.jpg?semt=ais_incoming&w=740&q=80" as string,
    };
  },

  persist: true,

  actions: {
    setUser(name: string, id: number) {
      this.name = name;
      this.id = id;
    },
  },
});
