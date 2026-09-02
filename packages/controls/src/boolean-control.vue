<template>
  <label data-sr-control="boolean">
    <span data-sr-label>{{ label }}</span>
    <div data-sr-spacer />
    <input type="checkbox" v-model="model" @change="handleChange" />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null }
});

const emits = defineEmits(['change']);
const model = defineModel({ type: Boolean });

function handleChange (e) {
  emits('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="boolean"] {
  position: relative;
}
</style>
