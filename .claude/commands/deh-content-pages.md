# /deh-content-pages

Build the About, Services, BookConsultation, BookTraining, and Contact pages.

## `src/pages/About.jsx`
**Section 1 — Hero:**
2-col: headshot placeholder (rounded-3xl, teal border) + name/title/3-paragraph bio.
"Available for new projects" badge above heading.
"Work With Me →" CTA button (primary).

**Section 2 — Skills:**
Full-width pills grid: Data Analysis | SQL (PostgreSQL, MySQL) | Python (Pandas, NumPy) | Power BI | Tableau | Microsoft Excel | Business Intelligence | ETL Pipelines | dbt | BigQuery | Requirements Gathering | Process Mapping
Each pill: CheckCircle icon (teal) + skill name. Background: surface-alt border.

**Section 3 — Career Timeline:**
Vertical timeline with absolute center line. Each entry:
- Year label (left, teal, xs bold)
- Dot (teal border circle)
- Right: title (bold) + org name (teal, sm) + desc (muted)
4 entries: 2024–Present (Independent), 2022–2024 (FinTech), 2020–2022 (Dangote), 2019 (University of Lagos, BSc Statistics First Class)
`whileInView` slide-in from left on each entry.

**Section 4 — My Story:**
Centered, max-w-3xl. 2 paragraphs + a pull quote in Instrument Serif italic with teal color.

**Section 5 — CTA:**
Centered "Ready to get started?" with "Book a consultation →" button.

---

## `src/pages/Services.jsx`
4 service sections, each with anchor ID: `data-analysis`, `business-analysis`, `data-engineering`, `training`.

Each section is a 2-col grid (text + includes card), alternating layout (odd: text-left, even: text-right):

**Text side:**
- Icon + category pill
- H2 title (Instrument Serif, 3xl–4xl)
- 3 paragraphs of description
- "Who it's for" tags row (rounded-full pills, surface-alt)

**Includes card side** (surface-alt bg, border):
- "What's included" — bullet list with Check icons
- Pricing line
- "Book This Service →" Button (primary for even index, accent for odd)

Services:
1. Data Analysis Consulting — BarChart3 icon — from ₦350,000
2. Business Analysis — Briefcase icon — from ₦250,000
3. Data Engineering — Database icon — from ₦500,000
4. Training & Workshops — GraduationCap icon — from ₦150,000/person

---

## `src/pages/BookConsultation.jsx`
2-col layout:
**Left:** "Book a session" label + H1 "1-on-1 Data Consultation" + 2-para description + 3 info bullets (CalendarDays, Clock, MessageSquare icons)
**Right:** `<BookingForm defaultService="consultation" />` in surface-alt card

---

## `src/pages/BookTraining.jsx`
Same pattern as BookConsultation but:
- Gold accent color
- H1 "Training & Coaching Session"
- Info bullets: Users (individual/team), BookOpen (tailored curriculum), Award (certificate)
- Popular topics pills: SQL Fundamentals | Python | Power BI | Excel Advanced | Data Storytelling | Intro to BI
- `<BookingForm defaultService="training" />`

---

## `src/pages/Contact.jsx`
**Left — Form** (surface-alt card):
Fields: Name, Email, Subject (dropdown: General enquiry|Project proposal|Training request|Speaking|Partnership|Other), Message.
Inserts to `contact_messages` table. On success: replaces form with checkmark + "I'll respond within 24 hours."

**Right — Info block:**
- MapPin: Lagos, Nigeria
- Mail: hello@dataexperthub.ng (mailto link)
- Linkedin: LinkedIn profile link
- Clock: Mon–Fri, 9AM–6PM WAT
Gold "Book directly →" suggestion box at bottom of info side.

---

## All pages
- Wrap in `<PageTransition>`
- Include `<SEOHead title="..." description="..." path="..." />`
- Mobile-first responsive

## Output
5 page files created. Each renders correctly with SEO and proper Supabase integration.
