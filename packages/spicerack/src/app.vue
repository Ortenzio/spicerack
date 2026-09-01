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

    <header class="sr-app__header">
      <button class="sr-app__button" :title="TITLE_LOGO" :aria-expanded="isOpen" aria-controls="sr-app-controls" @click="handleToggleOpen">
        <icon-logo class="sr-app__svg" aria-hidden />
      </button>

      <span v-if="title" class="sr-app__title" v-text="`${title}`"/>

      <button class="sr-app__button" @click="handleExportConfig" :title="TITLE_COPY">
        <icon-check v-if="showCopyToast" class="sr-app__icon-check" aria-hidden />
        <icon-copy v-else class="sr-app__icon-copy" aria-hidden />
      </button>

      <button class="sr-app__button" @click="handleChangePosition" :title="TITLE_CORNER" >
        <icon-corners class="sr-app__svg" aria-hidden />
      </button>

      <button class="sr-app__button" @click="handleChangeTheme" :title="TITLE_THEME" >
        <icon-theme class="sr-app__svg" aria-hidden />
      </button>
    </header>

    <section class="sr-app__controls" id="sr-app-controls" v-show="isOpen">
      <template v-for="d in config">
        <component v-if="model[d.key]"  :is="getControl(d)"  :key="d.key"  v-model="model[d.key].value"  v-bind="getControlProps(d)" />

        <component v-else-if="getItemType(d) === 'folder'" :is="getControl(d)" v-bind="getControlProps(d)">
          <template v-for="e in d.config">
            <component v-if="model[e.key]" :is="getControl(e)" :key="e.key" v-model="model[e.key].value" v-bind="getControlProps(e)" />
            <component v-else :is="getControl(e)" v-bind="getControlProps(e)" />
          </template>
        </component>

        <component v-else :is="getControl(d)" :key="`drone_${d.key}`" v-bind="getControlProps(d)" />
      </template>
    </section>

  </aside>
</template>

<script setup>
import { ref, useTemplateRef, onMounted } from 'vue';

import { THEMES, NEXT_THEME } from '@/constants/themes';
import { POSITIONS, NEXT_POSITION } from '@/constants/positions';
import { TITLE_COPY, TITLE_CORNER, TITLE_LOGO, TITLE_THEME } from '@/constants/titles';
import { RESERVED_PROPS } from '@/constants/reserved-props';

import { getItemType } from '@/utils/get-item-type';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { assignTokens } from '@/utils/assign-tokens';
import { omitProps } from '@/utils/omit-props';

import IconTheme from '@/icons/icon-theme.vue';
import IconCorners from '@/icons/icon-corners.vue';
import IconCopy from '@/icons/icon-copy.vue';
import IconLogo from '@/icons/icon-logo.vue';
import IconCheck from '@/icons/icon-check.vue';

const el = useTemplateRef('el');
const version = `${import.meta.env.VITE_Spicerack_VERSION}`;

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
const toastTimeout = 1500
let toastId = null;

function getControl (control) {
  return props.registry.get(getItemType(control));
}

function getControlProps (control) {
  return omitProps(control, RESERVED_PROPS);
}

function handleEvent (type, item, value, event) {
  const handler = item[`on${capitalize(type)}`];

  if (!handler || typeof handler !== "function") {
    return;
  }

  handler({
    type,
    key: item.key,
    value,
    event,
    model
  });
}

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
  showCopyToast.value = true
  clearTimeout(toastId);

  copyToClipboard(props.model)
    .then(() => {
      toastId = setTimeout(() => showCopyToast.value = false, toastTimeout)
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
  border: 1px solid var(--sr-border-app);
  box-shadow: var(--sr-shadow);
  color: var(--sr-fg-app);
  display: flex;
  flex-direction: column;
  gap: var(--sr-control-gap);
  max-height: calc(100dvh - (var(--sr-edge-spacing) * 2));
  min-width: 14rem;
  overflow: scroll;
  padding: var(--sr-app-padding);
  position: fixed;
  width: var(--sr-app-width);
  z-index: var(--sr-z);
}

.sr-app[data-position="top-right"] {
  right: var(--sr-edge-spacing);
  top: var(--sr-edge-spacing);
}

.sr-app[data-position="top-left"] {
  left: var(--sr-edge-spacing);
  top: var(--sr-edge-spacing);
}

.sr-app[data-position="bottom-right"] {
  bottom: var(--sr-edge-spacing);
  right: var(--sr-edge-spacing);
}

.sr-app[data-position="bottom-left"] {
  bottom: var(--sr-edge-spacing);
  left: var(--sr-edge-spacing);
}

.sr-app__controls {
  display: flex;
  flex-direction: column;
  gap: var(--sr-control-gap);
}

.sr-app__header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
}

.sr-app__title {
  flex-grow: 1;
  font-size: var(--sr-fs-title);
  font-weight: 600;
  letter-spacing: 0;
  text-align: left;
}

.sr-app__button {
  align-items: center;
  appearance: none;
  aspect-ratio: 1;
  background: var(--sr-bg-app);
  border-radius: 0.25rem;
  border: none;
  color: var(--sr-fg-app);
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;

  &:hover {
    background-color: var(--sr-bg-alt);
  }
}

.sr-app__icon-check {
  stroke: var(--sr-fg-success);
}
</style>