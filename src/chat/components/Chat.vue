<script setup lang="ts">
import { onMounted } from "vue";
import Bubble from "./Bubble.vue";
import { storeToRefs } from "pinia";
import { useCurrentConversationStore } from "../store/currentConversation";

const currentStore = useCurrentConversationStore();
const { conversation } = storeToRefs(currentStore);

import { watch } from "vue";

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
    <Bubble
      v-for="messageData in conversation.messages"
      :key="`${messageData.sender}-${messageData.date}`"
      :id="messageData.sender"
      :msg="messageData"
    />
    <div>
      <input
        id="messageTextBar"
        type="text"
        minlength="1"
        placeholder="Skriv ett meddelande..."
        required
      />
      <i class="pi pi-search sendIcon" aria-hidden="true"></i>
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
}

#messageTextBar {
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 1rem;
  width: 45rem;
  height: 2rem;
  border-radius: 10px;
  border: none;
  outline: none;
}

.sendIcon {
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: black;
  pointer-events: none;
  font-size: 0.8rem;
}

@media (min-width: 1024px) {
  #messageTextBar {
    transform: translateX(calc(-50% + 15rem));
  }
}

@media (min-width: 2100px) {
  #messageTextBar {
    transform: translateX(calc(-50% + 21rem));
  }
}
</style>
