<template>
  <header>
    <button :title="TITLE_LOGO" :aria-expanded="isOpen" :aria-controls="controls" @click="$emit('collapse')">
      <icon-logo aria-hidden />
    </button>

    <h1 v-if="title" v-text="title" />

    <button @click="$emit('copy')" :title="TITLE_COPY">
      <icon-check class="sr__icon-check" v-if="showCopyToast" aria-hidden />
      <icon-copy v-else aria-hidden />
    </button>

    <button @click="$emit('position')" :title="TITLE_CORNER" >
      <icon-corners aria-hidden />
    </button>

    <button @click="$emit('theme')" :title="TITLE_THEME" >
      <icon-theme aria-hidden />
    </button>
  </header>
</template>

<script setup>
import { TITLE_COPY, TITLE_CORNER, TITLE_LOGO, TITLE_THEME } from '@/constants/titles';

import IconTheme from '@/icons/icon-theme.vue';
import IconCorners from '@/icons/icon-corners.vue';
import IconCopy from '@/icons/icon-copy.vue';
import IconLogo from '@/icons/icon-logo.vue';
import IconCheck from '@/icons/icon-check.vue';

const props = defineProps({
  title: { type: String, required: false, default: null },
  showCopyToast: { type: Boolean, required: true, default: false },
  isOpen: { type: Boolean, required: false, default: true },
  controls: { type: String, required: false, default: '' }
});

const emits = defineEmits(['collapse', 'copy', 'position', 'theme']);
</script>

<style scoped>
header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
}

h1 {
  flex-grow: 1;
  font-size: var(--sr-fs-title);
  font-weight: 600;
  letter-spacing: 0;
  text-align: left;
}

button {
  align-items: center;
  appearance: none;
  aspect-ratio: 1;
  background: var(--sr-bg-app);
  border-radius: 0.25rem;
  border: none;
  color: var(--sr-fg-app);
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 0.1s ease-in;
  }

  &:hover {
    background-color: var(--sr-bg-alt);
  }
}

.sr__icon-check {
  stroke: var(--sr-fg-success);
}
</style>