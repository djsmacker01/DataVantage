# /deh-agent-add-feature $ARGUMENTS

Spawn an agent to add a net-new feature to the platform without breaking existing code.

## Usage
```
/deh-agent-add-feature add Google Analytics tracking
/deh-agent-add-feature add reading progress bar to blog posts
/deh-agent-add-feature add video transcript tab
/deh-agent-add-feature add WhatsApp floating CTA button
/deh-agent-add-feature add booking calendar view in admin
/deh-agent-add-feature add search across both videos and blog
```

## What this agent does
1. Reads the relevant existing files to understand the current implementation
2. Plans the minimal change needed (no over-engineering)
3. Identifies exactly which files to create/edit
4. Implements the feature
5. Does not touch unrelated code

## Rules for this agent
- Do NOT refactor existing working code
- Do NOT add abstractions beyond what the feature requires
- Do NOT add error handling for scenarios that can't happen
- Use the existing design system: teal #01696f, gold #D19900, CSS variables for surfaces
- Match the existing code style (no comments unless the WHY is non-obvious)
- New Supabase tables/columns: write the SQL and remind the user to run it
- New npm packages: install them and update package.json

## Output
Agent returns: files created/modified, any SQL to run, any install commands needed.
