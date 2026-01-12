<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps({
  text: { type: String, required: true },
});

const bubbleRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);

const padV = ref(12);
const padH = ref(16);
const radius = ref(24);
const width = ref(50);

const MAX_LINES = 8;

const MIN_RADIUS = 8;
const MAX_RADIUS = 28;

const MIN_PAD_V = 6;
const MAX_PAD_V = 18;

const MIN_PAD_H = 8;
const MAX_PAD_H = 40;

const MIN_WIDTH = 15;
const MAX_WIDTH = 120;

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
    () => props.text,
    () => {
      nextTick().then(computeLayout);
    }
  );
});

onBeforeUnmount(() => {
  if (ro) ro.disconnect();
  if (mo) mo.disconnect();
});
</script>

<template>
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
    <p ref="messageRef" class="message">Hejsan Världen!</p>
  </div>
</template>

<style scoped>
.bubble {
  margin: 5rem;
  padding: var(--pad-v, 12px) var(--pad-h, 16px);
  border-radius: var(--radius, 24px);
  width: var(--width);
  background-color: var(--vt-c-black);
  box-shadow: -3px 4px 4px rgba(81, 179, 154, 0.25);
  box-sizing: border-box;
  transition: paddings 160ms ease, border-radius 160ms ease;
  max-width: fit-content;
}

.message {
  margin: 0;
  font-size: 20px;
  color: var(--vt-c-text-dark-1);
  line-height: 1.25;
  text-align: start;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
