<template>
  <label data-sr-control="textarea">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <textarea 
      v-model="model"
      :minlength 
      :maxlength 
      :rows
      :data-resizable="resize"
      @change="handleChange" 
    />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  minlength: { type: Number, default: null },
  maxlength: { type: Number, default: null },
  rows: { type: Number, default: 5 },
  resize: { type: Boolean, default: true }
});

const emit = defineEmits(['change']);
const model = defineModel({ type: String });

function handleChange (e) {
  emit('change', model.value, e);
}
</script>

<style scoped>
[data-sr-control="textarea"] {
  position: relative;
  flex-direction: column;
  align-items: flex-start;
}

[data-sr-control="textarea"] [data-sr-label] {
  width: 100%;
  text-align: left;
}

[data-sr-control="textarea"] > textarea {
  background: none;
  border: none;
  width: 100%;
  padding-top: 0.25rem;
  outline: none;
}

[data-sr-control="textarea"] > textarea[data-resizable="true"] {
  resize: vertical;
}
</style>