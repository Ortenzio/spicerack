<template>

  <aside 
    class="sr-app" 
    aria-label="spicerack"
    ref="el"
    :data-version="version"
    :data-theme="theme"
    :data-position="corner"
    :data-is-open="isOpen"
  >

    <app-header
      :open="isOpen"
      :show-copy-toast
      :title
      controls="sr-app-controls"
      @collapse="handleToggleOpen"
      @copy="handleExportConfig"
      @position="handleChangePosition"
      @theme="handleChangeTheme"
    />

    <section class="sr-app__controls" id="sr-app-controls" v-show="isOpen">  
      <app-control v-for="d in config" :key="d.key ?? d.type" :item="d" :model  :registry />
    </section>

  </aside>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

import { THEMES, NEXT_THEME } from '@/constants/themes';
import { POSITIONS, NEXT_POSITION } from '@/constants/positions';
import { TITLE_COPY, TITLE_CORNER, TITLE_LOGO, TITLE_THEME } from '@/constants/titles';

import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { assignTokens } from '@/utils/assign-tokens';

import AppControl from '@/components/app-control.vue';
import AppHeader from '@/components/app-header.vue';

import IconTheme from '@/icons/icon-theme.vue';
import IconCorners from '@/icons/icon-corners.vue';
import IconCopy from '@/icons/icon-copy.vue';
import IconLogo from '@/icons/icon-logo.vue';
import IconCheck from '@/icons/icon-check.vue';


const el = useTemplateRef('el');
const version = `${import.meta.env.VITE_SPICERACK_VERSION}`;

const props = defineProps({
  config: { type: Object, required: true },
  model: { type: Object, required: true },
  registry: { type: Object, required: true },
  title: { type: String, required: false, default: '' },
  open: { type: Boolean, required: false, default: true },
  tokens: { type: Object, required: true, default: () => ({}) },
  theme: {
    type: String,
    required: false,
    default: THEMES.DARK,
    validator: (value) => Object.values(THEMES).includes(value)
  },
  position: {
    type: String,
    required: false,
    default: POSITIONS.TOP_RIGHT,
    validator: (value) => Object.values(POSITIONS).includes(value)
  }
});

const isOpen = ref(props.open);
const theme = ref(props.theme);
const corner = ref(props.position);
const showCopyToast = ref(false);
const toastTimeout = 1500;
let toastId = null;

// function handleEvent (type, item, value, event) {
//   const handler = item[`on${capitalize(type)}`];

//   if (!handler || typeof handler !== 'function') {
//     return;
//   }

//   handler({
//     type,
//     key: item.key,
//     value,
//     event,
//     model
//   });
// }

function handleToggleOpen (e) {
  isOpen.value = !isOpen.value;
  localStorage.setItem('sr:open', isOpen.value);
}

function handleChangePosition (e) {
  corner.value = NEXT_POSITION[corner.value];
  localStorage.setItem('sr:corner', corner.value);
}

function handleChangeTheme (e) {
  theme.value = NEXT_THEME[theme.value];
  localStorage.setItem('sr:theme', theme.value);
}

function handleExportConfig (e) {
  showCopyToast.value = true;
  clearTimeout(toastId);

  copyToClipboard(props.model)
    .then(() => {
      toastId = setTimeout(() => {
        showCopyToast.value = false;
      }, toastTimeout);
    });
}

onMounted(() => {
  assignTokens(el.value, props.tokens);
});
</script>

<style>
.sr-app {
  background: var(--sr-bg-app);
  border-radius: var(--sr-app-radius);
  box-shadow: var(--sr-shadow);
  color: var(--sr-fg-app);
  display: flex;
  flex-direction: column;
  gap: var(--sr-control-gap);
  max-height: calc(100dvh - (var(--sr-app-edge) * 2));
  min-width: 14rem;
  overflow: scroll;
  padding: var(--sr-app-padding);
  position: fixed;
  width: var(--sr-app-width);
  z-index: var(--sr-app-paddingz);
}

.sr-app[data-position="top-right"] {
  right: var(--sr-app-edge);
  top: var(--sr-app-edge);
}

.sr-app[data-position="top-left"] {
  left: var(--sr-app-edge);
  top: var(--sr-app-edge);
}

.sr-app[data-position="bottom-right"] {
  bottom: var(--sr-app-edge);
  right: var(--sr-app-edge);
}

.sr-app[data-position="bottom-left"] {
  bottom: var(--sr-app-edge);
  left: var(--sr-app-edge);
}

.sr-app__controls {
  display: flex;
  flex-direction: column;
  gap: var(--sr-control-gap);
}
</style>