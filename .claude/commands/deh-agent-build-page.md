# /deh-agent-build-page $ARGUMENTS

Spawn a focused sub-agent to build a single page from scratch (or rebuild it).

## Usage
```
/deh-agent-build-page Home
/deh-agent-build-page BlogSingle
/deh-agent-build-page VideoSingle
/deh-agent-build-page AdminBookings
```

## What this agent does
Takes the page name from $ARGUMENTS and builds or rebuilds it completely.

The agent will:
1. Read any existing version of the page file (if it exists)
2. Read the relevant skill spec (e.g., `/deh-homepage.md` for Home, `/deh-blog-system.md` for Blog/BlogSingle)
3. Build the page to full spec including:
   - All sections/features described in the spec
   - Correct Supabase data fetching via custom hooks
   - Skeleton loaders + empty states
   - `<PageTransition>` wrapper
   - `<SEOHead>` with appropriate meta
   - Framer Motion animations
   - Mobile-first responsive layout
   - Correct CSS variable usage (no hardcoded colors that break dark mode)
4. Verify no TypeScript/ESLint errors
5. Confirm the file is complete

## Context the agent needs
- Brand: teal #01696f, gold #D19900, Instrument Serif (display), General Sans (body)
- Path alias `@` = `src/`
- All hooks are in `src/hooks/`
- All shared components are in `src/components/`
- Supabase client from `@/lib/supabase`
- Page files go in `src/pages/` (admin pages in `src/pages/admin/`)

## Output
Agent returns the complete built file with a summary of what was implemented.
