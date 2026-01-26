<script setup lang="ts">
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();

const openSettings = () => {
  router.push("/settings");
};
</script>

<template>
  <div class="chatProfileContainer">
    <div class="chatProfileDiv">
      <AvatarRoot class="chatProfileAvatarRoot">
        <AvatarImage class="chatProfileAvatarImage" :src="userStore.image" alt="Colm Tuite" />
        <AvatarFallback class="chatProfileAvatarFallback" :delay-ms="600">
          {{ userStore.name[0] }}{{ userStore.name[1] }}
        </AvatarFallback>
      </AvatarRoot>
      <p class="chatProfileName">{{ userStore.name }}</p>
    </div>
    <div class="chatProfileStatusDiv">
      <p class="chatProfileStatusText">{{ userStore.status ? "Tillgänlig" : "Otillgänlig" }}</p>
      <a class="chatProfileStatus" :class="userStore.status ? 'statusOn' : 'statusOff'"></a>
      <button v-on:click="openSettings" class="pi pi-cog settingsIcon"></button>
    </div>
  </div>
</template>

<style scoped>
.chatProfileContainer {
  display: flex;
  flex-direction: column;
  min-height: 20vh;
  width: 100%;
  border-bottom: 2px solid var(--color-heading);
}

.chatProfileDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2rem;
}

.chatProfileAvatarRoot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
}

.chatProfileAvatarImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.chatProfileAvatarFallback {
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

.chatProfileName {
  color: var(--color-heading);
  margin-left: 1rem;
  margin-right: 2rem;
  font-size: 1.1rem;
}

.chatProfileStatusDiv {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-right: 1rem;
}

.chatProfileStatus {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: grey;
  margin-top: auto;
  margin-bottom: auto;
}

.statusOn {
  background-color: green;
}

.statusOff {
  background-color: grey;
}

.chatProfileStatusText {
  color: var(--color-heading);
  padding: 0 0.5rem 0 0.5rem;
}

.settingsIcon {
  color: var(--color-heading);
  background-color: transparent;
  border: none;
  outline: none;
  padding-left: 1rem;
  font-size: 1.25rem;
}

.settingsIcon:hover {
  pointer-events: all;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .chatProfileDiv {
    margin-bottom: 2.5rem;
  }

  .chatProfileStatus {
    width: 1rem;
    height: 1rem;
  }

  .chatProfileName {
    font-size: 2rem;
    margin-left: 3rem;
    margin-right: 6rem;
  }

  .chatProfileAvatarRoot {
    margin-top: 1rem;
    width: 5rem;
    height: 5rem;
  }
}
</style>
