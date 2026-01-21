<script setup lang="ts">
import { onMounted } from "vue";
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";
import { useConversationsStore } from "../store/conversations";
import { useCurrentConversationStore } from "../store/currentConversation";
import type { Conversation } from "../store/conversations";
import { useUserStore } from "../store/user";
import { getUserConversations } from "../services/conversationService";

const conversationStore = useConversationsStore();
const userStore = useUserStore();

const currentConversationStore = useCurrentConversationStore();

const setCurrentConversation = (conversation: Conversation): void => {
  currentConversationStore.applyCurrentConversation(conversation);
};

onMounted(async () => {
  const userConversations = await getUserConversations(userStore.id);

  conversationStore.applyUserConversations(userConversations);
});
</script>

<template>
  <div class="conversationContainer">
    <div
      v-for="(conversation, index) in conversationStore.filteredConversations"
      :key="index"
      class="conversationDiv"
    >
      <AvatarRoot class="conversationAvatarRoot">
        <a :class="conversation.status ? 'statusOn' : 'statusOff'" class="conversationStatus"></a>
        <AvatarImage class="conversationAvatarImage" :src="conversation.image" alt="Colm Tuite" />
        <AvatarFallback class="conversationAvatarFallback" :delay-ms="600">
          {{ conversation.name[0] }}{{ conversation.name[1] }}
        </AvatarFallback>
      </AvatarRoot>
      <p class="conversationName">{{ conversation.name }}</p>
      <i
        v-on:click="setCurrentConversation(conversation)"
        class="conversationIcon pi pi-sign-in"
        style="margin-top: auto; margin-bottom: auto"
      ></i>
    </div>
  </div>
</template>

<style>
.conversationDiv {
  border-bottom: 2px solid var(--color-heading);
  color: var(--color-heading);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
}

.conversationAvatarRoot {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  z-index: 1;
}

.conversationAvatarImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  z-index: 1;
}

.conversationAvatarFallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
}

.conversationName {
  font-size: 1.2rem;
}

.conversationIcon:hover {
  cursor: pointer;
  color: white;
}

.conversationNotifications:hover {
  background-color: transparent;
}

.conversationStatus {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
  background: grey;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  z-index: 10;
}

.statusOn,
.statusOn:hover {
  background-color: green;
}

.statusOff,
.statusOff:hover {
  background-color: grey;
}
</style>
