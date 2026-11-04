# Iron Compass

**Start here:** [Shared source and release status](SOURCE_OF_TRUTH.md) · [Current handover](docs/CURRENT_HANDOVER.md) · [Source continuity checks](https://github.com/afair86/iron-compass/actions/workflows/source-continuity.yml)

Modern Next.js App Router project styled with Tailwind CSS and the custom `styles/iron-compass.css` design system.

## Tech Stack
- Next.js 16 (App Router)
- Tailwind CSS + PostCSS
- TypeScript
- next/font for Oswald + Inter

## Development
```bash
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) and edit any route inside `app/`. Hot reloading keeps the Tailwind styles in sync.

## Styling Guidelines
- Global layers live in `app/globals.css` plus `styles/iron-compass.css`.
- Tailwind tokens/utilities are configured in `tailwind.config.js`.
- Components should prefer Tailwind utility classes; Chakra/Vite assets have been removed.

## Deployment
Use the Git-connected Vercel branch previews for review. Follow SOURCE_OF_TRUTH.md before any production release; main is not yet the recovered website baseline. Do not publish an unpushed or dirty local checkout as though it were a GitHub release. Use `npm run build` to verify production output before shipping.

## Blog standard
Future blog articles follow the approved editorial and implementation guide (5 A.M. Standard + Shift Worker Routine as quality benchmark):

- Guide: `content/blog/_standards/IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md`
- Checklist: `content/blog/_standards/COMPLETION-CHECKLIST.md`
- Agent rule: `.cursor/rules/iron-compass-blog-standard.mdc`
