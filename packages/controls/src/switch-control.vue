<template>
  <label data-sl-control="switch">
    <span v-if="label" data-sl-label>{{ label }}</span>
    <div data-sl-spacer />
    <input type="checkbox" v-model="model" @change="handleChange" />
    <span class="sl-switch-label" />
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
[data-sl-control="switch"] {
  position: relative;
}

[data-sl-control="switch"] input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

[data-sl-control="switch"] .sl-switch-label {
  position: relative;
  display: flex;
  align-items: center;
}

[data-sl-control="switch"] .sl-switch-label:before {
  content: '';
  width: 2rem;
  height: 1rem;
  background: #ccc;
  position: relative;
  display: inline-block;
  border-radius: .5rem;
  transition: 0.2s ease-in;
}

[data-sl-control="switch"] .sl-switch-label:after {
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

[data-sl-control="switch"]  input[type="checkbox"]:hover + .sl-switch-label:after  {
  box-shadow: 0 2px 15px #0005, 0 3px 8px #0002;
}

[data-sl-control="switch"] input[type="checkbox"]:checked + .sl-switch-label:before {
  background: var(--sl-bg-active);
}

[data-sl-control="switch"]  input[type="checkbox"]:checked + .sl-switch-label:after {
  left: 1rem;
}
</style>
