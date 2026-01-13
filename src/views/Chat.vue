<script setup lang="ts">
import User from "../chat/components/User.vue";
import Conversations from "@/chat/components/Conversations.vue";
import Search from "@/chat/components/Search.vue";
import CreateChat from "@/chat/components/CreateChat.vue";
import Chat from "../chat/components/Chat.vue";
</script>

<template>
  <div class="section">
    <div class="leftSection">
      <User />
      <Search />
      <Conversations />
      <CreateChat />
    </div>
    <div class="chatSection">
      <Chat />
    </div>
  </div>
</template>

<style scoped>
.section {
  flex-direction: row;
  background-color: var(--color-background-soft);
  height: 100vh;
}

.leftSection {
  width: 100%;
  height: 100vh;
  background-color: var(--color-background);
}

.chatSection {
  display: none;
  width: 100%;
  height: 100%;
}

@media (min-width: 1024px) {
  .section {
    display: flex;
  }

  .leftSection {
    width: 25%;
  }

  .chatSection {
    display: block;
    width: 75%;
  }
}
</style>
