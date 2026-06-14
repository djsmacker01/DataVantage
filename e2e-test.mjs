// Playwright feature test — DataVantage / Data Expert Hub
import { chromium } from 'playwright'

const BASE = 'http://localhost:5174'
const results = []

function log(status, feature, detail = '') {
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : status === 'WARN' ? '⚠️' : '🔍'
  const msg = `${icon} [${feature}]${detail ? ' — ' + detail : ''}`
  console.log(msg)
  results.push({ status, feature, detail })
}

async function waitForPageLoad(page, timeout = 8000) {
  await page.waitForLoadState('domcontentloaded', { timeout })
  await page.waitForTimeout(800) // let lazy components mount
}

async function run() {
  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()

  // Collect console errors
  const consoleErrors = []
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()) })
  page.on('pageerror', err => consoleErrors.push(err.message))

  // ─── 1. HOME PAGE ──────────────────────────────────────────────────────────
  console.log('\n═══ HOME PAGE ═══')
  await page.goto(BASE)
  await waitForPageLoad(page)

  const heroHeading = await page.locator('h1').first().textContent().catch(() => null)
  heroHeading
    ? log('PASS', 'Home – hero heading', heroHeading.trim().slice(0, 60))
    : log('FAIL', 'Home – hero heading', 'No <h1> found')

  const navLinks = await page.locator('nav a').count()
  navLinks >= 4
    ? log('PASS', 'Home – navigation', `${navLinks} nav links found`)
    : log('FAIL', 'Home – navigation', `Only ${navLinks} nav links`)

  const ctaButtons = await page.locator('a[href*="book"], button').count()
  ctaButtons > 0
    ? log('PASS', 'Home – CTA buttons visible', `${ctaButtons} found`)
    : log('WARN', 'Home – CTA buttons', 'None found')

  // Stats / CountUp section
  const statsSection = await page.locator('[class*="count"], [data-testid*="stat"]').count()
  const hasNumbers = await page.locator('text=/\\d+\\+/').count()
  hasNumbers > 0
    ? log('PASS', 'Home – stats/counter section', `${hasNumbers} stat numbers visible`)
    : log('WARN', 'Home – stats section', 'No stat numbers visible yet')

  // Theme toggle
  const themeToggle = await page.locator('[aria-label*="theme"], [aria-label*="dark"], [aria-label*="light"], button[title*="theme"]').first()
  if (await themeToggle.count()) {
    await themeToggle.click()
    await page.waitForTimeout(300)
    log('PASS', 'Home – theme toggle', 'Clicked successfully')
    await themeToggle.click() // revert
  } else {
    log('WARN', 'Home – theme toggle', 'Not found via aria-label')
  }

  // ─── 2. ABOUT PAGE ─────────────────────────────────────────────────────────
  console.log('\n═══ ABOUT PAGE ═══')
  await page.goto(`${BASE}/about`)
  await waitForPageLoad(page)

  const aboutH1 = await page.locator('h1').first().textContent().catch(() => null)
  aboutH1
    ? log('PASS', 'About – heading renders', aboutH1.trim().slice(0, 60))
    : log('FAIL', 'About – heading', 'No h1 found')

  const bioText = await page.locator('text=/Muminah|Omolara|data analyst|Power BI/i').first().count()
  bioText
    ? log('PASS', 'About – bio content present')
    : log('WARN', 'About – bio content', 'Name/keywords not found in DOM')

  const certSection = await page.locator('text=/certif/i').first().count()
  certSection
    ? log('PASS', 'About – certifications section present')
    : log('WARN', 'About – certifications', 'Not visible')

  // ─── 3. SERVICES PAGE ──────────────────────────────────────────────────────
  console.log('\n═══ SERVICES PAGE ═══')
  await page.goto(`${BASE}/services`)
  await waitForPageLoad(page)

  const servicesH1 = await page.locator('h1').first().textContent().catch(() => null)
  servicesH1
    ? log('PASS', 'Services – page loads', servicesH1.trim().slice(0, 60))
    : log('FAIL', 'Services – heading', 'No h1')

  const serviceCards = await page.locator('section, article, [class*="card"]').count()
  serviceCards > 0
    ? log('PASS', 'Services – cards/sections visible', `${serviceCards} found`)
    : log('WARN', 'Services – content', 'No obvious service cards')

  // ─── 4. BLOG LISTING ────────────────────────────────────────────────────────
  console.log('\n═══ BLOG PAGE ═══')
  await page.goto(`${BASE}/blog`)
  await waitForPageLoad(page)

  const blogH1 = await page.locator('h1').first().textContent().catch(() => null)
  blogH1
    ? log('PASS', 'Blog – listing page loads', blogH1.trim().slice(0, 60))
    : log('FAIL', 'Blog – heading', 'No h1')

  // Wait for posts (Supabase async)
  await page.waitForTimeout(2000)
  const blogLinks = await page.locator('a[href*="/blog/"]').count()
  blogLinks > 0
    ? log('PASS', 'Blog – posts loaded', `${blogLinks} post links`)
    : log('WARN', 'Blog – posts', 'No blog post links found (DB may be empty or slow)')

  // Search / filter
  const searchInput = await page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]').count()
  searchInput > 0
    ? log('PASS', 'Blog – search input present')
    : log('WARN', 'Blog – search', 'No search input found')

  // Navigate to first blog post if any
  if (blogLinks > 0) {
    const firstPostHref = await page.locator('a[href*="/blog/"]').first().getAttribute('href')
    await page.goto(`${BASE}${firstPostHref}`)
    await waitForPageLoad(page)
    const postH1 = await page.locator('h1').first().textContent().catch(() => null)
    postH1
      ? log('PASS', 'Blog – single post renders', postH1.trim().slice(0, 60))
      : log('FAIL', 'Blog – single post', 'No h1 on post page')

    const postContent = await page.locator('article, [class*="prose"], [class*="content"]').count()
    postContent > 0
      ? log('PASS', 'Blog – post body renders')
      : log('WARN', 'Blog – post body', 'No article/prose element found')
  }

  // ─── 5. VIDEOS PAGE ─────────────────────────────────────────────────────────
  console.log('\n═══ VIDEOS PAGE ═══')
  await page.goto(`${BASE}/videos`)
  await waitForPageLoad(page)

  const videosH1 = await page.locator('h1').first().textContent().catch(() => null)
  videosH1
    ? log('PASS', 'Videos – listing page loads', videosH1.trim().slice(0, 60))
    : log('FAIL', 'Videos – heading', 'No h1')

  await page.waitForTimeout(2000)
  const videoCards = await page.locator('a[href*="/videos/"]').count()
  videoCards > 0
    ? log('PASS', 'Videos – video cards loaded', `${videoCards} found`)
    : log('WARN', 'Videos – cards', 'No video links found (DB may be empty)')

  // Navigate to first video if any
  if (videoCards > 0) {
    const firstVideoHref = await page.locator('a[href*="/videos/"]').first().getAttribute('href')
    await page.goto(`${BASE}${firstVideoHref}`)
    await waitForPageLoad(page)
    const videoH1 = await page.locator('h1').first().textContent().catch(() => null)
    videoH1
      ? log('PASS', 'Videos – single video page loads', videoH1.trim().slice(0, 60))
      : log('FAIL', 'Videos – single page', 'No h1')

    const iframe = await page.locator('iframe').count()
    iframe > 0
      ? log('PASS', 'Videos – YouTube iframe embedded')
      : log('WARN', 'Videos – iframe', 'No iframe on video page')
  }

  // ─── 6. CONTACT FORM ────────────────────────────────────────────────────────
  console.log('\n═══ CONTACT FORM ═══')
  await page.goto(`${BASE}/contact`)
  await waitForPageLoad(page)

  const contactH1 = await page.locator('h1').first().textContent().catch(() => null)
  contactH1
    ? log('PASS', 'Contact – page loads', contactH1.trim().slice(0, 60))
    : log('FAIL', 'Contact – heading', 'No h1')

  const nameInput = page.locator('input[placeholder*="name" i], input[placeholder*="Full name" i]').first()
  const emailInput = page.locator('input[type="email"]').first()
  const messageTA = page.locator('textarea').first()

  if (await nameInput.count() && await emailInput.count() && await messageTA.count()) {
    log('PASS', 'Contact – form fields present (name, email, message)')

    // Test form validation (empty submit)
    await page.getByRole('button', { name: /send message/i }).click()
    await page.waitForTimeout(500)
    const stillOnContact = page.url().includes('/contact')
    stillOnContact
      ? log('PASS', 'Contact – required field validation (stays on page)')
      : log('FAIL', 'Contact – validation', 'Form submitted without required fields')

    // Fill form
    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    await messageTA.fill('This is an automated test message.')
    log('PASS', 'Contact – form fields fillable')
  } else {
    log('FAIL', 'Contact – form fields', 'One or more required fields missing')
  }

  // WhatsApp buttons
  const waButtons = await page.locator('a[href*="wa.me"], a[href*="whatsapp"]').count()
  waButtons > 0
    ? log('PASS', 'Contact – WhatsApp link present', `${waButtons} found`)
    : log('WARN', 'Contact – WhatsApp', 'No WhatsApp links found')

  // ─── 7. BOOK CONSULTATION ───────────────────────────────────────────────────
  console.log('\n═══ BOOK CONSULTATION ═══')
  await page.goto(`${BASE}/book/consultation`)
  await waitForPageLoad(page)

  const consultH1 = await page.locator('h1').first().textContent().catch(() => null)
  consultH1
    ? log('PASS', 'Consultation – page loads', consultH1.trim().slice(0, 60))
    : log('FAIL', 'Consultation – heading', 'No h1')

  const bookingForm = await page.locator('form').count()
  bookingForm > 0
    ? log('PASS', 'Consultation – booking form present')
    : log('FAIL', 'Consultation – booking form', 'No <form> element found')

  // ─── 8. BOOK TRAINING ───────────────────────────────────────────────────────
  console.log('\n═══ BOOK TRAINING ═══')
  await page.goto(`${BASE}/book/training`)
  await waitForPageLoad(page)

  const trainH1 = await page.locator('h1').first().textContent().catch(() => null)
  trainH1
    ? log('PASS', 'Training – page loads', trainH1.trim().slice(0, 60))
    : log('FAIL', 'Training – heading', 'No h1')

  // ─── 9. NEWSLETTER SUBSCRIPTION ────────────────────────────────────────────
  console.log('\n═══ NEWSLETTER ═══')
  await page.goto(BASE)
  await waitForPageLoad(page)

  const newsletterInput = await page.locator('input[type="email"]').first()
  const newsletterCount = await page.locator('input[type="email"]').count()
  if (newsletterCount > 0) {
    log('PASS', 'Newsletter – email input found on Home')
    await newsletterInput.fill('newsletter@test.com')
    log('PASS', 'Newsletter – email input fillable')
  } else {
    // Check footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(500)
    const footerEmail = await page.locator('input[type="email"]').count()
    footerEmail > 0
      ? log('PASS', 'Newsletter – email input found in footer')
      : log('WARN', 'Newsletter – input', 'No email input found on home page or footer')
  }

  // ─── 10. NAVIGATION / ROUTING ───────────────────────────────────────────────
  console.log('\n═══ NAVIGATION ═══')
  await page.goto(BASE)
  await waitForPageLoad(page)

  // Click through nav
  const routes = [
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/blog', label: 'Blog' },
    { path: '/videos', label: 'Videos' },
    { path: '/contact', label: 'Contact' },
  ]

  for (const { path, label } of routes) {
    await page.goto(`${BASE}${path}`)
    await waitForPageLoad(page)
    const ok = page.url().includes(path)
    ok
      ? log('PASS', `Nav – ${label} route reachable`)
      : log('FAIL', `Nav – ${label}`, `URL: ${page.url()}`)
  }

  // 404 page
  await page.goto(`${BASE}/this-does-not-exist-xyz`)
  await waitForPageLoad(page)
  const notFoundText = await page.locator('text=/404|not found|doesn\'t exist/i').first().count()
  notFoundText
    ? log('PASS', 'Nav – 404 page renders')
    : log('WARN', 'Nav – 404', 'No 404/not-found text found')

  // ─── 11. RESPONSIVE / MOBILE ────────────────────────────────────────────────
  console.log('\n═══ MOBILE VIEWPORT ═══')
  await ctx.close()
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mobilePage = await mobileCtx.newPage()

  await mobilePage.goto(BASE)
  await waitForPageLoad(mobilePage)

  const mobileH1 = await mobilePage.locator('h1').first().count()
  mobileH1
    ? log('PASS', 'Mobile – home page renders')
    : log('FAIL', 'Mobile – home', 'No h1 on mobile viewport')

  // hamburger / mobile menu
  const hamburger = await mobilePage.locator('[aria-label*="menu" i], [class*="hamburger"], [class*="mobile-menu"], button[class*="menu"]').count()
  hamburger > 0
    ? log('PASS', 'Mobile – hamburger/menu button present')
    : log('WARN', 'Mobile – hamburger', 'No hamburger button found')

  await mobileCtx.close()

  // ─── 12. ADMIN ROUTE (unauthenticated) ──────────────────────────────────────
  console.log('\n═══ ADMIN (UNAUTH) ═══')
  const authCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const authPage = await authCtx.newPage()

  await authPage.goto(`${BASE}/admin`)
  await waitForPageLoad(authPage)

  const isRedirectedOrLogin = authPage.url().includes('login') || await authPage.locator('text=/sign in|log in|email.*password/i').count() > 0
  isRedirectedOrLogin
    ? log('PASS', 'Admin – unauthenticated access redirects to login', authPage.url())
    : log('WARN', 'Admin – auth guard', `URL: ${authPage.url()} — check PrivateRoute`)

  // Navigate directly to login page to test form
  await authPage.goto(`${BASE}/admin/login`)
  // AdminLogin is lazy-loaded via Suspense; the footer has an email input that appears first.
  // Wait for the password field specifically — it only exists in AdminLogin.
  await authPage.waitForSelector('input[type="password"]', { timeout: 12000 }).catch(() => null)
  const loginEmail = await authPage.locator('input[type="email"]').count()
  const loginPassword = await authPage.locator('input[type="password"]').count()
  loginEmail && loginPassword
    ? log('PASS', 'Admin – login form renders (email + password fields)')
    : log('WARN', 'Admin – login form', 'Email/password inputs not found')

  // Test login form validation (use placeholder to target AdminLogin's email, not footer)
  if (loginEmail && loginPassword) {
    await authPage.locator('input[placeholder="admin@example.com"]').fill('wrong@example.com')
    await authPage.locator('input[type="password"]').fill('wrongpassword')
    await authPage.getByRole('button', { name: /sign in/i }).click()
    await authPage.waitForTimeout(3000)
    // Should show an error toast or stay on login page
    const stillOnLogin = authPage.url().includes('login')
    stillOnLogin
      ? log('PASS', 'Admin – bad credentials rejected (stays on login)')
      : log('FAIL', 'Admin – credential check', 'Accepted wrong credentials')
  }

  await authCtx.close()

  // ─── SUMMARY ────────────────────────────────────────────────────────────────
  await browser.close()

  const pass = results.filter(r => r.status === 'PASS').length
  const fail = results.filter(r => r.status === 'FAIL').length
  const warn = results.filter(r => r.status === 'WARN').length

  console.log('\n' + '═'.repeat(60))
  console.log(`SUMMARY: ${pass} PASS  |  ${fail} FAIL  |  ${warn} WARN`)
  console.log('═'.repeat(60))

  if (fail > 0) {
    console.log('\nFAILED:')
    results.filter(r => r.status === 'FAIL').forEach(r => console.log(`  ❌ ${r.feature}: ${r.detail}`))
  }
  if (warn > 0) {
    console.log('\nWARNINGS:')
    results.filter(r => r.status === 'WARN').forEach(r => console.log(`  ⚠️  ${r.feature}: ${r.detail}`))
  }
}

run().catch(err => {
  console.error('Test runner crashed:', err)
  process.exit(1)
})
