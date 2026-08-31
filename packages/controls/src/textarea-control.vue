<template>
  <label data-sl-control="textarea">
    <span v-if="label" data-sl-label>{{ label }}</span>
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
[data-sl-control="textarea"] {
  position: relative;
  flex-direction: column;
  align-items: flex-start;
}

[data-sl-control="textarea"] [data-sl-label] {
  width: 100%;
  text-align: left;
}

[data-sl-control="textarea"] > textarea {
  background: none;
  border: none;
  width: 100%;
  padding-top: 0.25rem;
  outline: none;
}

[data-sl-control="textarea"] > textarea[data-resizable="true"] {
  resize: vertical;
}
</style>