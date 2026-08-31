<template>
  <label data-sl-control="toggle">
    <span v-if="label" data-sl-label>{{ label }}</span>
    <div data-sl-spacer />
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
[data-sl-control="toggle"] {
  position: relative;
}

[data-sl-control="toggle"] > button {
  appearance: none;
  border: none;
  font-size: var(--sl-fs-input);
  color: var(--sl-fg-muted);
  padding: 0.25rem 0.5rem;
  background: none;
  cursor: pointer;
  border-radius: 0.25rem;
  text-align: center;
}

[data-sl-control="toggle"] > button[aria-pressed="true"] {
  background: var(--sl-bg-accent);
  color: var(--sl-fg-accent);
}
</style>