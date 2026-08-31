<template>
  <label data-sr-control="number">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <input type="number" v-model="model" :min :max @change="handleChange" />
  </label>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: null },
  min: { type: Number, default: null },
  max: { type: Number, default: null }
});

const emit = defineEmits(['change']);
const model = defineModel({ type: Number });

function handleChange (e) {
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="number"] {
  position: relative;
}

[data-sr-control="number"] > input {
  background: none;
  border: none;
  outline: none;
  padding-left: 1rem;
  padding-right: 0.25rem;
  text-align: right;
  width: 100%;
}
</style>
