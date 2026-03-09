# Himalkom Landing Page

Landing page for Himalkom built with React + Vite and Tailwind CSS. Fast dev, responsive UI, and clean component structure.

## Deployment
see ```.github/workflows/main.yml```

## Tech Stack

- React 19 + React Router
- Vite 6
- Tailwind CSS v4
- Framer Motion, Swiper, Lucide Icons
- Axios for data fetching

## Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (repo uses `pnpm` and lockfile)

## Quick Start

```sh
pnpm install
pnpm dev
```

Dev server runs on http://localhost:5173 by default.

## Available Scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm preview` — preview the production build locally
- `pnpm lint` — run ESLint

## Build & Preview

```sh
pnpm build
pnpm preview
```

## Project Notes

- Path alias: use `@/` to import from `src` (configured in `vite.config.js`).
- Assets live in `src/assets` and public static files in `public`.
- Data fetching: a simple hook `useFetchData(endpoint, baseUrl)` is available in `src/hooks/useAPI.js`.

## Contributing

Issues and PRs are welcome. Please keep changes focused and describe the context clearly.

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/HimalkomIPB/eclipse-frontend?utm_source=oss&utm_medium=github&utm_campaign=HimalkomIPB%2Feclipse-frontend&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
