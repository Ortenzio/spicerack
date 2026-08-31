# Spicerack Review: Issue Backlog

Reviewed: 2026-08-31

Scope:

- `packages/spicerack`
- `packages/controls`

Ignore:

- `packages/extras`
- `apps/demo`

This document is organized as copy-ready GitHub issues. Each open item has a suggested title, labels, context, scope, and acceptance criteria. The developer notes from the previous review were rechecked against the current source rather than treated as resolved automatically.

## Current status

| ID | Priority | Status | Suggested issue title |
| --- | --- | --- | --- |
| SID-001 | Critical | Resolved | Publish compiled Spicerack output instead of Vue source |
| SID-002 | Critical | Open | Add public API and packed-package tests |
| SID-003 | High | Open | Add mount and unmount lifecycle management |
| SID-004 | High | Open | Validate and normalize config in one pass |
| SID-005 | High | Partial | Harden model keys and reject duplicates |
| SID-006 | High | Partial | Define and apply the control value/event ABI |
| SID-007 | High | Open | Restore visible keyboard focus |
| SID-008 | High | Resolved | Publish accurate public TypeScript declarations |
| SID-009 | High | Open | Correct dependency ranges and build externals |
| SID-010 | Medium | Open | Isolate core styles without constraining third-party controls |
| SID-011 | Medium | Resolved | Forward explicit control props instead of raw config records |
| SID-012 | Medium | Partial | Make the panel responsive and scrollable |
| SID-013 | Medium | Open | Choose accessible panel semantics and status feedback |
| SID-014 | Medium | Open | Define stylesheet ownership and CSP behavior |
| SID-015 | Medium | Partial | Finish control correctness and dead-code cleanup |
| SID-016 | Medium | Partial | Enforce workspace quality scripts consistently |
| SID-017 | Medium | Partial | Make style tokens authoritative |
| SID-018 | Low | Partial | Add reduced-motion, forced-colors, and browser policy |
| SID-019 | Low | Partial | Define release artifact and package metadata policy |
| SID-020 | Low | Optional | Replace build-time environment mutation |
| SID-021 | Medium | Open | Fix inferred action callbacks and structural render keys |

## Recommended milestones

### Milestone 1: publishable core

SID-002, SID-003, SID-004, SID-005, SID-009, and SID-021.

### Milestone 2: stable control-authoring contract

SID-006, SID-010, SID-011, SID-014, SID-015, and SID-017.

### Milestone 3: production UX and maintenance

SID-007, SID-012, SID-013, SID-016, SID-018, SID-019, and SID-020.

---

## SID-001: Publish compiled Spicerack output instead of Vue source

**Labels:** `bug`, `packaging`, `priority:critical`

### Resolution

The package now exports `./dist/index.js`, publishes `dist`, and builds to a self-contained ES module. The workspace demo build succeeds without adding Spicerack's private alias to the demo.

Verified with:

- `npm run build`
- `npm run test-publish -w @ozio/spicerack`

The dry-run tarball contains the compiled JavaScript, README, package manifest, and public declaration. A clean tarball-install fixture remains worthwhile under SID-002, but the original source-export defect is resolved.

---

## SID-002: Add public API and packed-package tests

**Labels:** `testing`, `packaging`, `priority:critical`

### Context

There are currently no tests for the framework-neutral behavior promised to consumers. The package-source export regression would have been caught by a packed-consumer smoke test.

### Scope

Add the smallest test setup that covers public behavior rather than Vue internals.

### Acceptance criteria

- Construction does not mount UI.
- Explicit options override persisted values.
- Mounting works with every documented target type and invalid targets produce useful errors.
- An instance can be unmounted without leaving DOM, watchers, or app state behind.
- Model writes update controls and control input updates the model.
- `on('change')` returns a cleanup function that stops notifications.
- Duplicate keys and unknown control types produce errors containing the config path.
- Type inference selects text, number, and boolean controls.
- A custom control uses the same binding and prop path as a built-in control.
- A packed-package fixture imports and mounts Spicerack without depending on a Vue plugin.

### Dependencies

The packed test depends on SID-001. Lifecycle assertions depend on SID-003.

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

## SID-005: Harden model keys and reject duplicates

**Labels:** `bug`, `validation`, `priority:high`

### Context

