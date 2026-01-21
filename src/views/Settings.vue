<script setup lang="ts">
import { useUserStore } from "@/chat/store/user";
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "radix-vue";
import { logoutAccount, deleteUserAccount } from "./services/authService";

const userStore = useUserStore();
const firstName = userStore.name.split(" ")[0];

const logout = () => {
  logoutAccount();
};

const deleteAccount = (userId: number) => {
  deleteUserAccount(userId);
  logout();
};
</script>

<template>
  <div class="wrapper">
    <div class="userInfo">
      <AvatarRoot class="AvatarRoot">
        <AvatarImage class="AvatarImage" :src="userStore.image" :alt="userStore.name" />
        <AvatarFallback class="AvatarFallback" :delay-ms="600">
          {{ userStore.name[0] }}{{ userStore.name[1] }}
        </AvatarFallback>
      </AvatarRoot>
      <h1>{{ userStore.name }}</h1>
    </div>

    <p>Välkommen {{ firstName }}.</p>

    <button>Darkmode (på)</button>
    <button @click="logout()">Logga ut</button>

    <DialogRoot>
      <DialogTrigger as-child>
        <button class="deleteButton">RADERA KONTO</button>
      </DialogTrigger>

      <DialogPortal>
        <DialogOverlay class="dialogOverlay" />
        <DialogContent class="dialogContent">
          <DialogTitle class="dialogTitle"> Radera ditt konto </DialogTitle>

          <DialogDescription class="dialogDescription">
            Är du säker på att du verkligen vill radera ditt konto?
          </DialogDescription>

          <div class="dialogActions">
            <DialogClose as-child>
              <button class="cancelButton">Avbryt</button>
            </DialogClose>

            <DialogClose as-child>
              <button class="acceptButton" @click="deleteAccount(userStore.id)">RADERA</button>
            </DialogClose>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
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

.dialogOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.dialogContent {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-background-soft);
  color: var(--color-heading);
  padding: 1.5rem;
  border-radius: 0.75rem;
  width: 90%;
  max-width: 400px;
  z-index: 1001;
}

.dialogTitle {
  font-size: 1.25rem;
  font-weight: 600;
  font-family: "Dosis", sans-serif;
}

.dialogDescription {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-family: "Dosis", sans-serif;
}

.dialogActions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.cancelButton {
  background: transparent;
  border: 1px solid var(--color-heading);
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.acceptButton {
  background: var(--color-heading);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: var(--color-background);
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
