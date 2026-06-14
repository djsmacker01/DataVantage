import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ─── BLOG POSTS ────────────────────────────────────────────────────────────

const blogPosts = [
  {
    title: "Why Your Business Dashboard is Lying to You (And What to Do About It)",
    slug: "why-your-business-dashboard-is-lying-to-you",
    excerpt: "Most Nigerian businesses have dashboards. Very few have dashboards they can actually trust. Here's how to tell the difference — and how to fix it.",
    cover_image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    category: "Data Analysis",
    tags: ["dashboards", "Power BI", "data quality", "Nigeria"],
    read_time_minutes: 8,
    author_name: "Muminah Omolara Shehu",
    author_avatar_url: "/images/muminah-shehu.jpg",
    published: true,
    published_at: new Date("2025-05-10").toISOString(),
    body: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "A few months ago I sat in a meeting with a Lagos-based retail chain. The head of finance had one number on her screen. The operations director had a different one. The CEO had a third. All three were looking at \"the same\" sales figure for Q1. All three numbers were wrong." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "This is not unusual. In fact, it's one of the most common problems I see across Nigerian businesses — from fast-moving consumer goods companies in Kano to fintech startups in Lekki. The dashboard exists. The trust doesn't." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "The real problem isn't the tool" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "When a dashboard shows wrong numbers, most people blame Power BI or Tableau or Excel. But the tool is rarely the problem. Dashboards lie because of what's underneath them: messy source data, inconsistent definitions, and pipelines that haven't been validated." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Take \"revenue\" as an example. Ask five people in a Nigerian organisation what \"revenue\" means and you'll get five different answers. Does it include VAT? Is it when the invoice is raised or when payment is received? Does it include inter-branch transfers? Each person building a report makes their own assumption. The dashboard adds them all up and presents confident, beautifully designed nonsense." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Four signs your dashboard can't be trusted" }]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Two people run the \"same\" report and get different numbers. If your colleagues can't replicate each other's figures, your definitions aren't documented." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Nobody challenges the numbers. Paradoxically, when everyone just accepts whatever the dashboard says, it often means nobody actually believes it — they've just stopped arguing." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "The dashboard doesn't match the accounting system. Your BI tool and your ERP should tell the same story. If they don't, one of them is wrong — and it's usually the dashboard." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Data is only refreshed manually. If someone has to 'upload the latest file' before the dashboard updates, you have a data quality time-bomb waiting to go off." }] }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "A real-world fix: how we cleaned up a retailer's reporting" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Going back to that Lagos retailer — we spent two weeks doing nothing but defining terms. What is a \"sale\"? What is a \"return\"? How do we handle partial payments? We wrote it all down, got sign-off from finance, operations, and the CEO, and built those definitions into the data model before touching Power BI." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "The result: one number. Everyone in every meeting now sees the same figure, pulled from the same validated source. The disagreements didn't disappear — but now they're about strategy, not about whose spreadsheet is right." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Where to start if your dashboard is broken" }]
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Audit your source data first. Before you touch the dashboard, find out how clean the underlying data actually is. Check for duplicates, nulls, and inconsistent formatting." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Document your metric definitions. Write down exactly what each KPI means, who owns it, and how it's calculated. Keep it somewhere everyone can see." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Automate your data refresh. Manual uploads introduce human error. Connect directly to your source system where possible." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "Build a validation layer. Every dashboard should have a row count check, a total reconciliation with the source, and an alert if something looks off." }] }]
            }
          ]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Your dashboard should be the most trusted document in your business. If it isn't, you're making decisions on gut feel — and calling it data-driven. Let's fix that." }]
        }
      ]
    }
  },
  {
    title: "The ₦50 Million Mistake: What Bad Requirements Cost Nigerian Businesses",
    slug: "the-50-million-mistake-bad-requirements-cost",
    excerpt: "A Nigerian fintech spent months building a feature nobody asked for. It's more common than you think — and business analysis is the only thing that prevents it.",
    cover_image_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    category: "Business",
    tags: ["business analysis", "requirements", "project management", "Nigeria"],
    read_time_minutes: 7,
    author_name: "Muminah Omolara Shehu",
    author_avatar_url: "/images/muminah-shehu.jpg",
    published: true,
    published_at: new Date("2025-05-03").toISOString(),
    body: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "In 2023, a mid-size Nigerian fintech spent eight months and roughly ₦50 million building a new feature for their mobile app. When it launched, fewer than 3% of users ever touched it. The CEO was furious. The tech team was exhausted. Nobody could explain how this had happened." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "I know exactly how it happened. The product manager had a conversation with one customer who complained about X. That complaint became a requirement. The requirement became a user story. The user story became a six-month development sprint. Nobody checked whether other customers had the same problem. Nobody defined what 'solving' the problem actually looked like. Nobody asked what the business goal was." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "What business analysis actually is" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Business analysis is the practice of figuring out what a business actually needs — as opposed to what it thinks it wants — before any building starts. It's the discipline of asking uncomfortable questions: Why do we need this? Who will use it? What does success look like? What happens if we don't build it at all?" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "In practice, it means sitting with your stakeholders, mapping the current process (the messy reality, not the idealised version), identifying where the real pain points are, and translating all of that into clear specifications that developers, designers, and executives can all agree on." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Why Nigerian businesses skip it" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Business analysis is often the first thing cut when schedules are tight. I hear the same reasons over and over: \"We already know what we need,\" \"We don't have time for all that documentation,\" \"Our dev team is waiting.\"" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "What nobody says out loud: proper requirements gathering takes 2-4 weeks. Fixing a product built on wrong requirements takes 6-12 months. The maths is obvious, but the pressure to start building is always there." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "The three questions that prevent most mistakes" }]
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "\"What problem are we actually solving?\" Not the surface complaint — the underlying business problem. A customer saying 'the app is slow' might really be saying 'I can't complete a transfer when I need to.' Those require completely different fixes." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "\"Who are all the people this affects?\" In a Nigerian logistics company, a new tracking feature might look simple from the customer's side but touch warehouse staff, drivers, finance, and three different systems. Find all the stakeholders before you finalise anything." }] }]
            },
            {
              type: "listItem",
              content: [{ type: "paragraph", content: [{ type: "text", text: "\"How will we know if we've succeeded?\" If you can't define what done looks like — with a measurable outcome — you don't have a requirement, you have a wish." }] }]
            }
          ]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "A better outcome: how good BA saved a government project" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "A state government agency I worked with was about to commission a ₦120 million custom software build to manage their HR processes. Before any vendor was engaged, we spent three weeks mapping their existing workflows — what the staff actually did every day, not what the HR policy manual said they did." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "We discovered that 70% of their 'custom requirements' were already features in a standard off-the-shelf HR platform. The remaining 30% were mostly workarounds for broken internal processes that could be fixed with training, not software. The final solution cost ₦18 million and was live in four months. The requirements-gathering phase cost ₦1.5 million and saved them over ₦100 million." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "That's what good business analysis looks like in practice. Not paperwork for its own sake — but the discipline that makes everything else cheaper, faster, and more likely to actually work." }]
        }
      ]
    }
  },
  {
    title: "How Nigerian SMEs Can Use AI Right Now — No PhD Required",
    slug: "how-nigerian-smes-can-use-ai-right-now",
    excerpt: "AI isn't just for big tech companies. Here are five practical ways Nigerian small businesses are already using it to cut costs, save time, and serve customers better.",
    cover_image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    category: "Tools",
    tags: ["AI", "machine learning", "SME", "Nigeria", "automation"],
    read_time_minutes: 6,
    author_name: "Muminah Omolara Shehu",
    author_avatar_url: "/images/muminah-shehu.jpg",
    published: true,
    published_at: new Date("2025-04-26").toISOString(),
    body: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Every week I hear some version of the same thing from Nigerian business owners: \"AI is for Silicon Valley companies. We don't have the data, the budget, or the technical team for it.\" And every week I show them three or four ways their competitors are already using AI to do things they're still doing manually." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "The gap between 'AI as a buzzword in a TED talk' and 'AI as a practical business tool' is smaller than you think — especially now. You don't need a data science team. You don't even need clean data to get started. You just need to know which problems are worth solving first." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "1. Demand forecasting for inventory" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "A Kano-based manufacturer of household goods was losing roughly 18% of potential revenue every month — not because demand wasn't there, but because they kept running out of their three best-selling products. They were restocking based on gut feel and last month's numbers." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "We built a simple forecasting model using three years of their sales data (which existed in an Excel file they'd never fully used). The model accounted for seasonality, local market patterns, and supply lead times. Stockouts dropped by 60% in the first quarter. The 'AI' involved was a gradient boosting model running on a laptop — nothing exotic." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "2. Customer service automation on WhatsApp" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "A restaurant group in Lagos was handling 200+ WhatsApp messages per day — booking confirmations, menu questions, complaints — with a team of two. Response times were averaging 4 hours. Customers were leaving bad reviews, not because the food was bad, but because nobody replied." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "A WhatsApp chatbot (built on the WhatsApp Business API with a basic AI layer) now handles 80% of inbound messages automatically: reservations, FAQs, order status updates. The human team handles complex complaints and VIP customers. Response time dropped from 4 hours to under 2 minutes. Setup cost: under ₦400,000 including integration." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "3. Fraud detection for fintech and payment businesses" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Nigerian payment processors lose significant revenue to fraud every year. The challenge is that fraud patterns in Nigeria are different from fraud patterns in the US or UK — which means off-the-shelf Western fraud models often miss local patterns entirely." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Machine learning models trained on Nigerian transaction data — your own transaction data — can detect anomalies that rules-based systems miss. One payment aggregator I worked with reduced fraud losses by 43% in six months using a model trained entirely on their own historical chargebacks. The model costs less to run per month than the salary of one junior analyst." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "4. Document processing and extraction" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Insurance companies, banks, and government agencies in Nigeria process enormous amounts of paper and PDF documents. Staff manually extracting data from forms, invoices, and certificates is slow, expensive, and error-prone. Optical Character Recognition (OCR) combined with a basic classification model can extract structured data from unstructured documents automatically — cutting processing time from days to minutes." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Where to start" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Don't start with AI. Start with the problem. Pick the one manual, repetitive, expensive process in your business that you wish someone else was doing. Then ask whether that process is pattern-based and data-rich enough for automation. If yes, that's your first AI project." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "The best AI implementations I've seen in Nigeria started small, proved ROI quickly, and expanded from there. Nobody built a 'strategy.' They just solved one real problem well." }]
        }
      ]
    }
  },
  {
    title: "Building Data Infrastructure for Nigerian Businesses: Where to Start",
    slug: "building-data-infrastructure-for-nigerian-businesses",
    excerpt: "Your data is scattered across five systems, three Excel files, and one person's laptop. Here's a practical roadmap for getting it all in one reliable place.",
    cover_image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    category: "Engineering",
    tags: ["data engineering", "ETL", "cloud", "Nigeria", "infrastructure"],
    read_time_minutes: 9,
    author_name: "Muminah Omolara Shehu",
    author_avatar_url: "/images/muminah-shehu.jpg",
    published: true,
    published_at: new Date("2025-04-18").toISOString(),
    body: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "A logistics company in Lagos came to me with a problem I've heard a hundred times: their sales data was in Zoho CRM. Their finance data was in QuickBooks. Their operations data was in a custom-built Access database from 2011. And their most important reports — the ones the CEO looked at every morning — were in an Excel file that one analyst rebuilt manually every week." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "When that analyst went on leave, the CEO had no data for two weeks. That was the moment they realised they didn't have a data problem — they had an infrastructure problem." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "What data infrastructure actually means" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Data infrastructure is everything between your raw data and your insights. It's the pipelines that move data from your source systems, the warehouse that stores it in a structured, queryable format, the transformation layer that cleans and standardises it, and the access layer that lets your analysts and dashboards read from it." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "When it works well, it's invisible. When it's broken — or missing entirely — every data request becomes a week-long project and nobody trusts the numbers." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "The Nigerian infrastructure reality" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Building data infrastructure in Nigeria comes with constraints you won't find in most textbooks. Intermittent internet connectivity means your pipelines need to handle dropped connections gracefully. Power instability means on-premise servers are a liability. Dollar-denominated cloud costs mean you need to be efficient — a badly configured BigQuery setup can run up surprising bills." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "These aren't insurmountable problems, but they do mean the standard playbook needs adapting. Cloud-first is usually the right answer for Nigerian businesses, but which cloud service and how it's configured matters a lot." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "A practical three-stage roadmap" }]
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Stage 1: Centralise (weeks 1–4)" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Before you can analyse anything, you need everything in one place. For most Nigerian businesses, the right starting point is a PostgreSQL database on a cloud platform (Supabase, Railway, or RDS on AWS). Set up basic ETL scripts that pull data from your source systems on a schedule — nightly is fine to start. Don't worry about perfect data quality yet. Just get it all in one place." }]
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Stage 2: Clean and transform (weeks 4–8)" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Once your raw data is centralised, use dbt (data build tool) to build transformation models. This is where you standardise naming conventions, handle nulls and duplicates, define your business metrics consistently, and create the clean, reliable tables your dashboards will read from. dbt is free, well-documented, and ideal for teams without a dedicated data engineering team." }]
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Stage 3: Automate and monitor (weeks 8–12)" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Automation is what makes infrastructure actually infrastructure — as opposed to a set of scripts someone runs occasionally. Set up Apache Airflow or a simpler tool like Prefect to schedule your pipelines. Add data quality checks (dbt tests work well for this). Set up alerts so you know immediately when something breaks instead of finding out when the CEO's dashboard shows blanks." }]
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "The outcome for the logistics company" }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "Twelve weeks after we started, the Lagos logistics company had a single source of truth: a PostgreSQL warehouse pulling from Zoho, QuickBooks, and their operations database every hour. Their analyst no longer spent Monday mornings rebuilding the Excel file. The CEO's dashboard updated automatically. When that analyst went on annual leave the following year, nobody noticed from a data perspective." }]
        },
        {
          type: "paragraph",
          content: [{ type: "text", text: "That's what good data infrastructure feels like: you stop thinking about the pipes and start thinking about the insights." }]
        }
      ]
    }
  }
]

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────

