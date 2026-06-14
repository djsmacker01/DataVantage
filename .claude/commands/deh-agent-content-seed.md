# /deh-agent-content-seed

Agent that inserts realistic seed/demo content into Supabase so the platform has something to show.

## What this agent does
Inserts sample data into all Supabase tables using the Supabase client from `src/lib/supabase.js`.
Creates a standalone seed script: `scripts/seed.js` that can be run with `node scripts/seed.js`.

## Seed data to generate

### testimonials (3 records)
Nigerian business professionals. Names, roles, companies, realistic 3-4 sentence quotes about data consulting experience.

### videos (6 records)
Published videos with:
- Nigerian/African relevant titles (e.g., "How to Build a Sales Dashboard in Power BI", "SQL for Nigerian Business Analysts")
- Categories: Data Analysis, SQL, Power BI, Python, Career
- YouTube URLs: use real public YouTube embed-safe URLs or placeholder `https://youtube.com/watch?v=dQw4w9WgXcQ`
- Slugs generated from titles
- Durations like "14:32", "22:05"
- view_count between 120–4500
- `published: true`

### blog_posts (4 records)
Published posts with:
- Nigerian business context titles (e.g., "Why Nigerian SMEs Are Losing Money Without a Data Strategy")
- Categories: Data Analysis, Business, Career
- Excerpts 1-2 sentences
- read_time_minutes between 4–12
- `published: true`, `published_at: new Date().toISOString()`
- Body: simple TipTap JSON with a few paragraphs (use `{ type: 'doc', content: [{type:'paragraph', content:[{type:'text', text:'...'}]}] }`)

## Script format (`scripts/seed.js`)
```js
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config' // reads .env

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function seed() {
  // insert testimonials
  // insert videos
  // insert blog_posts
  console.log('Seed complete!')
}
seed()
```

Also install `dotenv` as dev dep if not already present.
Run instruction: `node --experimental-vm-modules scripts/seed.js`

## Output
`scripts/seed.js` created. Remind user to run it after Supabase is set up and `.env` is filled.
