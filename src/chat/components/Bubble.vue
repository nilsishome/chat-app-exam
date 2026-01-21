<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick, type PropType } from "vue";
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";
import { storeToRefs } from "pinia";
import { useCurrentConversationStore } from "../store/currentConversation";
import { useUserStore } from "../store/user";
import type { message } from "../store/conversations";

const userStore = useUserStore();
const currentStore = useCurrentConversationStore();
const { conversation } = storeToRefs(currentStore);

const props = defineProps({
  id: { type: Number as PropType<number>, required: true },
  msg: { type: Object as PropType<message>, required: true },
});

const bubbleRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);

const screenWidth = top?.innerWidth;

let padV = ref(12);
let padH = ref(16);
let radius = ref(24);
let width = ref(50);

let MAX_LINES = 8;

let MIN_RADIUS = 8;
let MAX_RADIUS = 28;

let MIN_PAD_V = 6;
let MAX_PAD_V = 18;

let MIN_PAD_H = 8;
let MAX_PAD_H = 40;

let MIN_WIDTH = 15;
let MAX_WIDTH = 120;

if (screenWidth! <= 550) {
  padV = ref(6);
  padH = ref(8);
  radius = ref(16);
  width = ref(30);

  MAX_LINES = 0;

  MIN_RADIUS = 8;
  MAX_RADIUS = 28;

  MIN_PAD_V = 6;
  MAX_PAD_V = 18;

  MIN_PAD_H = 8;
  MAX_PAD_H = 40;

  MIN_WIDTH = 15;
  MAX_WIDTH = 40;
} else if (screenWidth! < 1150) {
  width = ref(40);
  MIN_WIDTH = 15;
  MAX_WIDTH = 80;
}

let ro: ResizeObserver | null = null;
let mo: MutationObserver | null = null;

function computeLayout() {
  const message = messageRef.value;
  if (!message) return;

  const style = getComputedStyle(message);

  let lineHeight = parseFloat(style.lineHeight);
  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(style.fontSize) || 20;
    lineHeight = fontSize * 1.2;
  }

  const scrollHeight = message.scrollHeight;
  const lines = Math.max(1, Math.round(scrollHeight / lineHeight));

  const clamped = Math.min(lines, MAX_LINES);

  padV.value = Math.round(Math.max(MIN_PAD_V, MAX_PAD_V + (clamped - 1) * 4));
  padH.value = Math.round(Math.max(MIN_PAD_H, MAX_PAD_H + (clamped - 1) * 7));
  radius.value = Math.round(Math.max(MIN_RADIUS, MAX_RADIUS * 7));
  width.value = Math.round(Math.max(MIN_WIDTH, MAX_WIDTH * 6));
}

onMounted(() => {
  nextTick().then(computeLayout);

  if (bubbleRef.value) {
    ro = new ResizeObserver(() => {
      computeLayout();
    });
    ro.observe(bubbleRef.value);
  }

  if (messageRef.value) {
    mo = new MutationObserver(() => {
      requestAnimationFrame(computeLayout);
    });
    mo.observe(messageRef.value, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  watch(
    () => props.msg.message,
    () => {
      nextTick().then(computeLayout);
    },
  );
});

onBeforeUnmount(() => {
  if (ro) ro.disconnect();
  if (mo) mo.disconnect();
});
</script>

<template>
  <div class="wrapper" :class="$props.msg.sender == userStore.id ? 'user' : 'contact'">
    <AvatarRoot class="AvatarRoot">
      <AvatarImage
        class="AvatarImage"
        :src="$props.msg.sender == userStore.id ? userStore.image : conversation.image"
        alt="avatar image"
      />
      <AvatarFallback class="AvatarFallback" :delay-ms="600"
        >{{ conversation.name[0] }} {{ conversation.name[1] }}</AvatarFallback
      >
    </AvatarRoot>
    <div
      ref="bubbleRef"
      class="bubble"
      :style="{
        '--pad-v': padV + 'px',
        '--pad-h': padH + 'px',
        '--radius': radius + 'px',
        '--width': width + 'px',
      }"
    >
      <p ref="messageRef" class="message">{{ $props.msg.message }}</p>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 5rem 5rem 0 5rem;
  display: flex;
  position: relative;
}

.user {
  float: right;
}

.user > .bubble {
  box-shadow: 3px 4px 4px rgba(81, 179, 154, 0.25);
  margin-left: auto;
  margin-right: 4rem;

  justify-content: end;

  animation-name: user-ani;
  animation-duration: 1000ms;
}

.bubble {
  position: relative;
  margin-left: 4rem;
  padding: var(--pad-v, 12px) var(--pad-h, 16px);
  border-radius: var(--radius, 24px);
  width: var(--width);
  height: fit-content;
  background-color: var(--color-background);
  box-shadow: -3px 4px 4px rgba(81, 179, 154, 0.25);
  box-sizing: border-box;
  transition:
    paddings 160ms ease,
    border-radius 160ms ease;
  max-width: fit-content;

  animation-name: contact-ani;
  animation-duration: 1000ms;
}

.message {
  margin: 0;
  font-size: 20px;
  color: var(--color-heading);
  line-height: 1.25;
  text-align: start;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.AvatarRoot {
  display: inline-flex;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: var(--color-background-soft);

  animation-name: contact-ani;
  animation-duration: 1250ms;
}

.user > .AvatarRoot {
  right: 0;

  animation-name: user-ani;
  animation-duration: 1250ms;
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

@media (max-width: 900px) {
  .wrapper {
    margin: 1rem 0.5rem 3rem 0.5rem;
  }
}

@media (max-width: 800px) {
  .bubble {
    padding: var(--pad-v, 6px) var(--pad-h, 16px);
    border-radius: var(--radius, 24px);
    width: var(--width);
  }
}

@media (max-width: 700px) {
  .bubble {
    margin-left: 2.5rem;
  }

  .message {
    font-size: 16px;
  }

  .user > .bubble {
    margin-right: 2.5rem;
  }

  .AvatarRoot {
    width: 30px;
    height: 30px;
  }
}

@keyframes contact-ani {
  0% {
    transform: translateY(-500px);
  }

  50% {
    transform: translateY(15px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes user-ani {
  0% {
    transform: translateY(500px);
  }

  50% {
    transform: translateY(-15px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
