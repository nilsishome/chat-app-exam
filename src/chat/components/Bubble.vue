<script setup lang="ts"></script>

<template>
  <div class="bubble">
    <p class="message">Hello There! My name is Nils and I like my dog, I think...</p>
  </div>
</template>

<style scoped>
.bubble {
  margin: 5rem;
  padding: 0.75rem;
  max-width: fit-content;
  border-radius: 1rem;
  background-color: var(--vt-c-black);
  box-shadow: -3px 4px 4px rgba(81, 179, 154, 0.25);
}

.message {
  margin: 0;
  font-size: 20px;
  color: var(--vt-c-text-dark-1);
  max-width: 20rem;
}
</style>
