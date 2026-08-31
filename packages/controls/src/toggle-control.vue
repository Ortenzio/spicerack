<template>
  <label data-sr-control="toggle">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <div data-sr-spacer />
    <button :aria-pressed="!model" @click="handleToggle">Off</button>
    <button :aria-pressed="model" @click="handleToggle">On</button>
  </label>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null }
});

const emit = defineEmits(['change']);
const model = defineModel({ type: Boolean });

function handleToggle (e) {
  model.value = !model.value;
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="toggle"] {
  position: relative;
}

[data-sr-control="toggle"] > button {
  appearance: none;
  border: none;
  font-size: var(--sr-fs-input);
  color: var(--sr-fg-muted);
  padding: 0.25rem 0.5rem;
  background: none;
  cursor: pointer;
  border-radius: 0.25rem;
  text-align: center;
}

[data-sr-control="toggle"] > button[aria-pressed="true"] {
  background: var(--sr-bg-accent);
  color: var(--sr-fg-accent);
}
</style>