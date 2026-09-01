# Spicerack Review: Issue Backlog

Reviewed: 2026-08-31

Scope:

- `packages/spicerack`
- `packages/controls`

Ignore:

- `packages/extras`
- `apps/demo`

This document is organized as copy-ready GitHub issues. Each open item has a suggested title, labels, context, scope, and acceptance criteria. The developer notes from the previous review were rechecked against the current source rather than treated as resolved automatically.

---

## SID-003: Add mount and unmount lifecycle management

**Labels:** `enhancement`, `public-api`, `priority:high`

### Context

`mount()` now accepts a selector or `Element` and returns Vue's mounted component instance. The app reference is still discarded by Spicerack, repeated mounts create additional applications, and consumers cannot clean up during tests, hot reload, or single-page navigation. Returning a Vue implementation object also does not provide a stable framework-neutral lifecycle API.

### Scope

- Store the Vue app and mounted target.
- Return the Spicerack API or a documented mount handle from `mount()`.
- Add `unmount()`.
- Define repeated-mount behavior.
- Validate targets before passing them to Vue.
- Consider accepting an `Element` in addition to a selector.

### Acceptance criteria

- A mounted instance can be completely unmounted.
- A second mount either throws a clear error or performs a documented remount.
- A missing selector produces a Spicerack error naming the selector.
- The public declaration matches the runtime lifecycle API.

---

## SID-004: Validate and normalize config in one pass

**Labels:** `architecture`, `validation`, `priority:high`

### Context

The shell, model builder, and type inference still interpret raw config independently. Reserved metadata is now filtered before props are forwarded, which resolves one symptom, but there is no shared normalized representation. Drift remains around folders, keys, inferred actions, unknown types, and render keys. Model traversal is recursive while rendering intentionally supports only one folder level.

Nested folders are an accepted product limitation, so recursive rendering is not required by this ticket. The limitation should instead be validated and documented.

### Scope

Create one modest normalization function that:

- validates every item and reports its config path;
- resolves inferred control types;
- validates the intentional maximum folder depth;
- verifies required keys and registry entries;
- separates reserved Spicerack metadata from control props;
- returns the normalized records used by both the model and renderer.

### Acceptance criteria

- Invalid items fail during construction with a path such as `config[2].config[1]`.
- Nested folders fail with a clear “one folder level supported” message.
- Unknown control types identify both the type and item path.
- Model and rendering consume the same normalized records.
- The one-level folder limitation is documented in the public config API.
- Action inference uses the same event-listener convention as rendering.

---

## SID-006: Define and apply the control value/event ABI

**Labels:** `architecture`, `controls`, `priority:high`

### Context

Controls now consistently emit the domain value followed by the DOM event for `change`, and list values no longer come from `event.target.value`. Action buttons emit a DOM click event. The remaining contract gaps are shared `disabled` support, direct component tests, and a firm decision about whether the DOM event is a documented second argument.

### Proposed contract

- `modelValue`: current domain value.
- `update:modelValue`: immediate value synchronization.
- `change`: committed domain value.
- `input`: optional immediate domain-value event where useful, such as range.
- `click`: DOM event for action controls only.
- `disabled`: shared by interactive controls.
- Specialized props remain control-specific.

### Acceptance criteria

- Every value control follows the documented binding and `change` contract.
- List options preserve string, number, boolean, and object values.
- Action controls do not pretend to have a model value.
- All interactive controls support `disabled`.
- Built-in and third-party controls use the same contract.
- Direct component tests cover value type and emitted payload.

---

## SID-014: Define stylesheet ownership and CSP behavior

**Labels:** `css`, `packaging`, `security`, `priority:medium`

### Context

Spicerack and controls inject CSS into `document.head` during module evaluation. This is convenient but can conflict with strict Content Security Policy, stylesheet ordering, multiple versions, and future ShadowRoot support.

### Scope

Prefer extracting controls CSS and importing it from Spicerack's built artifact so the normal consumer still needs one JavaScript import. If runtime injection remains intentional, document its CSP and side-effect behavior.

