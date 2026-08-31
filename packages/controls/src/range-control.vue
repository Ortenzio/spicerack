<template>
  <label data-sl-control="range">
    <input type="range" v-model.number="model" :min :max :step @input="handleInput" @change="handleChange" />
    <span class="sl-range-label" v-if="label" data-sl-label>{{ label }}</span>
    <span class="sl-range-value">{{ model }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  step: { type: [Number, String], default: 'any' }
});

const emit = defineEmits(['change', 'input']);
const model = defineModel({ type: Number });

function handleChange (e) {
  emit('change', model.value, e);
}

function handleInput (e) {
  emit('input', model.value, e);
}
</script>

<style scoped>
[data-sl-control="range"] {
  position: relative;
}

[data-sl-control="range"] > .sl-range-label {
  position: absolute;
  left: 0.25rem;
  z-index: 5;
  user-select: none;
  pointer-events: none;
}

[data-sl-control="range"] > .sl-range-value {
  position: absolute;
  right: 0.5rem;
  z-index: 5;
  user-select: none;
  pointer-events: none;
  font-size: var(--sl-fs-input);
}

[data-sl-control="range"] > input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

[data-sl-control="range"] input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none; /* Override default look */
   appearance: none;
   background-color: var(--sl-bg-alt);
   height: 1.5rem;
   width: 0.25rem;
   border-radius: 0.25rem;
}
</style>