const testimonials = [
  {
    name: 'Chioma Nwosu',
    role: 'Head of Strategy',
    company: 'TechBridge Africa',
    quote: "Before we started working together, our reporting was all over the place — different teams pulling different numbers and nobody could agree on anything. Three months later we had one dashboard everyone trusted, and we got back 15 hours a week we used to spend reconciling spreadsheets.",
  },
  {
    name: 'Emeka Obi',
    role: 'Founder & CEO',
    company: 'PayStack Ventures',
    quote: "Honestly, I was nervous about putting my whole team through SQL training — half of them were convinced it wasn't for them. But the way it was taught, using examples they actually recognised, made everything click. They're querying our databases on their own now.",
  },
  {
    name: 'Aisha Bello',
    role: 'Data Manager',
    company: 'Nigerian National Petroleum',
    quote: "What I appreciated most was that nothing felt off-the-shelf. The solution actually fit how we work, our infrastructure, our constraints. The pipeline has been running for over a year now — 2 million records a day — without us having to think about it.",
  },
]

// ─── VIDEOS ────────────────────────────────────────────────────────────────

const videos = [
  {
    title: 'How to Build a Sales Dashboard in Power BI from Scratch',
    slug: 'how-to-build-sales-dashboard-power-bi',
    description: 'Step-by-step walkthrough of building a complete sales dashboard in Power BI using Nigerian retail data. Covers data modelling, DAX measures, and visual best practices.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Power BI',
    duration: '22:14',
    view_count: 3812,
    published: true,
  },
  {
    title: 'SQL for Nigerian Business Analysts — Writing Your First Query',
    slug: 'sql-for-nigerian-business-analysts',
    description: 'A beginner-friendly introduction to SQL for professionals in Nigerian businesses. Uses real Nigerian datasets and focuses on the queries you will use every single week.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'SQL',
    duration: '18:45',
    view_count: 4521,
    published: true,
  },
  {
    title: 'Understanding ETL Pipelines: What They Are and Why Your Business Needs One',
    slug: 'understanding-etl-pipelines',
    description: 'Plain-English explanation of ETL pipelines — what they do, how they work, and when a Nigerian business should invest in building one.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Data Analysis',
    duration: '14:32',
    view_count: 2190,
    published: true,
  },
  {
    title: 'Python for Data Analysis: Reading and Cleaning Nigerian Business Data',
    slug: 'python-for-data-analysis-cleaning',
    description: 'Hands-on Python tutorial covering pandas basics, data cleaning techniques, and how to handle the messy real-world data you will find in Nigerian businesses.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Python',
    duration: '31:08',
    view_count: 2874,
    published: true,
  },
  {
    title: 'From Excel to Power BI: Making the Switch Without Losing Your Mind',
    slug: 'excel-to-power-bi-making-the-switch',
    description: 'Practical guide for Excel-heavy professionals ready to move to Power BI. Covers what changes, what stays the same, and the fastest path to your first report.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Power BI',
    duration: '26:50',
    view_count: 1648,
    published: true,
  },
  {
    title: 'How to Build a Data Career in Nigeria in 2025',
    slug: 'how-to-build-data-career-nigeria-2025',
    description: 'Honest advice on breaking into the Nigerian data job market — what skills actually matter, which certifications are worth it, and how to get your first data role.',
    youtube_url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Career',
    duration: '19:22',
    view_count: 4103,
    published: true,
  },
]

// ─── SEED ─────────────────────────────────────────────────────────────────

async function seed() {
  console.log('Seeding testimonials...')
  await supabase.from('testimonials').delete().neq('id', 0)
  const { error: tErr } = await supabase.from('testimonials').insert(testimonials)
  if (tErr) console.error('Testimonials error:', tErr.message)
  else console.log(`  ✓ ${testimonials.length} testimonials`)

  console.log('Seeding videos...')
  const { error: vErr } = await supabase.from('videos').upsert(videos, { onConflict: 'slug' })
  if (vErr) console.error('Videos error:', vErr.message)
  else console.log(`  ✓ ${videos.length} videos`)

  console.log('Seeding blog posts...')
  const { error: bErr } = await supabase.from('blog_posts').upsert(blogPosts, { onConflict: 'slug' })
  if (bErr) console.error('Blog posts error:', bErr.message)
  else console.log(`  ✓ ${blogPosts.length} blog posts`)

  console.log('\nSeed complete!')
  console.log('Remember to run the author migration SQL if blog_posts already existed:')
  console.log('  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT \'Muminah Shehu\';')
  console.log('  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_avatar_url TEXT;')
}

seed().catch(console.error)
