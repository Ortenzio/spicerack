<template>
  <label data-sr-control="switch">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <div data-sr-spacer />
    <input type="checkbox" v-model="model" @change="handleChange" />
    <span class="sr-switch-label" />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null }
});

const emit = defineEmits(['change']);
const model = defineModel({ type: Boolean });

function handleChange (e) {
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="switch"] {
  position: relative;
}

[data-sr-control="switch"] input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

[data-sr-control="switch"] .sr-switch-label {
  position: relative;
  display: flex;
  align-items: center;
}

[data-sr-control="switch"] .sr-switch-label:before {
  content: '';
  width: 2rem;
  height: 1rem;
  background: #ccc;
  position: relative;
  display: inline-block;
  border-radius: .5rem;
  transition: 0.2s ease-in;
}

[data-sr-control="switch"] .sr-switch-label:after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  left: 0;
  top: 0;
  z-index: 2;
  background: #fff;
  box-shadow: 0 0 10px #0003, -4px 1px 12px #0002;

  @media (prefers-reduced-motion:  no-preference) {
    transition: 0.2s ease-in;
  }
}

[data-sr-control="switch"]  input[type="checkbox"]:hover + .sr-switch-label:after  {
  box-shadow: 0 2px 15px #0005, 0 3px 8px #0002;
}

[data-sr-control="switch"] input[type="checkbox"]:checked + .sr-switch-label:before {
  background: var(--sr-bg-active);
}

[data-sr-control="switch"]  input[type="checkbox"]:checked + .sr-switch-label:after {
  left: 1rem;
}
</style>