The model now uses a null-prototype object, validates non-empty string keys, and rejects duplicates. This resolves prototype-key corruption and silent overwrite behavior.

The remaining gap is diagnostic quality: duplicate and invalid-key errors do not include config paths, and invalid-key handling logs the entire item before throwing.

### Scope

- Track config paths during traversal.
- Include paths in invalid and duplicate-key errors.
- Remove the unconditional `console.log(item)` from the error path.

### Acceptance criteria

- Duplicate keys throw an error that includes both relevant config paths.
- Invalid keys identify the failing config path without logging user config.
- Existing prototype-key and duplicate protections remain covered by tests.

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

## SID-007: Restore visible keyboard focus

**Labels:** `accessibility`, `css`, `priority:high`

### Context

Clickable elements were changed to buttons and the toggle now uses `aria-pressed`, so that developer note is mostly resolved. However, text, number, textarea, and select controls still remove outlines, and buttons plus the custom switch have no replacement `:focus-visible` treatment.

The folder's `aria-expanded` and `aria-controls` are currently placed on the outer `div`; they should be on the button that performs the action.

### Scope

- Add a consistent visible focus treatment.
- Preserve native outlines unless a replacement is active.
- Show focus on the visible switch track when its transparent checkbox is focused.
- Move folder disclosure attributes to its button.

### Acceptance criteria

- Every interactive element has a visible focus indicator in both themes.
- Focus remains visible under forced-colors mode.
- Folder disclosure semantics are exposed on the button.
- Keyboard-only operation works for header actions, folders, toggles, switches, and all form controls.

---

## SID-008: Publish accurate public TypeScript declarations

**Labels:** `types`, `public-api`, `priority:high`

### Resolution

The maintained declaration now describes the module API, including `createSpicerack`, options, tokens, config, model fields, `json()`, mount targets, and unsubscribe return values. Vite emits it to `dist/types/index.d.ts` without using TSC to build the application, and package exports expose it through a `types` condition.

Verified with:

- `npm run build -w @ozio/spicerack`
- `npm run lint -w @ozio/spicerack`
- `npm run test-publish -w @ozio/spicerack`

The packed tarball contains `dist/types/index.d.ts`. More precise discriminated config and control generics can be added later as the ABI stabilizes under SID-004 and SID-006.

---

## SID-009: Correct dependency ranges and build externals

**Labels:** `dependencies`, `packaging`, `priority:high`

### Context

Spicerack depends on controls using `"*"`, allowing future breaking releases. The controls build externalizes `@ozio/spicerack-icons` although it neither imports nor declares that package. Spicerack currently bundles Vue while also listing Vue as a runtime dependency.

Bundling Vue is defensible because consumers should not need to install or understand Vue, but the strategy must avoid accidental duplicate runtimes and should be tested.

### Scope

- Replace workspace `"*"` dependencies with intentional compatible ranges for publication.
- Remove the unused icons external.
- Document and test the decision to bundle or externalize Vue.
- Confirm that controls and extras externalize their Vue peer dependency.

### Acceptance criteria

- Published dependency ranges cannot silently cross a breaking release.
- Build externals correspond to real imports and manifest dependencies.
- A packed consumer has exactly the installation requirements documented by Spicerack.
- The chosen Vue strategy is covered by bundle and interoperability tests.

---

## SID-010: Isolate core styles without constraining third-party controls

**Labels:** `css`, `controls`, `design-system`, `priority:medium`

### Context

The current reset applies typography, margin, padding, and box sizing to `.sl-app` and every descendant. Low specificity makes overrides possible, but a third-party control still enters a broad undocumented reset environment.

There are two different isolation goals:

1. Prevent Spicerack styles from leaking into the host page.
2. Prevent host-page styles from affecting Spicerack.

The `.sl-`/`data-sl-*` namespace already handles the first goal reasonably well. Complete protection from incoming host styles requires a shadow root; selector scoping alone cannot guarantee it. Shadow DOM does not require Custom Elements, but it would complicate stylesheet injection, third-party styles, portals, and consumer theming, so it should only be added if real integrations demonstrate a need.

### Recommended first step

Keep the light-DOM architecture and narrow the reset:

