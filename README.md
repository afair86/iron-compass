# Iron Compass

Modern Next.js App Router project styled with Tailwind CSS and the custom `styles/iron-compass.css` design system.

## Tech Stack
- Next.js 14 (App Router)
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
Deploy with Vercel (`npm run deploy`) or any platform that supports a standard Next.js build. Use `npm run build` locally to verify production output before shipping.

## Blog standard
Future blog articles follow the approved editorial and implementation guide (5 A.M. Standard + Shift Worker Routine as quality benchmark):

- Guide: `content/blog/_standards/IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md`
- Checklist: `content/blog/_standards/COMPLETION-CHECKLIST.md`
- Agent rule: `.cursor/rules/iron-compass-blog-standard.mdc`
