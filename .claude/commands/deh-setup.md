# /deh-setup

Scaffold and wire up the Data Expert Hub project from scratch.

## What this skill does
Sets up a new Vite + React project for Data Expert Hub with all dependencies, Tailwind v4 config, environment files, and base folder structure.

## Steps
1. Create `package.json` with all required dependencies:
   - Core: react, react-dom, react-router-dom, @supabase/supabase-js
   - UI: framer-motion, lucide-react, sonner, react-helmet-async
   - Editor: @tiptap/react, @tiptap/starter-kit, and all tiptap extensions (image, link, underline, text-align, highlight, table, table-row, table-cell, table-header, character-count, placeholder)
   - Utils: date-fns
   - Dev: @tailwindcss/vite, tailwindcss, @vitejs/plugin-react, vite
2. Create `vite.config.js` with `@tailwindcss/vite` plugin and `@` path alias pointing to `./src`
3. Create `index.html` with Google Fonts (Instrument Serif) and Fontshare (General Sans) loaded in `<head>`
4. Create `.env.example` with `VITE_SUPABASE_URL=` and `VITE_SUPABASE_ANON_KEY=`
5. Create `.gitignore` (node_modules, dist, .env)
6. Create `src/main.jsx` importing `./index.css` and rendering `<App />`
7. Run `npm install --legacy-peer-deps`
8. Confirm build passes with `npm run build`

## Design constraints
- Tailwind v4: NO `tailwind.config.js`, NO postcss, NO autoprefixer. Use `@theme {}` in CSS only.
- Path alias `@` must resolve to `src/`
- Do NOT use `npm create vite` (interactive prompt). Write files manually.

## Output
Confirm: ✅ Project scaffolded, ✅ npm install complete, ✅ build passes
