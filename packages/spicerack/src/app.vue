<template>
  <div 
    class="sl-app" 
    role="dialog"
    ref="el"
    :data-version="version"
    :data-theme="theme"
    :data-position="corner"
    :data-is-open="isOpen"
  >

    <header class="sl-app__header">
      <button class="sl-app__button" :title="TITLE_LOGO" :aria-expanded="isOpen" aria-controls="sl-app-controls" @click="handleToggleOpen">
        <icon-logo class="sl-app__svg" aria-hidden />
      </button>

      <span v-if="title" class="sl-app__title" v-text="`${title}`"/>

      <button class="sl-app__button" @click="handleExportConfig" :title="TITLE_COPY">
        <icon-copy class="sl-app__svg" aria-hidden />
      </button>

      <button class="sl-app__button" @click="handleChangePosition" :title="TITLE_CORNER" >
        <icon-corners class="sl-app__svg" aria-hidden />
      </button>

      <button class="sl-app__button" @click="handleChangeTheme" :title="TITLE_THEME" >
        <icon-theme class="sl-app__svg" aria-hidden />
      </button>
    </header>

    <section class="sl-app__controls" id="sl-app-controls" v-show="isOpen">
      <template v-for="d in config">
        <component v-if="model[d.key]" :is="getControl(d)" :key="d.key" v-model="model[d.key].value" v-bind="getControlProps(d)" />
        <component v-else-if="getItemType(d) === 'folder'" :is="getControl(d)" v-bind="getControlProps(d)">
          <template v-for="e in d.config">
            <component v-if="model[e.key]" :is="getControl(e)" :key="e.key" v-model="model[e.key].value" v-bind="getControlProps(e)" />
            <component v-else :is="getControl(e)" v-bind="getControlProps(e)" />
          </template>
        </component>
        <component v-else :is="getControl(d)" :key="`drone_${d.key}`" v-bind="getControlProps(d)" />
      </template>
    </section>

  </div>
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

function getControl (control) {
  return props.registry.get(getItemType(control));
}

function getControlProps (control) {
  return omitProps(control, RESERVED_PROPS);
}

function handleToggleOpen (e) {
  isOpen.value = !isOpen.value;
  localStorage.setItem('sl:open', isOpen.value);
}

function handleChangePosition (e) {
  corner.value = NEXT_POSITION[corner.value];
  localStorage.setItem('sl:corner', corner.value);
}

function handleChangeTheme (e) {
  theme.value = NEXT_THEME[theme.value];
  localStorage.setItem('sl:theme', theme.value);
}

function handleExportConfig (e) {
  copyToClipboard(props.model);
}

onMounted(() => {
  assignTokens(el.value, props.tokens);
});
</script>

<style>
.sl-app {
  background: var(--sl-bg-app);
  border-radius: var(--sl-app-radius);
  border: 1px solid var(--sl-border-app);
  box-shadow: var(--sl-shadow);
  color: var(--sl-fg-app);
  display: flex;
  flex-direction: column;
  gap: var(--sl-control-gap);
  max-height: calc(100dvh - (var(--sl-edge-spacing) * 2));
  min-width: 14rem;
  overflow: scroll;
  padding: var(--sl-app-padding);
  position: fixed;
  width: var(--sl-app-width);
  z-index: var(--sl-z);
}

.sl-app[data-position="top-right"] {
  right: var(--sl-edge-spacing);
  top: var(--sl-edge-spacing);
}

.sl-app[data-position="top-left"] {
  left: var(--sl-edge-spacing);
  top: var(--sl-edge-spacing);
}

.sl-app[data-position="bottom-right"] {
  bottom: var(--sl-edge-spacing);
  right: var(--sl-edge-spacing);
}

.sl-app[data-position="bottom-left"] {
  bottom: var(--sl-edge-spacing);
  left: var(--sl-edge-spacing);
}

.sl-app__controls {
  display: flex;
  flex-direction: column;
  gap: var(--sl-control-gap);
}

.sl-app__header {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  user-select: none;
}

.sl-app__title {
  flex-grow: 1;
  font-size: var(--sl-fs-title);
  font-weight: 600;
  letter-spacing: 0;
  text-align: left;
}

.sl-app__button {
  align-items: center;
  appearance: none;
  aspect-ratio: 1;
  background: var(--sl-bg-app);
  border-radius: 0.25rem;
  border: none;
  color: var(--sl-fg-app);
  cursor: pointer;
  display: flex;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;

  &:hover {
    background-color: var(--sl-bg-alt);
  }
}

.sl-app__svg {
  height: 15px;
  width: 15px;
}
</style>