<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { AvatarRoot, AvatarFallback, AvatarImage } from "radix-vue";

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
  <div class="wrapper contact">
    <AvatarRoot class="AvatarRoot">
      <AvatarImage
        class="AvatarImage"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Erik Svensson"
      />
      <AvatarFallback class="AvatarFallback" :delay-ms="600">ES</AvatarFallback>
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
      <p ref="messageRef" class="message">Hejsan Världen!</p>
    </div>
  </div>

  <div class="wrapper user">
    <AvatarRoot class="AvatarRoot">
      <AvatarImage
        class="AvatarImage"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Erik Svensson"
      />
      <AvatarFallback class="AvatarFallback" :delay-ms="600">ES</AvatarFallback>
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
      <p ref="messageRef" class="message">
        Jag är inte världen din schomme! Vem tror du att du är? Kom då, kom då! Va lång bubblan är
      </p>
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
  margin-left: 0;
  margin-right: 4rem;
}

.bubble {
  margin-left: 4rem;
  padding: var(--pad-v, 12px) var(--pad-h, 16px);
  border-radius: var(--radius, 24px);
  width: var(--width);
  height: fit-content;
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
}

.user > .AvatarRoot {
  right: 0;
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
</style>
