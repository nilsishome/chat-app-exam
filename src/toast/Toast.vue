<script setup lang="ts">
import { ref } from "vue";
import {
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "radix-vue";

import { useToastStore } from "./toast";
const toastStore = useToastStore();

// const setToastStore = (status: boolean, title: string, message: string) => {
//   toastStore.setStatus(status, title, message);
// };
</script>

<template>
  <ToastProvider>
    <ToastRoot v-model:open="toastStore.open" class="ToastRoot">
      <ToastTitle class="ToastTitle">
        {{ toastStore.title }}
      </ToastTitle>
      <ToastDescription as-child>
        <p class="ToastDescription">
          {{ toastStore.message }}
        </p>
      </ToastDescription>
      <ToastAction class="ToastAction" as-child alt-text="undo">
        <button class="ToastButton">Stäng</button>
      </ToastAction>
    </ToastRoot>
    <ToastViewport class="ToastViewport" />
  </ToastProvider>
</template>

<style>
.ToastViewport {
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}

.ToastRoot {
  background-color: var(--color-background-soft);
  border: 2px solid var(--color-heading);
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: "title action" "description action";
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
}
.ToastRoot[data-state="open"] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ToastRoot[data-state="closed"] {
  animation: hide 100ms ease-in;
}
.ToastRoot[data-swipe="move"] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}
.ToastRoot[data-swipe="cancel"] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}
.ToastRoot[data-swipe="end"] {
  animation: swipeOut 100ms ease-out;
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
}

.ToastTitle {
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--color-heading);
  font-size: 15px;
}

.ToastDescription {
  grid-area: description;
  margin: 0;
  color: var(--color-heading);
  font-size: 13px;
  line-height: 1.3;
}

.ToastAction {
  grid-area: action;
  background-color: transparent;
  color: var(--color-heading);
  outline: none;
  border: 1.5px solid var(--color-heading);
  padding: 0.5rem;
  border-radius: 3px;
  font-weight: 600;
}

.ToastAction:hover {
  cursor: pointer;
  background-color: var(--color-heading);
  color: var(--color-background-soft);
}
</style>
