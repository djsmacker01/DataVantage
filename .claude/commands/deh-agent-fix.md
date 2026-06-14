# /deh-agent-fix $ARGUMENTS

Spawn a targeted debug agent to investigate and fix a specific problem.

## Usage
```
/deh-agent-fix dark mode not working on Services page
/deh-agent-fix video comments not loading
/deh-agent-fix booking form not submitting
/deh-agent-fix admin sidebar not showing on mobile
/deh-agent-fix TipTap editor losing content on save
```

## What this agent does
Takes the problem description from $ARGUMENTS and:
1. Searches relevant files for the root cause
2. Reads the actual file contents (not just a summary)
3. Identifies the exact bug
4. Applies a targeted fix — no refactoring, no cleanup, just the fix
5. Explains what was wrong and what was changed

## Debugging approach by category

**Dark mode issues:**
Check for hardcoded colors (`bg-white`, `text-black`, `bg-gray-*`, `border-gray-*`).
Replace with CSS variables: `var(--color-surface)`, `var(--color-text-base)`, `var(--color-border)`.

**Supabase data not loading:**
Check: hook query conditions, RLS policies (is the data published?), network errors in hook error state.

**Form not submitting:**
Check: form onSubmit handler, required fields, Supabase insert payload shape, RLS INSERT policy.

**Animation issues:**
Check: AnimatePresence has only one child, motion components have `key` props, `whileInView` has `viewport={{ once: true }}`.

**Route/navigation issues:**
Check: route path matches, nested route paths (admin uses `path="login"` not `path="/admin/login"`), PrivateRoute redirecting correctly.

**Build errors:**
Read the exact error message, find the file+line, fix the import or syntax issue.

## Output
Agent returns: what the bug was, what file(s) were changed, and the exact fix applied.
