<script setup lang="ts">
import { ref } from "vue";
import Bubble from "./Bubble.vue";
import { storeToRefs } from "pinia";
import { useCurrentConversationStore } from "../store/currentConversation";
import { sendMessage } from "../services/message";
import { useUserStore } from "../store/user";

const currentStore = useCurrentConversationStore();
const { conversation } = storeToRefs(currentStore);

const userStore = useUserStore();

import { watch } from "vue";

const messageString = ref<string>("");

const messageEnter = () => {
  sendMessage(userStore.id, conversation.value.id, messageString);

  resetMessageString();
};

const resetMessageString = () => {
  messageString.value = "";
};

watch(
  () => conversation.value?.messages,
  (val) => {
    console.log("messages changed:", val);
    console.log("type:", typeof val);
    console.log("isArray:", Array.isArray(val));
  },
  { immediate: true },
);
</script>

<template>
  <div class="chatWrapper" v-if="conversation.name">
    <h1>{{ conversation.name }}</h1>

    <div class="messageContainer">
      <Bubble
        v-for="messageData in conversation.messages"
        :key="`${messageData.sender}-${messageData.date}`"
        :id="messageData.sender"
        :msg="messageData"
      />
    </div>

    <div class="messageTextBarContainer">
      <input
        id="messageTextBar"
        type="text"
        minlength="1"
        placeholder="Skriv ett meddelande..."
        v-model="messageString"
        v-on:keyup.enter="messageEnter"
        required
      />
      <i class="pi pi-send sendIcon" aria-hidden="true"></i>
    </div>
  </div>

  <div v-else class="errorMessage">
    <h2>Du är för närvarande inte i en chatt. Välj en chatt för att se meddelanden.</h2>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 1.5rem;
  color: var(--color-heading);
}

.errorMessage {
  display: flex;
  color: white;
  height: 100%;
  width: 100%;
  justify-content: center;
}

h2 {
  place-content: center;
}

.chatWrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.messageContainer {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.messageTextBarContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: transparent;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

#messageTextBar {
  flex: 1;
  height: 2.5rem;
  border-radius: 10px;
  border: none;
  outline: none;
  padding-left: 1rem;
  font-family: "Dosis", sans-serif;
  padding-right: 3rem;
}

.sendIcon {
  color: rgb(0, 0, 0);
  pointer-events: none;
  font-size: 0.8rem;
  position: relative;
  right: 2rem;
}
</style>
