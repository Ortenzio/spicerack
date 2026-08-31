<template>
  <label data-sl-control="list">
    <span data-sl-label v-if="label">{{ label }}</span>
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
const emit = defineEmits(['change']);

function handleChange (e) {
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sl-control="list"] {
  position: relative;
}

[data-sl-control="list"] select {
  flex-grow: 1;
  width: 100%;
  text-align: right;
  border: none;
  height: 100%;
  cursor: pointer;
  outline: none;
}
</style>
