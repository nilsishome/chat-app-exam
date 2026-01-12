<script setup lang="ts">
  import User from "../chat/components/User.vue";
  import Conversations from "@/chat/components/Conversations.vue";
</script>

<template>
  <div class="leftSection">
    <User/>
    <Conversations/>
  </div>
</template>

<style scoped>
  .leftSection {
    background-color: var(--color-background);
  }

  @media (min-width: 1024px) {
    .leftSection {
      width: 25%;
    }
  }
</style>