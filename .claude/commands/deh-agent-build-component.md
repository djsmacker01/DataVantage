# /deh-agent-build-component $ARGUMENTS

Spawn a focused sub-agent to build or rebuild a single shared component.

## Usage
```
/deh-agent-build-component VideoCard
/deh-agent-build-component CommentSection
/deh-agent-build-component BookingForm
/deh-agent-build-component TipTapEditor
/deh-agent-build-component TestimonialCarousel
```

## What this agent does
Reads the component spec from `/deh-components.md`, reads any existing version of the component, then builds it to full spec.

The agent will:
1. Identify the correct output file path from the component name (e.g., VideoCard → `src/components/cards/VideoCard.jsx`)
2. Build to spec: correct props, correct Supabase integration, correct styling with CSS variables
3. Use Framer Motion for hover animations where specified
4. Ensure the component handles loading, empty, and error states
5. No hardcoded colors — use CSS variables for all surfaces, text, and borders

## Component file map
| Component | File path |
|---|---|
| Button | src/components/ui/Button.jsx |
| SkeletonLoader | src/components/ui/SkeletonLoader.jsx |
| EmptyState | src/components/ui/EmptyState.jsx |
| VideoCard | src/components/cards/VideoCard.jsx |
| BlogCard | src/components/cards/BlogCard.jsx |
| BookingForm | src/components/forms/BookingForm.jsx |
| CommentSection | src/components/blog/CommentSection.jsx |
| ShareTray | src/components/blog/ShareTray.jsx |
| RichTextRenderer | src/components/blog/RichTextRenderer.jsx |
| TestimonialCarousel | src/components/testimonials/TestimonialCarousel.jsx |
| NewsletterSignup | src/components/newsletter/NewsletterSignup.jsx |
| CategoryFilter | src/components/video/CategoryFilter.jsx |
| TipTapEditor | src/components/editor/TipTapEditor.jsx |
| TipTapToolbar | src/components/editor/TipTapToolbar.jsx |

## Output
Agent returns the built component file.
