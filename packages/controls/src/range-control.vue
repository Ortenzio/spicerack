<template>
  <label data-sr-control="range">
    <input type="range" v-model.number="model" :min :max :step @input="handleInput" @change="handleChange" />
    <span class="sr-range-label" v-if="label" data-sr-label>{{ label }}</span>
    <span class="sr-range-value">{{ model }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  step: { type: [Number, String], default: 'any' }
});

const emits = defineEmits(['change', 'input']);
const model = defineModel({ type: Number });

function handleChange (e) {
  emits('change', model.value, e);
}

function handleInput (e) {
  emits('input', model.value, e);
}
</script>

<style scoped>
[data-sr-control="range"] {
  position: relative;
}

[data-sr-control="range"] > .sr-range-label {
  position: absolute;
  left: 0.25rem;
  z-index: 5;
  user-select: none;
  pointer-events: none;
}

[data-sr-control="range"] > .sr-range-value {
  position: absolute;
  right: 0.5rem;
  z-index: 5;
  user-select: none;
  pointer-events: none;
  font-size: var(--sr-fs-input);
}

[data-sr-control="range"] > input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
}

[data-sr-control="range"] input[type="range"]::-webkit-slider-thumb,
[data-sr-control="range"] input[type="range"]::-moz-range-thumb  {
   -webkit-appearance: none; /* Override default look */
   appearance: none;
   border: none;
   background-color: var(--sr-bg-alt);
   height: 1.5rem;
   width: 0.25rem;
   border-radius: 0.25rem;
}
</style>
