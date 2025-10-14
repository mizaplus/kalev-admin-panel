# Repository Guidelines

## Project Structure & Module Organization
This Vite + React + TypeScript app keeps runtime code in `src/`, where `main.tsx` wires providers before rendering `App.tsx`. Reusable UI primitives live under `src/components/ui` (hyphenated filenames), hooks in `src/hooks`, helpers in `src/lib`, and static bundles in `src/assets`. Static files ship from `public/`, while Amplify backend artifacts stay in `amplify/` with environment metadata logged in `amplify_outputs.json`. Use the `@/*` path alias defined in `tsconfig.json`.

## Build, Test, and Development Commands
Use pnpm for lifecycle tasks. `pnpm dev` starts the Vite dev server with fast refresh. `pnpm build` runs `tsc -b` before emitting the production bundle to `dist/`. `pnpm preview` serves the built assets for smoke checks, and `pnpm lint` runs ESLint with TypeScript, React Hooks, and Refresh plugins; add `--fix` for safe autofixes.

## Coding Style & Naming Conventions
TypeScript runs in strict mode; keep code free of `any`, unused symbols, or unchecked side effects. Screens and providers stay PascalCase (`App.tsx`), while primitives in `components/ui` remain kebab-case. Use double-quoted imports, prefer the shared `cn` helper from `src/lib/utils.tsx` for Tailwind class composition, and lint before opening a PR.

## Testing Guidelines
No automated test suite is committed yet. When adding coverage, align with the Vite toolchain by introducing Vitest plus React Testing Library and colocate specs as `ComponentName.test.tsx`. Mock Amplify calls so tests stay deterministic, and describe manual QA steps (auth, drag-and-drop, reporting) in the PR until automation lands.

## Commit & Pull Request Guidelines
Git history shows Conventional Commit prefixes (`feat:`, `refactor:`); continue that style with concise imperatives. Keep PRs focused, include a bullet summary, reference issue IDs, and attach screenshots or recordings for UI updates. List any Amplify CLI steps and prerequisites reviewers need to reproduce with `pnpm dev`, and rebase on `main` before requesting review.

## Security & Configuration Tips
Store secrets in untracked `.env.local` files and surface them through `import.meta.env`. Regenerate backend artifacts with the Amplify CLI rather than manual edits, then confirm `amplify_outputs.json` matches the target stack. Rotate credentials immediately if a secret is exposed.
