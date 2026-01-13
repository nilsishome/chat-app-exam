<script setup lang="ts">
  import { useConversationsStore } from '../store/conversations';

  const conversationStore = useConversationsStore()
</script>

<template>
  <div class="searchRoot">
    <i class="pi pi-search searchIcon" aria-hidden="true"></i>
    <input
      class="searchInput"
      type="text"
      placeholder="Sök efter konversation..."
      v-model="conversationStore.searchQuery"
    >
  </div>
</template>

<style scoped>
  .searchRoot {
    position: relative;
    width: 80%;
    background-color: var(--color-background-soft);
    border-radius: 1rem;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  .searchIcon {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-heading);
    pointer-events: none;
    font-size: 0.8rem;
  }

  .searchInput {
    width: 100%;
    padding: 0.5rem 0.75rem 0.5rem 2rem;
    border-radius: 1rem;
    background-color: var(--color-background-soft);
    border: none;
    color: var(--color-heading);
    outline: none;
    font-family: "Dosis", sans-serif;
    font-size: 1rem;
  }

  .searchInput:focus {
    outline: none;
    border: none;
  }

</style>