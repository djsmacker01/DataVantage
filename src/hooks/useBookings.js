import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useCreateBooking() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const createBooking = async (data) => {
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.from('bookings').insert([data])
    if (err) {
      setError(err.message)
    } else {
      setSuccess(true)
    }
    setLoading(false)
    return !err
  }

  return { createBooking, loading, error, success, reset: () => setSuccess(false) }
}
