# Escala Digital Ventures UI

Approved v1 marketing site built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Requirements

- Node.js 22+
- npm

## Workflow

```bash
npm install
npm run dev
npm run lint
npx tsc --noEmit
npm run build
```

## Routes

- `/` — approved Spanish home
- `/styleguide` — internal noindex component and token reference

## Structure

- `app/` — App Router routes, metadata, and global design tokens
- `components/` — typed presentational and interactive components
- `content/es/` — reviewed Spanish shared, home, and client content
- `content/en/`, `content/ca/` — reserved for reviewed translations

The contact form validates in the browser but does not transmit or persist data. See `TODO.md` before connecting production services and `DECISIONS.md` for approved design rationale.
