<template>
  <div class="sr-folder" data-sr-control="folder" :data-is-open="isOpen" :aria-expanded="isOpen" :aria-controls="id">
    <button class="sr-folder__title" @click="handleClick">
      <svg class="sr-folder__icon" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <path d="M2,5.5 L7.5,8.75 L13,5.5 L7.5,2.25Z"/>
        <path d="M2,7.75L7.5,11L13,7.75"/>
        <path d="M2,10L7.5,13.25L13.5,10"/>
      </svg>
      <span data-sr-label>{{ label }}</span>
    </button>
    <div class="sr-folder__content" :id v-show="isOpen">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, useId } from 'vue';

const props = defineProps({
  open: { type: Boolean, default: true },
  label: { type: String, required: false, default: null }
});

const id = useId();
const isOpen = ref(props.open);
const emits = defineEmits(['click']);

function handleClick (e) {
  isOpen.value = !isOpen.value;
  emits('click', e);
}
</script>

<style scoped>
.sr-folder[data-sr-control="folder"] {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  background: var(--sr-bg-app);
  border-bottom: 1px solid var(--sr-border-app);
}

.sr-folder[data-sr-control="folder"] path {
  @media (prefers-reduced-motion:  no-preference) {
    transition: transform .24s cubic-bezier(0.26, 0.33, 0.7, 2.0);
  }
}

.sr-folder[data-sr-control="folder"][data-is-open="true"] path:nth-child(1) {
  transform: translateY(-1.5px);
}

.sr-folder[data-sr-control="folder"][data-is-open="true"] path:nth-child(3) {
  transform: translateY(1.5px);
}

.sr-folder__title {
  appearance: none;
  border: none;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25rem;
  height: 1.75rem;
  background: var(--sr-bg-app);
}

.sr-folder__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--sr-control-gap);
  background: var(--sr-bg-app);
  margin-bottom: 0.5rem;
}

.sr-folder__icon {
  height: 15px;
  width: 15px;
  stroke: currentColor;
  fill: none;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-width: 1;
}
</style>