# Contributing to Spicerack

Thanks for helping improve Spicerack.

## Before you start

For substantial features or behavior changes, open an issue before writing code so
the proposed API and scope can be discussed. Bug fixes, documentation
improvements, and other focused changes can be submitted directly.

By participating in this project, you agree to keep discussions constructive,
respectful, and focused on the work.

## Development setup

Spicerack is an npm workspace monorepo. You will need a current Node.js release
that is supported by the versions of Vite and npm recorded in
`package-lock.json`.

Fork and clone the repository, then install dependencies from its root:

```sh
npm install
```

Build every workspace to verify the setup:

```sh
npm run build
```

## Repository structure

- `packages/spicerack` contains the framework-agnostic public API, application
  shell, model, event system, and control registry.
- `packages/controls` contains the built-in controls, authored as Vue single-file
  components and distributed as compiled components.
- `packages/extras` contains optional controls and serves as the reference for
  third-party control packages.
- `apps/demo` is a plain JavaScript consumer application. It must not depend on
  Vue directly.

Vue is an internal implementation and authoring tool. Consumer-facing examples
and APIs should remain usable from ordinary JavaScript without requiring users
to import or understand Vue.

## Working locally

Run the watcher for the package you are changing:

```sh
npm run dev --workspace @ozio/spicerack
npm run dev --workspace @ozio/spicerack-controls
npm run dev --workspace @ozio/spicerack-extras
```

Run the demo development server separately:

```sh
npm run dev --workspace @ozio/spicerack-demo
```

When changing a control, use the same public component contract for built-in and
third-party controls. Keep shared props small, add specialized props only to the
controls that use them, and avoid leaking Vue into the public consumer API.

## Validation

Before opening a pull request, build all workspaces:

```sh
npm run build
```

Lint each workspace that provides a lint script:

```sh
npm run lint --workspaces --if-present
```

There is not currently an automated test suite. Exercise affected behavior in
the demo and describe the manual verification in the pull request. If you change
a publishable package, you can also inspect its package contents:

```sh
npm run test-publish --workspace @ozio/spicerack
npm run test-publish --workspace @ozio/spicerack-extras
```

## Changesets

Add a Changeset for changes that affect a published package:

```sh
npx changeset
```

Select the affected package, choose the appropriate semantic version bump, and
write a concise user-facing summary. Commit the generated file in `.changeset`
with your change.

A Changeset is generally unnecessary for documentation-only changes, internal
refactors with no published behavior change, or changes limited to private
workspaces.

## Pull requests

Keep pull requests focused and avoid unrelated cleanup. In the description:

- explain the problem and the chosen solution;
- call out public API or behavior changes;
- list the commands and manual checks you ran;
- include screenshots or recordings for visible UI changes; and
- link the related issue, when one exists.

Update documentation and examples when changing public behavior. Ensure new
dependencies are declared by the workspace that uses them rather than relying
on workspace hoisting.

By contributing, you agree that your contributions will be licensed under the
project's MIT License.
