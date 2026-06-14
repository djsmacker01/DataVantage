# /deh-supabase

Set up the complete Supabase backend: client, schema SQL, RLS policies, storage config, data hooks.



$$ LANGUAGE SQL SECURITY DEFINER;
```

## Storage buckets
Create in Supabase Dashboard → Storage:
- `video-thumbnails` — Public
- `blog-covers` — Public  
- `video-files` — Public
- `resources` — Private (signed URLs)

## Output
Confirm all hooks and SQL file created. Remind user to run SQL in Supabase dashboard.
