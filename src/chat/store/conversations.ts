import { defineStore } from "pinia";

interface message {
  message: string;
  date: Date;
  sender: string;
}

interface conversation {
  name: string;
  status: boolean;
  messages: message[];
}

let messages = [
  {
    sender: "Fredrik",
    date: new Date("2026-01-08"),
    message: "Hej! Hur mår du idag?",
  },
  {
    sender: "Anton Eriksson",
    date: new Date("2026-01-08"),
    message: "Mycket bra tack! Hur mår du?",
  },
  {
    sender: "Fredrik",
    date: new Date("2026-01-08"),
    message: "Jättebra tack!",
  },
];

let testConversation = [
  {
    name: "Anton Eriksson",
    status: true,
    image:
      "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_hybrid&w=740&q=80",
    messages: messages,
  },
];

export const useConversationsStore = defineStore("conversations", {
  state: () => {
    return {
      conversations: testConversation as conversation[],
      status: true as boolean,
    };
  },
});
