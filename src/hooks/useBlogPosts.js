import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useBlogPosts({ category, search, limit = 9, page = 0 } = {}) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    let query = supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image_url, category, tags, read_time_minutes, published_at, created_at', { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)

    if (category && category !== 'all') query = query.eq('category', category)
    if (search) query = query.ilike('title', `%${search}%`)

    query.then(({ data, error: err, count: total }) => {
      setPosts(data || [])
      setCount(total || 0)
      setError(err)
      setLoading(false)
    })
  }, [category, search, limit, page])

  return { posts, loading, error, count }
}

export function useBlogPost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error: err }) => {
        setPost(data)
        setError(err)
        setLoading(false)
      })
  }, [slug])

  return { post, loading, error }
}
