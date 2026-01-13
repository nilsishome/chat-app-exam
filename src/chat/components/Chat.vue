<script setup lang="ts">
import Bubble from "./Bubble.vue";
</script>

<template>
  <main class="page">
    <Bubble text="Hello" />
  </main>
</template>

<style scoped>
.page {
  position: absolute;
  background-color: var(--vt-c-black-soft);
  height: 100vh;
  width: 100vw;
}
</style>
