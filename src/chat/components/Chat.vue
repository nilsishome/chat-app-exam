<script setup lang="ts">
import Bubble from "./Bubble.vue";
</script>

<template>
  <main class="page">
    <Bubble />
  </main>
</template>

<style scoped>
.page {
  position: absolute;
  background-color: var(--vt-c-black-soft);
  min-height: 100vh;
  min-width: 100vw;
}
</style>
