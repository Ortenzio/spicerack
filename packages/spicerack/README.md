# Spicerack

Spicerack is a small, dat.GUI-inspired controls panel for inspecting and changing values in a web application.

Spicerack uses Vue internally, but its consumer API is ordinary JavaScript. Applications do not need to create Vue components, install the Vue Vite plugin, or mount a Vue app.

```js
import { createSpicerack } from '@ozio/spicerack';

const gui = createSpicerack([
  { key: 'name', value: 'Nicholas', label: 'Name' },
  { key: 'points', value: 32, label: 'Points' },
  { key: 'enabled', value: true, label: 'Enabled' }
]);

gui.mount('#spicerack');
```

## Installation

### npm

```sh
npm install @ozio/spicerack
```

```js
import { createSpicerack } from '@ozio/spicerack';
```

Vue and the built-in controls are bundled implementation details of `@ozio/spicerack`; consumers do not install or import them directly.

### jsDelivr (ESM)

```html
<div id="spicerack"></div>

<script type="module">
  import { createSpicerack } from 'https://cdn.jsdelivr.net/npm/@ozio/spicerack/+esm';

  const gui = createSpicerack([
    { key: 'message', value: 'Hello', label: 'Message' }
  ]);

  gui.mount('#spicerack');
</script>
```

Pin a package version in production if reproducible builds are important:

```js
import { createSpicerack } from 'https://cdn.jsdelivr.net/npm/@ozio/spicerack@0.1.0-beta.7/+esm';
```

## Sample usage

### Defining a config

Pass a config array and optional settings to `createSpicerack(config, options)`. A control's `type` can be omitted for string, number, and boolean values.

```js
import { createSpicerack } from '@ozio/spicerack';

const gui = createSpicerack([
  {
    type: 'folder',
    label: 'Player',
    open: true,
    config: [
      {
        key: 'name',
        value: 'LeBron James',
        label: 'Name',
        maxlength: 40
      },
      {
        key: 'points',
        type: 'range',
        value: 32,
        label: 'Points',
        min: 0,
        max: 100,
        step: 1
      }
    ]
  },
  {
    key: 'conference',
    type: 'list',
    value: '',
    label: 'Conference',
    options: [
      { value: '', label: 'All Conferences' },
      { value: 'east', label: 'Eastern' },
      { value: 'west', label: 'Western' }
    ]
  },
  {
    type: 'button',
    label: 'Reset',
    onClick(event) {
      console.log('Reset clicked', event);
    }
  }
], {
  title: 'Player Settings',
  theme: 'dark',
  position: 'top-right',
  open: true
});
```

Spicerack currently supports one folder level. Do not put a folder inside another folder.

### Mounting to the DOM

Construction and mounting are separate operations:

```js
const gui = createSpicerack(config);

gui.mount('#spicerack');
```

`mount()` accepts a CSS selector or an `Element`. If no target is supplied, it mounts to `document.body`.

```js
gui.mount(document.querySelector('#spicerack'));
```

An instance currently supports one application mount in normal use. An explicit public `unmount()` API is not yet available.

### Reading and changing values

Each keyed value control is available through `gui.model`:

```js
console.log(gui.model.points.value);

gui.model.points.value = 50;
```

Calling `gui.json()` returns a plain snapshot of all model values:

```js
console.log(gui.json());
// { name: 'LeBron James', points: 50, conference: '' }
```

Folders and buttons are structural or action controls and are not added to the model. During the current beta, a divider still requires a key and creates an `undefined` model field; this is tracked as a structural-control issue.

### Adding event handlers

Subscribe to model changes with `on('change', callback)`. This observes both user input and programmatic assignments.

```js
const stop = gui.model.points.on('change', (value, previousValue) => {
  console.log({ value, previousValue });
});

gui.model.points.value = 51;

stop();
```

Control-level listeners can also be supplied with Vue-style listener prop names. Value controls emit the new domain value followed by the original DOM event:

