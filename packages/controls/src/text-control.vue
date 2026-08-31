<template>
  <label data-sr-control="text">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <input type="text" v-model="model" :minlength :maxlength @change="handleChange" />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  minlength: { type: Number, default: null },
  maxlength: { type: Number, default: null }
});

const emit = defineEmits(['change']);
const model = defineModel({ type: String });

function handleChange (e) {
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="text"] {
  position: relative;
}

[data-sr-control="text"] [data-sr-label] {
  left: 0;
  z-index: 5;
}

[data-sr-control="text"] > input {
  background: none;
  border: none;
  outline: none;
  padding-left: 1rem;
  padding-right: 0.25rem;
  text-align: right;
  width: 100%;
}
</style>