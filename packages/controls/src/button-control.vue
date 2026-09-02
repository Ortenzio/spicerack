<template>
  <div data-sr-control="button">
    <button @click="handleClick">{{ label }}</button>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null }
});

const emits = defineEmits(['click']);

function handleClick (e) {
  emits('click', e);
}
</script>


<style scoped>
[data-sr-control="button"] {
  width: 100%;
  padding: 0;
}

[data-sr-control="button"] > button {
  appearance: none;
  border: none;
  text-align: center;
  width: 100%;
  cursor: pointer;
  background: var(--sr-bg-accent);
  color: var(--sr-fg-active);
  padding: 0.5rem;
  border-radius: 0.25rem;

  &:hover {
    background: var(--sr-bg-accent-hover);
  }
}
</style>
