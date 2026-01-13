import { defineStore } from "pinia";

export interface message {
  message: string;
  date: Date;
  sender: number;
}

export interface conversation {
  name: string;
  id: number;
  status: boolean;
  messages: message[];
  image: string;
}

let messages = [
  {
    sender: 1,
    date: new Date("2026-01-08"),
    message: "Hej! Hur mår du idag?",
  },
  {
    sender: 2,
    date: new Date("2026-01-08"),
    message: "Mycket bra tack! Hur mår du?",
  },
  {
    sender: 1,
    date: new Date("2026-01-08"),
    message: "Jättebra tack!",
  },
];

let testConversation = [
  {
    name: "Anton Eriksson",
    status: true,
    messages: messages,
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1jfnUGTZv24EtkP2fDObJ8TQI90kP9kFadw&s",
  },
  {
    name: "Lasse Eriksson",
    status: false,
    messages: messages,
    id: 3,
    image: "https://i.pinimg.com/736x/24/64/fb/2464fb46debaa81f4db72c7f89499124.jpg",
  },
  {
    name: "Antonia Hermansson",
    status: true,
    messages: messages,
    id: 4,
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=pexels-olly-774909.jpg&fm=jpg",
  },
  {
    name: "Jesper Larsson",
    status: false,
    messages: messages,
    id: 5,
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?cs=srgb&dl=pexels-creationhill-1681010.jpg&fm=jpg",
  },
];

export const useConversationsStore = defineStore("conversations", {
  state: () => {
    return {
      conversations: testConversation as conversation[],
      status: true as boolean,
      searchQuery: "" as string,
    };
  },

  getters: {
    filteredConversations(state) {
      if (!state.searchQuery) return state.conversations;

      return state.conversations.filter((conversation) =>
        conversation.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});