```css
.sl-app {
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-feature-settings: "tnum" 1, "ss01" 1, "ss02" 1, "zero" 1, "calt" 1;
  font-weight: 400;
}

:where(.sl-app, .sl-app *) {
  box-sizing: border-box;
}
```

Apply margin, padding, appearance, and typography resets only to owned selectors such as `.sl-app__button` and `[data-sl-control="text"] > input`.

CSS Cascade Layers may make ordering clearer, but they do not isolate styles from unlayered host CSS. An optional ShadowRoot mount can be explored later if host-site collisions are observed.

### Acceptance criteria

- Spicerack selectors remain namespaced and do not style host-page elements.
- Third-party headings, fieldsets, and other semantic elements are not globally stripped by Spicerack.
- Built-in controls remain visually unchanged.
- The inherited font, color, `color-scheme`, and public custom properties available to third-party controls are documented.
- A fixture with aggressive host styles is added to reveal collisions.

---

## SID-011: Forward explicit control props instead of raw config records

**Labels:** `architecture`, `controls`, `priority:medium`

### Context

This item is resolved. `RESERVED_PROPS` defines `key`, `value`, `type`, and `config`, and `omitProps()` removes them before the remaining control props and listeners are bound.

For example:

```js
{
  key: 'points',
  type: 'number',
  value: 10,
  label: 'Points',
  analyticsId: 'score'
}
```

now forwards `label` and `analyticsId`, while Spicerack's reserved metadata stays internal.

### Follow-up

SID-004 should move this filtering into config normalization so metadata separation is performed once instead of during every render. Tests should preserve arbitrary third-party props and listener props while ensuring reserved fields do not become DOM attributes.

---

## SID-012: Make the panel responsive and scrollable

**Labels:** `css`, `responsive`, `priority:medium`

### Context

The panel now has a dynamic-viewport maximum height and scrolling, and public width/padding/radius tokens are applied. The remaining width issue is that `width: var(--sl-app-width)` plus `min-width: 14rem` is not capped to the viewport. On a 320px viewport, edge spacing and the minimum width can still force overflow depending on user token values.

### Scope

- Use the width token with a viewport-aware maximum.
- Cap inline size to the viewport.
- Prefer scrolling the controls area instead of the entire panel so the header remains visible.
- Account for safe-area insets if mobile support matters.

### Acceptance criteria

- The panel remains inside a 320px-wide viewport.
- Long configs are reachable without scrolling the host page.
- Header actions remain reachable while controls scroll.
- All four corner positions work at supported viewport sizes.

---

## SID-013: Choose accessible panel semantics and status feedback

**Labels:** `accessibility`, `public-api`, `priority:medium`

### Context

The root uses `role="dialog"` without an accessible name, focus management, or modal behavior. A persistent developer panel is more naturally an `aside` or labeled `region`. Clipboard export also ignores its promise, leaving success and failure invisible.

### Scope

- Choose semantics based on actual behavior.
- Add an accessible name.
- Announce clipboard success or failure.
- Give icon-only buttons accessible names rather than relying only on `title`.

### Acceptance criteria

- The panel has an appropriate role and accessible name.
- It does not claim dialog semantics unless dialog behavior is implemented.
- Every icon button has a programmatic name.
- Clipboard results are exposed through a nonintrusive status region.

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

The shell now consumes `appPadding`, `appRadius`, `appWidth`, and `controlGap`. However, the token map was renamed to emit `--sl-control-radius` and `--sl-control-gap` while two consumers still use the old `--sl-r-control` and `--sl-gap-control` names. As a result, the shared control radius and folder-content gap tokens are currently ineffective.

### Scope

- Change shared directives to `var(--sl-control-radius)`.
- Change folder content to `var(--sl-control-gap)`.
- Audit every token consumer after future token renames.

### Acceptance criteria

- Every documented token has an observable effect.
- The shell continues to use `--sl-app-padding`, `--sl-app-radius`, and `--sl-app-width`.
- No source references the obsolete `--sl-r-control` or `--sl-gap-control` properties.
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

`getItemType()` infers a button when an item has an `on` function and no truthy value. The renderer forwards `on` as a plain prop, while `ButtonControl` emits `click`; the inferred callback is therefore not invoked. The working current form is an explicit `type: 'button'` with an `onClick` listener.

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

The shell now uses `border: 1px solid var(--sl-border-app)`.

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
