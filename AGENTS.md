# AGENTS.md

## Project

Spicerack is a framework-agnostic GUI/debug-controls library for web apps.

Consumers should be able to use it from ordinary JavaScript without installing or knowing about Vue:

```js
import { createSpicerack } from '@ozio/spicerack';

const gui = createSpicerack(config);
gui.mount('#gui');
```

Vue is an internal implementation and authoring tool, not part of the consumer-facing API.

## Repository Structure

```text
packages/
  spicerack/
  controls/
  extras/

apps/
  demo/
```

### `packages/spicerack`

The main public package.

Responsibilities:

- exports `createSpicerack()`
- exports authoring helpers such as `defineSpicerack()` if needed
- owns the application shell
- owns the model/event system
- infers control types from config values
- owns the control registry
- imports and registers the built-in controls from `@ozio/spicerack-controls`
- includes Vue as a runtime dependency
- exposes a framework-agnostic API to consumers

Do not require consumers to import Vue or use Vue components directly.

### `packages/controls`

Built-in Spicerack controls.

Examples:

- text
- number
- slider
- boolean
- select
- color
- button

controls are authored as normal Vue SFCs using templates.

This package:

- compiles `.vue` files to normal compiled Vue components
- does not publish raw `.vue` files
- treats Vue as a peer dependency
- uses Vue as a dev dependency for local development/building
- externalizes Vue during the library build

Built-in controls should use the same public component contract that third-party controls use. Avoid privileged/internal-only APIs unless clearly necessary.

### `packages/extras`

Optional controls that are not automatically included by Spicerack.

These should be authored and built the same way as `packages/controls`, but registered explicitly by consumers:

```js
import { createSpicerack } from '@ozio/spicerack';
import { FancyCustomcontrol } from '@ozio/spicerack-extras';

const gui = createSpicerack(config, {
  controls: {
    fancy: FancyCustomcontrol
  }
});
```

`extras` is also the reference implementation for third-party package authors.

It may reasonably declare `@ozio/spicerack` as a peer dependency if it imports public Spicerack helpers or types.

### `apps/demo`

The demo is a consumer app and must remain framework-agnostic.

It should not:

- depend directly on Vue
- use the Vue Vite plugin
- contain `.vue` files
- call Vue APIs
- know how controls are implemented

Its purpose is to prove that Spicerack can be consumed as plain JavaScript.

## Public API Direction

Preferred usage:

```js
import { createSpicerack } from '@ozio/spicerack';
import { FancyCustomcontrol } from 'third-party-package';

const gui = createSpicerack([
  { key: 'player', value: 'LeBron James', props: { label: 'Player' } },
  { key: 'points', value: 45, props: { label: 'Points', min: 0, max: 100, step: 1 }},
  {
    label: 'Filters',
    config: [
      { key: 'rebounds', value: 20, { props: label: 'Rebounds' }},
      { key: 'showMade', value: true, { props: label: 'Show Made' }},
      { key: 'nickname', value: 'king', , type: 'fancy', { props: label: 'Nickname' }}
    ]
  }
], {
  controls: {
    fancy: FancyCustomcontrol
  }
});

gui.mount('#gui');
```

Model fields should support direct value access and change subscriptions:

```js
gui.model.points.value = 50;

const off = gui.model.points.on('change', (value) => {
  console.log(value);
});

off();
```

Construction and mounting should remain separate operations.

## control Contract

controls are compiled Vue components.

They should share a small common contract, likely including:

- `label`
- `disabled`
- model/value binding
- a change/input event

Individual controls may define additional props such as:

- `min`
- `max`
- `step`
- `items`
- `format`

Do not force all controls to accept every possible specialized prop.

Prefer a small shared contract plus per-control props.

The exact event/model ABI is still being designed. Do not over-engineer it before one or two real controls are working end-to-end.

## Vue Boundary

Vue is allowed internally.

The important boundary is:

```text
plain JS consumer API
        ↓
     Spicerack
        ↓
compiled Vue component registry
        ↓
built-in or third-party controls
```

Do not introduce Custom Elements merely to make the internals look framework-neutral.

The plugin ABI can be compiled Vue component definitions because Vue is already part of Spicerack's runtime.

Third-party authors should be able to write normal Vue SFCs with the same authoring experience as built-in controls.

## Vite Build for control Packages

`packages/controls` and `packages/extras` should use nearly identical Vite library builds.

Baseline:

```js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue()
  ],

  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.js'),
      formats: ['es'],
      fileName: 'index'
    },

    rolldownOptions: {
      external: ['vue']
    }
  }
});
```

Do not use Vue custom-element mode unless a concrete need appears later.

Prefer one ES module entry point initially. Avoid UMD, CJS, `preserveModules`, or per-component package exports unless there is a demonstrated need.

## Dependency Rules

### `@ozio/spicerack`

- Vue is a runtime dependency.
- `@ozio/spicerack-controls` is a runtime dependency.

### `@ozio/spicerack-controls`

- Vue is a peer dependency.
- Vue is also a dev dependency.
- Vite and `@vitejs/plugin-vue` are dev dependencies.
- Do not depend on `@ozio/spicerack` just to access types; avoid a conceptual dependency cycle.

### `@ozio/spicerack-extras`

- Vue is a peer dependency.
- Vue is also a dev dependency.
- Vite and `@vitejs/plugin-vue` are dev dependencies.
- `@ozio/spicerack` may be a peer dependency if extras genuinely consume public helpers/types.

If shared contracts eventually need to be imported by both Spicerack and control packages, consider extracting a tiny contracts package then. Do not create that package preemptively.

## Package Manifests

Each workspace package should declare the build/runtime dependencies it actually uses.

Do not centralize Vite/Vue dependencies only in the root package manifest.

The root package should primarily orchestrate workspaces and repo-wide tooling.

A useful rule:

> `cd packages/controls && npm run build` should have every dependency required for that build declared by `packages/controls`.

Package-manager hoisting/deduplication is an implementation detail and should not determine manifest ownership.

## Styling

Vue SFC styles may be extracted into CSS during library builds.

It is acceptable for the main Spicerack package to import the built-in control stylesheet so consumers do not need to know about it.

Prefer CSS custom properties for theme tokens and theming.

Do not split themes/styles into additional packages until there is a concrete reason.

## Design Principles

Prefer:

- simple public APIs
- explicit behavior
- normal JavaScript for consumers
- Vue SFCs for component authoring
- one registry mechanism for both built-in and third-party controls
- small, composable abstractions
- package boundaries that reflect real dependency boundaries
- delaying abstractions until duplication or friction makes them useful

Avoid:

- framework requirements leaking into consumer code
- custom elements without a concrete need
- package proliferation for conceptual folders
- speculative plugin infrastructure
- multiple build formats without a consumer requirement
- giving built-in controls a separate extension path from third-party controls
- solving hypothetical future problems before the basic path works

## Current Priority

Build one real control end-to-end first, likely a text or number control.

Use that implementation to settle:

1. shared props
2. value/model binding
3. emitted events
4. registry behavior
5. style ownership
6. how extra/custom props are forwarded

Only after that should the contract be generalized across the rest of the built-in controls.
