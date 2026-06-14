import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useVideos({ category, search, limit = 9, page = 0, enabled = true } = {}) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }
    setLoading(true)
    let query = supabase
      .from('videos')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1)

    if (category && category !== 'all') query = query.eq('category', category)
    if (search) query = query.ilike('title', `%${search}%`)

    query.then(({ data, error: err, count: total }) => {
      setVideos(data || [])
      setCount(total || 0)
      setError(err)
      setLoading(false)
    })
  }, [category, search, limit, page, enabled])

  return { videos, loading, error, count }
}

export function useVideo(slug) {
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    supabase
      .from('videos')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()
      .then(({ data, error: err }) => {
        setVideo(data)
        setError(err)
        setLoading(false)
        if (data?.id) {
          supabase.rpc('increment_view_count', { video_id: data.id }).catch(() => {})
        }
      })
  }, [slug])

  return { video, loading, error }
}
