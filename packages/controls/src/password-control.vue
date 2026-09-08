<template>
  <label data-sr-control="text">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <input :type="inputMode" v-model="model" :minlength :maxlength @change="handleChange" />
    <button @click="handleToggleMode">
      <svg viewBox="0 0 15 15" stroke-width="1" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0.5, 0.5)">
          <g v-if="showPassword"><path d="M0,7 Q7,15,14,7 Q7,-1,0,7"/><circle cx="7" cy="7" fill="currentColor" r="1.5" /></g>
          <path v-else d="M0,7Q7,14.5,14,7M1.5,9.25L.5,10.25M5,11L4.5,12.5 M9,11L9.75,12.5M12.5,9.25L13.75,10.25" />
        </g>
      </svg>
    </button>
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

const showPassword = ref(props.show);
const inputMode = ref(INPUT_MODES.get(props.show));

function handleChange (e) {
  emits('change', model.value, e);
}

function handleToggleMode (e) {
  showPassword.value = !showPassword.value;
  inputMode.value = INPUT_MODES.get(showPassword.value);
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
  background: transparent;
  border: none;
  outline: none;
  padding-left: 1rem;
  padding-right: 1.25rem;
  text-align: right;
  width: 100%;
}

[data-sr-control="text"] > button {
  position: absolute;
  right: 0.5rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: 15px;
  width: 15px;
}
</style>