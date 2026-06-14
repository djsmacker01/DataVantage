import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'
import PageLoader from '@/components/utils/PageLoader'

const AdminOverview = lazy(() => import('./AdminOverview'))
const AdminVideos = lazy(() => import('./AdminVideos'))
const AdminVideoEditor = lazy(() => import('./AdminVideoEditor'))
const AdminBlog = lazy(() => import('./AdminBlog'))
const AdminBlogEditor = lazy(() => import('./AdminBlogEditor'))
const AdminBookings = lazy(() => import('./AdminBookings'))
const AdminComments = lazy(() => import('./AdminComments'))
const AdminSubscribers = lazy(() => import('./AdminSubscribers'))

export default function Admin() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Suspense fallback={<PageLoader />}><AdminOverview /></Suspense>} />
        <Route path="videos" element={<Suspense fallback={<PageLoader />}><AdminVideos /></Suspense>} />
        <Route path="videos/new" element={<Suspense fallback={<PageLoader />}><AdminVideoEditor /></Suspense>} />
        <Route path="videos/:id/edit" element={<Suspense fallback={<PageLoader />}><AdminVideoEditor /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<PageLoader />}><AdminBlog /></Suspense>} />
        <Route path="blog/new" element={<Suspense fallback={<PageLoader />}><AdminBlogEditor /></Suspense>} />
        <Route path="blog/:id/edit" element={<Suspense fallback={<PageLoader />}><AdminBlogEditor /></Suspense>} />
        <Route path="bookings" element={<Suspense fallback={<PageLoader />}><AdminBookings /></Suspense>} />
        <Route path="comments" element={<Suspense fallback={<PageLoader />}><AdminComments /></Suspense>} />
        <Route path="subscribers" element={<Suspense fallback={<PageLoader />}><AdminSubscribers /></Suspense>} />
      </Route>
    </Routes>
  )
}
