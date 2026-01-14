<script setup lang="ts">
import Bubble from "./Bubble.vue";
import { storeToRefs } from "pinia";
import { useCurrentConversationStore } from "../store/currentConversation";

const currentStore = useCurrentConversationStore();
const { conversation } = storeToRefs(currentStore);
</script>

<template>
  <div class="chatWrapper" v-if="conversation.name">
    <h1>{{ conversation.name }}</h1>
    <!-- <Bubble text="Hello" /> -->
    <Bubble
      v-for="msg in conversation.messages"
      :key="msg.sender"
      :id="msg.sender"
      :message="msg"
    />
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
</style>