### Acceptance criteria

- Ordinary consumers have one documented style-loading path.
- Strict-CSP behavior is documented and tested.
- Package `sideEffects` metadata accurately protects required CSS.
- Multiple instances do not duplicate styles unnecessarily.
- The strategy is compatible with any future ShadowRoot option.

---

## SID-015: Finish control correctness and dead-code cleanup

**Labels:** `bug`, `controls`, `priority:medium`

### Context

Several original defects are resolved:

- Range now binds `step`.
- List now guards `null`.
- Toggle's unused state was removed.
- The unused list `format` prop was removed.
- List emits its typed model value.
- Empty range-track rules were removed.
- Control component styles are now scoped.
- Folder, switch, and button transitions respect reduced-motion preferences.

Remaining work includes:

- Some `props` bindings are assigned but only the template needs the declaration.
- `is-plain-object.js` remains unused.
- Controls do not consistently expose `disabled`.

### Acceptance criteria

- Unused variables, parameters, rules, and utilities are removed.
- `disabled` follows SID-006 across interactive controls.
- Package lint passes without suppressing relevant warnings.

---

## SID-016: Enforce workspace quality scripts consistently

**Labels:** `tooling`, `ci`, `priority:medium`

### Context

Spicerack and controls have working package-local lint scripts, and the current package lint passes. The root still exposes only `dev` and `build`, and there are no test or type-check orchestration gates.

### Scope

- Add package-local scripts for checks actually used by each workspace.
- Add root orchestration scripts.
- Add CI only after commands are locally reliable.

### Acceptance criteria

- Every applicable package can run its checks from its own directory.
- Root commands run lint, tests, and any adopted type checks consistently.
- CI runs the smallest relevant checks plus the packed-consumer smoke test.

---

## SID-017: Make style tokens authoritative

**Labels:** `css`, `design-system`, `priority:medium`

### Context

The shell consumes `appPadding`, `appRadius`, `appWidth`, `controlRadius`, and `controlGap` through the `--sr-*` custom-property namespace.

### Scope

- Shared directives use `var(--sr-control-radius)`.
- Folder content uses `var(--sr-control-gap)`.
- Audit every token consumer after future token renames.

### Acceptance criteria

- Every documented token has an observable effect.
- The shell continues to use `--sr-app-padding`, `--sr-app-radius`, and `--sr-app-width`.
- No source references obsolete token properties.
- Token override tests cover representative layout and color values.
- Repeated control radii use the intended control token where appropriate.

---

## SID-018: Add reduced-motion, forced-colors, and browser policy

**Labels:** `accessibility`, `css`, `documentation`, `priority:low`

### Context

Folder, switch-thumb, and button transitions now run only when reduced motion is not requested. The switch track transition remains unconditional, custom switches and range thumbs still need forced-colors handling, and the modern CSS browser baseline remains undocumented.

### Acceptance criteria

- Nonessential transitions are disabled for reduced motion.
- Custom interactive states remain visible in forced-colors mode.
- Supported browsers are documented.
- Build output is tested against the stated baseline.

---

## SID-019: Define release artifact and package metadata policy

**Labels:** `packaging`, `documentation`, `priority:low`

### Context

The Spicerack and controls manifests now include core publication metadata such as description, license, repository, bugs, and homepage. `npm pack --dry-run` succeeds. The remaining work is to formalize whether `dist` is committed or produced during release and document compatibility expectations.

### Scope

- Decide whether `dist` is committed or produced during packing.
- Verify artifacts are current in CI if committed.
- Add description, license, repository, keywords, and relevant engine/browser metadata.
- Document multiple-instance support, persistence keys, control ABI, style/CSP behavior, and version compatibility.

### Acceptance criteria

- Release steps deterministically produce the files shown by `npm pack --dry-run`.
- Stale committed artifacts fail CI, or artifacts are excluded and always built during release.
- Published package metadata and compatibility documentation are complete.

