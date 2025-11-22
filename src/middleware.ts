import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
])

// Define admin routes that require admin role
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

// Define API routes that need authentication but should handle it gracefully
const isProtectedApiRoute = createRouteMatcher([
  '/api/enrollments(.*)',
  '/api/payments(.*)',
  '/api/user-progress(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // For API routes, we'll let them handle authentication internally
  // This prevents middleware from redirecting API calls to sign-in pages
  if (isProtectedApiRoute(req)) {
    // Don't protect here - let the API route handle auth internally
    return
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    await auth.protect((has) => {
      return has({ role: 'admin' })
    })
  }

  // Protect other authenticated routes
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
