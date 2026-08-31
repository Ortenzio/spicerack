<template>
  <label data-sl-control="boolean">
    <span data-sl-label>{{ label }}</span>
    <div data-sl-spacer />
    <input type="checkbox" v-model="model" @change="handleChange" />
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
[data-sl-control="boolean"] {
  position: relative;
}
</style>