```js
const config = [
  {
    key: 'name',
    value: 'Nicholas',
    label: 'Name',
    onChange(value, event) {
      console.log(value, event);
    }
  },
  {
    type: 'button',
    label: 'Save',
    onClick(event) {
      console.log('Save', event);
    }
  }
];
```

Prefer model subscriptions when application behavior should also react to programmatic value changes.

## API

### `createSpicerack(config, options?)`

Creates and returns a Spicerack instance. It does not mount anything during construction.

### Config

The first argument is an array of config records. Spicerack reserves `key`, `type`, `value`, and `config`; other properties are forwarded to the selected control as props or event listeners.

| Property | Type | Description |
| --- | --- | --- |
| `key` | `string` | Unique model key. Required for value controls. |
| `type` | `string` | Registered control type. Optional when inferred from a string, number, or boolean value. |
| `value` | `unknown` | Initial value for a value control. |
| `label` | `string` | Visible control label. |
| `config` | `SpicerackConfig[]` | Child controls for a folder. One folder level is supported. |
| Additional properties | `unknown` | Forwarded to the selected control, such as `min`, `max`, `step`, `options`, or `onChange`. |

Keys must be non-empty strings and unique across the entire config, including controls inside folders. Buttons do not require a key or value.

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `controls` | `Record<string, SpicerackControl>` | `{}` | Custom controls added to the registry. A matching name can override a built-in control. |
| `tokens` | `SpicerackTokens` | Built-in theme | Style-token overrides. |
| `open` | `boolean` | Persisted value or `true` | Initial expanded state. |
| `theme` | `'light' \| 'dark'` | Persisted value or `'dark'` | Initial color theme. |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | Persisted value or `'top-right'` | Initial panel corner. |
| `title` | `string` | `''` | Header title. |

An explicit option takes precedence over a persisted value. Panel state is currently stored in `localStorage` with the keys `sr:open`, `sr:theme`, and `sr:corner`.

### Return object

#### `mount(target?)`

Mounts the panel to a selector or `Element`. The default target is `document.body`.

#### `model`

A null-prototype object containing one field per keyed value control. Each field exposes:

- `value`: get or set the current value.
- `on('change', callback)`: observe value changes and receive an unsubscribe function.

#### `json()`

Returns a plain object containing the current value of every model field.

#### `version`

The installed Spicerack package version as a string.

## Built-in controls

| Type | Value | Additional props | Events |
| --- | --- | --- | --- |
| `boolean` | `boolean` | `label` | `change(value, event)` |
| `button` | None | `label` | `click(event)` |
| `divider` | None | None | None |
| `folder` | None | `label`, `open`, `config` | `click(event)` |
| `list` | Any option value | `label`, `options` | `change(value, event)` |
| `number` | `number` | `label`, `min`, `max` | `change(value, event)` |
| `range` | `number` | `label`, `min`, `max`, `step` | `input(value, event)`, `change(value, event)` |
| `switch` | `boolean` | `label` | `change(value, event)` |
| `text` | `string` | `label`, `minlength`, `maxlength` | `change(value, event)` |
| `textarea` | `string` | `label`, `minlength`, `maxlength`, `rows`, `resize` | `change(value, event)` |
| `toggle` | `boolean` | `label` | `change(value, event)` |

The shared control contract is still evolving. In particular, a common `disabled` prop is not yet implemented across every interactive control.

During the current beta, divider config records require a unique `key` even though dividers have no value. This requirement is expected to be removed.

## Custom controls

Custom controls are compiled Vue components registered through the framework-neutral Spicerack options object. Consumers of your control package still interact with Spicerack through ordinary JavaScript.

```js
import { createSpicerack } from '@ozio/spicerack';
import { FancyControl } from 'fancy-spicerack-controls';

const gui = createSpicerack([
  {
    key: 'nickname',
    type: 'fancy',
    value: 'King',
    label: 'Nickname',
    emphasis: 'strong'
  }
], {
  controls: {
    fancy: FancyControl
  }
});

gui.mount('#spicerack');
```

