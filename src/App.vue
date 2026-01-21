<script setup lang="ts">
import Auth from "./views/Auth.vue";
import { onMounted } from "vue";
import { useConversationsStore } from "./chat/store/conversations";
import { useCurrentConversationStore } from "./chat/store/currentConversation";
const conversationsStore = useConversationsStore();
const currentConversationStore = useCurrentConversationStore();

onMounted(() => {
  conversationsStore.connect();
  currentConversationStore.connect();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
