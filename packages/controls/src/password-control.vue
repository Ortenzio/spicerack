<template>
  <label data-sr-control="text">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <input :type="inputMode" v-model="model" :minlength :maxlength @change="handleChange" />
    <!-- <button @click="handleToggleMode">{{ inputMode }}</button> -->
  </label>
</template>

<script setup>
import { ref } from 'vue';

const INPUT_MODES = new Map([
  [false, 'password'],
  [true, 'text']
]);

const props = defineProps({
  label: { type: String, default: null },
  minlength: { type: Number, default: null },
  maxlength: { type: Number, default: null },
  show: { type: Boolean, default: false }
});

const emits = defineEmits(['change']);
const model = defineModel({ type: String });

const shouldShow = ref(props.show);
const inputMode = ref(INPUT_MODES.get(props.show));

function handleChange (e) {
  emits('change', model.value, e);
}

function handleToggleMode (e) {
  shouldShow.value = !shouldShow.value;
  inputMode.value = INPUT_MODES.get(shouldShow.value);
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