# /deh-layout

Build the full Layout shell: Header, Footer, Logo, and MobileDrawer.

## Brand context
Primary: #01696f | Accent: #D19900 | Fonts: Instrument Serif (display) + General Sans (body)

## Files to create

### `src/components/layout/Logo.jsx`
Inline SVG logo — abstract bar chart / data node mark:
- 4 vertical bars in teal (#01696f), 3rd bar in gold (#D19900)
- Connected dots above bars forming a trend line
- Wordmark beside it: "Data**Expert** Hub" — "Expert" in teal, rest in `var(--color-text-base)`
- Uses Instrument Serif font
- Wraps in `<Link to="/">` for navigation

### `src/components/layout/Header.jsx`
Sticky header (`position:sticky; top:0; z-index:30`):
- Backdrop blur: `backdrop-filter:blur(14px); background: rgba(surface,0.85)`
- Border-bottom appears only after `useScrolled(80)` returns true (1px solid `var(--color-border)`)
- Left: `<Logo />`
- Center/right desktop nav: Home | About | Services | Videos | Blog | Contact
  - Active link: teal color + 2px teal underline at bottom of link
  - Inactive: muted color, hover shows surface-alt background pill
- Right actions:
  - Sun/Moon icon button toggling dark mode via `useTheme()`
  - "Book a Call" button — gold background, white text, rounded-xl, links to `/book/consultation`
- Mobile (< md): hide nav + book button, show hamburger icon (Menu from lucide) that opens `<MobileDrawer />`

### `src/components/layout/MobileDrawer.jsx`
Framer Motion slide-in from left:
- Semi-transparent dark overlay (`AnimatePresence`, `motion.div` opacity 0→1 on overlay)
- Drawer: 288px wide, `x: '-100%'` → `x: 0`, spring animation
- Header: Logo + X close button
- Nav links (same as desktop) with teal active state
- Bottom: full-width "Book a Consultation" gold button linking to `/book/consultation`

### `src/components/layout/Footer.jsx`
3-column grid on desktop, stacked on mobile. Background: `var(--color-surface-alt)`:

**Column 1 — Brand:**
- `<Logo />`
- 2-line tagline: "Turning data into decisions. Based in Nigeria, serving the world."
- Social icons: LinkedIn, Twitter/X, YouTube (inline SVG paths, not lucide — lucide doesn't have all socials)

**Column 2 — Quick Links:**
Links to: About | Services | Videos | Blog | Contact | Book Consultation

**Column 3 — Newsletter:**
- Heading: "Get weekly data insights"
- `<NewsletterSignup variant="footer" />` component
- Fine print: "Unsubscribe anytime. No spam."

**Bottom bar:**
`© {year} Data Expert Hub. Built with excellence.` | Privacy Policy | Terms

### `src/components/layout/Layout.jsx`
`<Header />` + `<main className="flex-1"><Outlet /></main>` + `<Footer />`
Full-height flex column with `background: var(--color-surface)`

## Output
Confirm all 5 files created. Header must be visually complete with working dark mode toggle.
