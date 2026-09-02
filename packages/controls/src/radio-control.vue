<template>
  <div data-sr-control="radio">
    <span data-sr-label v-if="label">{{ label }}</span>
    <div role="group" :aria-label="`${label} Options`" :style>
      <button 
        v-for="d in options" 
        type="button"
        role="radio"
        :data-checked="isActive(d)"
        :value="toValue(d)" 
        :key="toValue(d)"
        @click="(e) => handleClick(d, e)"
      >
      {{ toLabel(d) }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null },
  cols: { type: Number, default: 3 },
  options: { type: Array, required: true, default: () => ([]) }
});

const toValue = (d) => (typeof d === 'object' && d !== null) ? d.value : d;
const toLabel = (d) => (typeof d === 'object' && d !== null) ? d.label : d;
const isActive = (d) => (toValue(d) === model.value);
const style = { gridTemplateColumns: `repeat(${props.cols}, 1fr)` };

/** any type */
const model = defineModel({ validator: () => true });
const emits = defineEmits(['click', 'change']);

function handleClick (d, e) {
  const prev = model.value;
  model.value = toValue(d);
  emits('click', model.value, e);

  if (model.value !== prev) {
    emits('change', model.value, e);
  }
}

function handleChange (e) {
  emits('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="radio"] {
  position: relative;
  gap: 1rem;
}

[data-sr-control="radio"] > div[role="group"] {
  display: grid;
  width: 100%;
  gap: 0.125rem;
}

[data-sr-control="radio"] button[role="radio"] {
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: var(--sr-control-radius);
  font-size: var(--sr-fs-control);

  &:hover {
    background-color: var(--sr-bg-muted);
  }

  &[data-checked="true"] {
    background-color: var(--sr-bg-active);
    color: var(--sr-fg-active);
  }
} 
</style>
