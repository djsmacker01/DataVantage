# /deh-agent-deploy

Agent that prepares the platform for deployment and verifies everything is production-ready.

## What this agent does
Runs a full pre-deployment checklist and fixes any issues found.

## Checklist

### Build
- Run `npm run build` — must pass with 0 errors
- Check bundle sizes: warn if any chunk exceeds 500KB gzipped

### Environment
- `.env` must NOT be committed (check `.gitignore` includes `.env`)
- `.env.example` must exist with empty values as template
- All `import.meta.env.VITE_*` references must have matching keys in `.env.example`

### Routing (SPA)
- `public/_redirects` must exist with `/* /index.html 200` for Netlify
- OR `vercel.json` with rewrites config for Vercel:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```

### SEO
- Every page has `<SEOHead>` component
- `index.html` has default `<title>` and `<meta name="description">`
- OG image referenced in SEOHead must be an absolute URL (not relative)

### Security
- No API keys or secrets hardcoded in any source file
- Admin route protected by `<PrivateRoute>`
- Supabase RLS enabled on all tables (verify in `supabase-schema.sql`)

### Performance
- All page components are lazy-loaded (`React.lazy` + `Suspense`)
- Images use `loading="lazy"` where applicable
- Fonts loaded in `index.html` `<head>` with `rel="preconnect"` for Google/Fontshare

### Favicon
- `public/favicon.svg` exists

## Deployment options

### Vercel (recommended)
```
npm install -g vercel
vercel --prod
```
Set env vars in Vercel Dashboard → Project Settings → Environment Variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

### Netlify
```
npm run build
# Drag dist/ folder to netlify.com/drop
```
Or connect GitHub repo and set build command `npm run build`, publish dir `dist`.
Set env vars in Netlify → Site Settings → Environment Variables.

## Output
Agent reports: ✅/❌ for each checklist item, applies any automatic fixes, provides deployment command.
