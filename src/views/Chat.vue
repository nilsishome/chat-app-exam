<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import User from "../chat/components/User.vue";
import Conversations from "@/chat/components/Conversations.vue";
import Search from "@/chat/components/Search.vue";
import CreateChat from "@/chat/components/CreateChat.vue";
import Chat from "../chat/components/Chat.vue";
import { useCurrentConversationStore } from "@/chat/store/currentConversation";

const currentStore = useCurrentConversationStore();

const desktop = useMediaQuery("(min-width: 1024px)");
</script>

<template>
  <div v-if="!desktop" class="section">
    <div v-if="!currentStore.chatToggle" class="leftSection">
      <User />
      <Search />
      <Conversations />
      <CreateChat />
    </div>
    <div v-else-if="currentStore.chatToggle" class="chatSection">
      <i
        v-on:click="currentStore.resetCurrentConversation()"
        class="pi pi-arrow-left returnArrow"
      ></i>
      <Chat />
    </div>
  </div>

  <div v-else class="section">
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

.returnArrow {
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: var(--color-heading);
  font-size: 1.25rem;
}

.returnArrow:hover {
  cursor: pointer;
  color: white;
}

.leftSection {
  width: 100%;
  height: 100vh;
  background-color: var(--color-background);
}

.chatSection {
  position: absolute;
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
    position: initial;
    display: block;
    width: 75%;
  }
}
</style>
