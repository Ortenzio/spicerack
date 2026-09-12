<template>
  <div data-sr-control="group" :data-flow="flow">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <div role="group" :aria-label="`${label} Options`" :style>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  label: { type: String, required: false, default: null },
  flow: { type: String, required: false, default: 'column' },
  cols: { type: Number, required: false, default: 3 }
});

const style = { gridTemplateColumns: `repeat(${props.cols}, 1fr)` };
</script>

<style scoped>
[data-sr-control="group"] {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.25rem;
  flex-wrap: nowrap;
  gap: 0.5rem;
  
  &[data-flow="row"] {
    flex-direction: row;
    align-items: center;
  }
}

[data-sr-control="group"] div[role="group"] {
  width: 100%;
  display: grid;
  gap: var(--sr-control-gap);
}
</style>