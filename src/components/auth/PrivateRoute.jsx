import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import PageLoader from '@/components/utils/PageLoader'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <PageLoader />
  if (!user && location.pathname === '/admin/login') return children
  return user ? children : <Navigate to="/admin/login" replace />
}
