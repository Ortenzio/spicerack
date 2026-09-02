<template>
  <label data-sr-control="list">
    <span data-sr-label v-if="label">{{ label }}</span>
    <select v-model="model" @change="handleChange">
      <option v-for="d in options" :value="toValue(d)" :key="toValue(d)">{{ toLabel(d) }}</option>
    </select>
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  options: { type: Array, required: true, default: () => ([]) }
});

const toValue = (d) => (typeof d === 'object' && d !== null) ? d.value : d;
const toLabel = (d) => (typeof d === 'object' && d !== null) ? d.label : d;

/** any type */
const model = defineModel({ validator: () => true });
const emits = defineEmits(['change']);

function handleChange (e) {
  emits('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="list"] {
  position: relative;
}

[data-sr-control="list"] select {
  flex-grow: 1;
  width: 100%;
  text-align: right;
  border: none;
  height: 100%;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
</style>
