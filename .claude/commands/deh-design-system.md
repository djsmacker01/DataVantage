# /deh-design-system

Build the full design system: CSS tokens, dark mode, contexts, router shell, and utility components.

## Brand specification
- Primary: #01696f (teal)
- Accent: #D19900 (gold)
- Surfaces: #faf9f6 (light), #0f1011 (dark)
- Surface-alt: #f3f1eb (light), #1a1c1d (dark)
- Border: #e5e2da (light), #2a2d2e (dark)
- Text: #1a1a1a (light), #f0ede8 (dark)
- Muted: #6b7280 (light), #9ca3af (dark)
- Display font: Instrument Serif (Google Fonts)
- Body font: General Sans (Fontshare)

## Files to create

### `src/index.css`
- `@import "tailwindcss"` at top
- `@theme {}` block registering all brand colors as CSS custom properties
- `@layer base` with `:root` variables, `[data-theme="dark"]` overrides
- Body: `font-family: General Sans`, smooth transitions on background/color
- H1–H6: `font-family: Instrument Serif`
- `.grain::after` utility for animated noise texture overlay
- `.prose-content` styles for blog body rendering (h1–h3, p, ul, ol, blockquote, code, pre, a, img, table)
- Custom scrollbar (teal thumb)

### `src/contexts/ThemeContext.jsx`
- Reads `localStorage` key `deh-theme` on init
- Falls back to `prefers-color-scheme`
- Sets `data-theme` attribute on `document.documentElement`
- Exposes `{ theme, toggleTheme }` via context

### `src/contexts/AuthContext.jsx`
- Wraps `supabase.auth.getSession()` + `onAuthStateChange`
- Exposes `{ user, loading }`
- Cleans up subscription on unmount

### `src/components/auth/PrivateRoute.jsx`
- If loading: show `<PageLoader />`
- If no user: `<Navigate to="/admin/login" replace />`
- Otherwise: render children

### `src/App.jsx`
- Wrap in `<HelmetProvider>`, `<ThemeProvider>`, `<AuthProvider>`, `<BrowserRouter>`
- `<AnimatePresence mode="wait">` wrapping `<Routes location={location} key={location.pathname}>`
- All routes lazy-loaded with `React.lazy` + `<Suspense fallback={<PageLoader />}>`
- Routes: / | /about | /services | /book/consultation | /book/training | /videos | /videos/:slug | /blog | /blog/:slug | /contact | /admin/* (PrivateRoute)
- `<Toaster position="bottom-right" richColors />` from sonner
- `<ScrollToTop />` inside BrowserRouter

### `src/components/utils/PageTransition.jsx`
- `motion.div` with `variants: { initial: {opacity:0, y:14}, animate: {opacity:1, y:0}, exit: {opacity:0, y:-8} }`
- Duration 0.28s easeInOut

### `src/components/utils/ScrollToTop.jsx`
- `useEffect` on `pathname` → `window.scrollTo({top:0, behavior:'instant'})`

### `src/components/utils/PageLoader.jsx`
- Centered `Loader2` icon from lucide-react with `animate-spin` in teal

### `src/components/seo/SEOHead.jsx`
- Uses `react-helmet-async` `<Helmet>`
- Sets `<title>`, `<meta name="description">`, all OG tags, twitter card tags
- Title format: `{title} | Data Expert Hub`

## Output
Confirm all files created with no import errors.