---

## SID-020: Replace build-time environment mutation

**Labels:** `build`, `cleanup`, `priority:low`

### Status and rationale

The developer disagreed with the original finding. This is not currently a correctness blocker, so it is optional rather than part of the main release path.

`packages/spicerack/vite.config.js` mutates `process.env.VITE_Spicerack_VERSION`, and source reads `import.meta.env.VITE_Spicerack_VERSION`. This works under the package's Vite build. A private `define` constant would make the compile-time dependency more explicit and avoid global environment mutation, but either approach is acceptable if the package always publishes compiled output.

### Optional acceptance criteria

- Version injection is deterministic in production builds.
- Importing source is not part of the public package contract.
- If changed, use a private compile-time constant such as `__Spicerack_VERSION__`.

---

## SID-021: Fix inferred action callbacks and structural render keys

**Labels:** `bug`, `config`, `priority:medium`

### Context

`getControlType()` infers a button when a control has an `on` function and no truthy value. The renderer forwards `on` as a plain prop, while `ButtonControl` emits `click`; the inferred callback is therefore not invoked. The working current form is an explicit `type: 'button'` with an `onClick` listener.

Unkeyed structural controls have a related rendering problem. Top-level controls use ``drone_${d.key}``, so multiple buttons or dividers without keys all receive `drone_undefined`. Nested structural controls have no explicit key. This can produce duplicate-key warnings and unstable component reuse.

Model creation skips buttons but not dividers. A divider without a key therefore throws `A valid key is required`; adding a key creates a model field with an `undefined` value even though the divider is purely structural.

### Scope

- Standardize action inference on the same callback convention used by component events, or explicitly wire the shorthand.
- Generate stable internal render keys from normalized config paths for controls that do not enter the model.
- Keep buttons, dividers, and folders free from unnecessary public model keys.

### Acceptance criteria

- The documented inferred or explicit button callback is invoked exactly once.
- Repeated unkeyed buttons and dividers have unique stable render keys.
- Structural controls inside folders also have stable keys.
- Dividers do not require a public key and do not create model fields.
- Tests cover action inference, explicit `onClick`, and repeated structural controls.

### Dependencies

Best implemented with SID-004 config normalization.

---

## Verified resolved findings

These do not need standalone issues unless regression tests are desired.

### Explicit `open` values now win

`getIsOpenSetting()` now uses nullish precedence correctly:

```js
const open = isOpenOption ?? (storageOpen === null ? true : storageOpen === 'true');
```

The storage value should still be read once, and tests belong in SID-002.

### Duplicate `value` props were removed

The controls now use `defineModel()` without also declaring a misleading `value` prop. The remaining event and disabled-state work is tracked in SID-006.

### Border shorthand was corrected

The shell now uses `border: 1px solid var(--sr-border-app)`.

### Clickable non-interactive elements were replaced

The logo and folder trigger are buttons, and toggle state uses `aria-pressed`. Remaining focus and disclosure-attribute fixes are tracked in SID-007.

### Compiled package exports

Spicerack now publishes its compiled ES module rather than Vue source. Package build and dry-run packing succeed.

### Reserved config metadata filtering

`key`, `type`, `value`, and `config` are no longer passed wholesale to control roots. Further centralization belongs in SID-004.

### Public declaration emission

Vite emits the maintained declaration to `dist/types/index.d.ts`, and the package's conditional exports expose it without using TSC to build the application.

## Accepted product constraint

### One folder level

Rendering one folder level is intentional. The model currently walks deeper levels even though the UI does not render them recursively, so SID-004 proposes validating and documenting the limit rather than adding recursive rendering.

## Review limitation

The live browser review could not be completed because browser access was not granted. Source review, package lint, all workspace builds, Spicerack's declaration emission, and `npm pack --dry-run` were completed successfully. A visual, responsive, screen-reader, and keyboard pass is still needed for SID-007, SID-012, SID-013, and SID-018.
