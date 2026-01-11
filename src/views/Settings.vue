<script setup lang="ts">
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";
</script>

<template>
  <div class="wrapper">
    <div class="userInfo">
      <AvatarRoot class="AvatarRoot">
        <AvatarImage
          class="AvatarImage"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Erik Svensson"
        />
        <AvatarFallback class="AvatarFallback" :delay-ms="600">ES</AvatarFallback>
      </AvatarRoot>
      <h1>Erik Svensson</h1>
    </div>
    <p>Välkommen Erik.</p>

    <button>Darkmode (på)</button>
    <button>Logga ut</button>

    <button class="deleteButton">RADERA KONTO</button>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-heading);
  margin-top: 2rem;
}

.userInfo {
  display: flex;
  margin-left: -6.25rem;
}

h1 {
  margin: 0.7rem auto 0 2rem;
  font-family: "Edu AU VIC WA NT Hand";
}

p {
  font-size: 1.25rem;
  margin: 0.5rem 0 4rem 0;
  color: white;
}

button {
  width: 13rem;
  color: var(--color-heading);
  background-color: var(--color-background-soft);
  border: none;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 2rem auto 0 auto;
  font-family: "Dosis", sans-serif;
  font-size: 1rem;
  border: 2px solid var(--color-background-soft);
}

button:hover {
  cursor: pointer;
  background-color: var(--color-background);
}

.deleteButton {
  margin-top: 6rem;
  color: #b35151;
}

.AvatarRoot {
  display: inline-flex;
  margin-top: 0;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-color: var(--color-background-soft);
}

.AvatarImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.AvatarFallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-soft);
  color: var(--color-heading);
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
}

@media (max-width: 400px) {
  .AvatarRoot,
  .AvatarImage,
  .AvatarFallback {
    display: none;
  }

  .userInfo {
    margin-left: -2rem;
  }
}
</style>