See the [built-in controls source](https://github.com/ortenzio/spicerack/tree/main/packages/controls/src) for working component examples.

### Package dependencies

A third-party control package should treat Vue as a peer dependency and include the build tooling it uses as development dependencies:

```json
{
  "peerDependencies": {
    "vue": "^3.5.40"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "vite": "^8.2.0",
    "vite-plugin-css-injected-by-js": "^5.0.2",
    "vue": "^3.5.40"
  }
}
```

### Vite config

This configuration matches the current built-in control packaging strategy. Vue is externalized so the control package uses Spicerack's runtime:

```js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJs from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJs()
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'index.js'),
      formats: ['es'],
      fileName: 'index'
    },
    rolldownOptions: {
      external: ['vue']
    }
  }
});
```

If you extract CSS instead, document the stylesheet import that consumers must add.

### Vue SFC contract

Value controls receive `modelValue` and should emit `update:modelValue`. Vue's `defineModel()` macro handles both:

```vue
<template>
  <label data-sr-control="fancy">
    <span v-if="label" data-sr-label>{{ label }}</span>
    <input
      v-model="model"
      :disabled="disabled"
      @change="handleChange"
    />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, default: null },
  disabled: { type: Boolean, default: false }
});

const model = defineModel();
const emit = defineEmits(['change']);

function handleChange (event) {
  emit('change', model.value, event);
}
</script>
```

Action controls should emit `click` and do not need to define a model.

### Style directives

Spicerack provides low-specificity structural styles for these attributes:

- `[data-sr-control]`: root element for a control.
- `[data-sr-label]`: shared label typography.
- `[data-sr-spacer]`: flexible spacer used in horizontal controls.

Controls can use Spicerack's CSS custom properties, including:

- `--sr-bg-app`, `--sr-bg-control`, `--sr-bg-accent`
- `--sr-fg-app`, `--sr-fg-elm`, `--sr-fg-muted`
- `--sr-border-app`, `--sr-border-active`
- `--sr-fs-control`, `--sr-fs-input`
- `--sr-control-radius`, `--sr-control-gap`

Treat these as part of the current authoring environment, but expect the design-token surface to evolve during beta releases.

## Style tokens

Pass token overrides through `options.tokens`:

```js
const gui = createSpicerack(config, {
  tokens: {
    appWidth: '20rem',
    appZIndex: 1000,
    controlRadius: '0.5rem',
    bgColorAccent: 'rebeccapurple'
  }
});
```

Available keys:

- Layout: `appEdgeSpacing`, `appPadding`, `appRadius`, `appWidth`, `appZIndex`
- Controls: `controlRadius`, `controlGap`
- Typography: `fontSizeControl`, `fontSizeInput`, `fontSizeTitle`
- Backgrounds: `bgColorAccent`, `bgColorAccentHover`, `bgColorActive`, `bgColorAlt`, `bgColorApp`, `bgColorCard`, `bgColorControl`, `bgColorElm`, `bgColorMuted`
- Foregrounds: `fgColorAccent`, `fgColorActive`, `fgColorAlt`, `fgColorApp`, `fgColorCard`, `fgColorElm`, `fgColorMuted`
- Borders: `borderColorActive`, `borderColorAlt`, `borderColorApp`, `borderColorCard`, `borderColorElm`, `borderColorMuted`

CSS length and color tokens accept CSS strings. `appZIndex` accepts a number.

## Types

The package includes declarations for `createSpicerack` and exports the public API types:

```ts
import {
  createSpicerack,
  type SpicerackConfig,
  type SpicerackInstance,
  type SpicerackOptions,
  type SpicerackTokens
} from '@ozio/spicerack';
```

The maintained declaration file is emitted as part of the Vite library build. TypeScript is not used to compile the application.

## Contact

- [GitHub repository](https://github.com/ortenzio/spicerack)
- [Issue tracker](https://github.com/ortenzio/spicerack/issues)

## Contributing

Install dependencies and run the workspace checks from the repository root:

```sh
npm install
npm run build
npm run lint -w @ozio/spicerack
npm run lint -w @ozio/spicerack-controls
```

Keep the demo framework-agnostic: it should consume `@ozio/spicerack` as plain JavaScript and should not import Vue or use the Vue Vite plugin.
