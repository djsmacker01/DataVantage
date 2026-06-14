import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import PrivateRoute from '@/components/auth/PrivateRoute'
import ScrollToTop from '@/components/utils/ScrollToTop'
import PageLoader from '@/components/utils/PageLoader'
import Layout from '@/components/layout/Layout'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const BookConsultation = lazy(() => import('@/pages/BookConsultation'))
const BookTraining = lazy(() => import('@/pages/BookTraining'))
const Videos = lazy(() => import('@/pages/Videos'))
const VideoSingle = lazy(() => import('@/pages/VideoSingle'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogSingle = lazy(() => import('@/pages/BlogSingle'))
const Contact = lazy(() => import('@/pages/Contact'))
const Admin = lazy(() => import('@/pages/admin/Admin'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
          <Route path="about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<PageLoader />}><Services /></Suspense>} />
          <Route path="book/consultation" element={<Suspense fallback={<PageLoader />}><BookConsultation /></Suspense>} />
          <Route path="book/training" element={<Suspense fallback={<PageLoader />}><BookTraining /></Suspense>} />
          <Route path="videos" element={<Suspense fallback={<PageLoader />}><Videos /></Suspense>} />
          <Route path="videos/:slug" element={<Suspense fallback={<PageLoader />}><VideoSingle /></Suspense>} />
          <Route path="blog" element={<Suspense fallback={<PageLoader />}><Blog /></Suspense>} />
          <Route path="blog/:slug" element={<Suspense fallback={<PageLoader />}><BlogSingle /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
          <Route path="privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
          <Route path="terms" element={<Suspense fallback={<PageLoader />}><Terms /></Suspense>} />
          <Route
            path="admin/*"
            element={
              <PrivateRoute>
                <Suspense fallback={<PageLoader />}><Admin /></Suspense>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnimatedRoutes />
            <Toaster position="bottom-right" richColors closeButton />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
