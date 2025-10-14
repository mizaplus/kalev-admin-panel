# Repository Guidelines

## Project Structure & Module Organization
The application code lives in `src/`, with entry points `App.tsx` and `index.tsx`. Group shared hooks, context, and utility helpers in feature folders to keep domain logic close to its screens. Static assets belong in `public/`; keep generated files (Amplify outputs, build artifacts) out of `src/` to preserve clean TypeScript imports.

## Build & Development Commands
Use `npm start` for the CRA dev server with live reload at http://localhost:3000. Run `npm run build` to produce an optimized `/build` bundle for deployment. Reserve `npm run eject` for rare cases where custom configuration is unavoidable.

## Coding Style & Naming Conventions
This project compiles with TypeScript; prefer strong typing, React function components, and hooks over legacy classes. Follow two-space indentation, Prettier-compatible formatting, and let `react-scripts` ESLint warnings guide fixes before committing. Name components and hooks with PascalCase (`HeroSectionEditor.tsx`) and utility modules with camelCase (`formatDate.ts`). Co-locate styles as `.css` files beside their components when possible.

## Commit & Pull Request Guidelines
The history follows Conventional Commits (`feat:`, `fix:`, `chore:`); keep subject lines imperative and under 72 characters. Each PR should include: concise description of the change, linked Linear/Jira issue or GitHub ticket, and UI screenshots or screen recordings for visible updates. Request at least one teammate review, ensure CI checks pass, and mention follow-up tasks in the PR body.

## Environment & Security Tips
Store environment secrets in `.env.local` and never commit them; CRA only exposes `REACT_APP_*` variables to the browser. Document required keys in `.env.example` and run `npm audit` before releases to catch vulnerable dependencies early.
