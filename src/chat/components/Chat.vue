<script setup lang="ts">
import { ref, nextTick } from "vue";
import Bubble from "./Bubble.vue";
import { storeToRefs } from "pinia";
import { useCurrentConversationStore } from "../store/currentConversation";
import { sendMessage } from "../services/message";
import { useUserStore } from "../store/user";

const currentStore = useCurrentConversationStore();
const { conversation } = storeToRefs(currentStore);

const messageContainer = ref<HTMLElement | null>(null);

const userStore = useUserStore();

import { watch } from "vue";

const messageString = ref<string>("");

const messageEnter = () => {
  currentStore.sendMessage(userStore.id, conversation.value.id, messageString.value);

  resetMessageString();
};

const resetMessageString = () => {
  messageString.value = "";
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      scrollToBottomAnimated(700);
    }
  });
};

const scrollToBottomAnimated = (duration = 500) => {
  if (!messageContainer.value) return;

  const element = messageContainer.value;
  const start = element.scrollTop;
  const end = element.scrollHeight;
  const change = end - start;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 → 1
    element.scrollTop = start + change * progress;

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

watch(
  () => conversation.value.messages,
  () => {
    scrollToBottom();
  },
  { deep: true },
);
</script>

<template>
  <div class="chatWrapper" v-if="conversation.name">
    <h1>{{ conversation.name }}</h1>

    <div class="messageContainer" ref="messageContainer">
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
  scroll-behavior: smooth;
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
