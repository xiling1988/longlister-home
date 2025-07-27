import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from './common/util/auth'

// Define protected and public routes using regex for App Router
const protectedRoutes = [
  '/', // Root route is the dashboard
  '/dashboard/.*',
  '/explore',
  '/profile',
  '/profile/.*',
  '/profile/complete-profile',
  '/vacancies',
  '/vacancies/.*',
  '/candidates',
]
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/legal/.*',
  '/public/vacancies/.*',
  '/home',
]
const homeRoute = '/' // Redirect authenticated users from auth routes to dashboard
const unauthenticatedHomeRoute = '/home' // Redirect unauthenticated users from root
const profileCompletionRoute = '/profile/complete-profile' // Redirect incomplete profiles here
const loginRoute = '/login' // Redirect unauthenticated users to login

// Middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log(`Middleware triggered for pathname: ${pathname}`)

  try {
    // Check if user is authenticated
    const user = await verifyAuth()
    console.log(
      `User authentication status: ${user ? 'Authenticated' : 'Unauthenticated'}`,
    )

    // Handle protected routes
    if (
      protectedRoutes.some((route) => {
        const regex = new RegExp(`^${route}$`)
        const matches = regex.test(pathname)
        console.log(`Checking protected route ${route}: ${matches}`)
        return matches
      })
    ) {
      if (!user) {
        console.log(`Unauthenticated user on protected route: ${pathname}`)
        // Redirect unauthenticated users to /home (for root) or /login (for other protected routes)
        const redirectUrl =
          pathname === '/'
            ? new URL(unauthenticatedHomeRoute, request.url)
            : new URL(loginRoute, request.url)
        if (pathname !== '/') {
          redirectUrl.searchParams.set('redirect', pathname)
        }
        console.log(`Redirecting to: ${redirectUrl}`)
        return NextResponse.redirect(redirectUrl)
      }

      // Check profile completion (except for / and /profile/complete-profile)
      if (
        !user.isProfileComplete &&
        pathname !== profileCompletionRoute &&
        pathname !== '/'
      ) {
        console.log(
          `Authenticated user with incomplete profile on ${pathname}, redirecting to ${profileCompletionRoute}`,
        )
        return NextResponse.redirect(
          new URL(profileCompletionRoute, request.url),
        )
      }

      // Role-based restrictions
      if (
        pathname.startsWith('/vacancies/create') &&
        user.userType !== 'client'
      ) {
        console.log(
          `Non-client user (${user.userType}) on /vacancies/create, redirecting to ${homeRoute}`,
        )
        return NextResponse.redirect(new URL(homeRoute, request.url))
      }
      if (pathname === '/explore' && user.userType !== 'recruiter') {
        console.log(
          `Non-recruiter user (${user.userType}) on /explore, redirecting to ${homeRoute}`,
        )
        return NextResponse.redirect(new URL(homeRoute, request.url))
      }

      console.log(`Allowing access to protected route: ${pathname}`)
      return NextResponse.next()
    }

    // Handle public routes (prevent authenticated users from accessing auth routes)
    if (
      publicRoutes.some((route) => {
        const regex = new RegExp(`^${route}$`)
        const matches = regex.test(pathname)
        console.log(`Checking public route ${route}: ${matches}`)
        return matches
      }) &&
      !pathname.startsWith('/legal') && // Allow legal pages for all
      !pathname.startsWith('/public/vacancies') && // Allow public vacancy pages
      pathname !== '/home' // Allow /home for all
    ) {
      if (user) {
        console.log(
          `Authenticated user on auth route ${pathname}, redirecting to ${homeRoute}`,
        )
        // Redirect authenticated users to dashboard (/)
        return NextResponse.redirect(new URL(homeRoute, request.url))
      }
      console.log(`Allowing access to public auth route: ${pathname}`)
      return NextResponse.next()
    }

    // Allow all other routes (e.g., /home, /legal/*, /public/vacancies/*)
    console.log(`Allowing access to public route: ${pathname}`)
    return NextResponse.next()
  } catch (error) {
    console.error(`Middleware error for ${pathname}:`, error)
    // On error, redirect to /home (for root) or /login (for other routes)
    const redirectUrl =
      pathname === '/'
        ? new URL(unauthenticatedHomeRoute, request.url)
        : new URL(loginRoute, request.url)
    console.log(`Error redirecting to: ${redirectUrl}`)
    return NextResponse.redirect(redirectUrl)
  }
}

// Configure matcher to apply middleware to specific routes
export const config = {
  matcher: [
    '/', // Root route
    '/dashboard/:path*',
    '/explore',
    '/profile/:path*',
    // '/profile/complete-profile',
    '/vacancies/:path*',
    '/candidates',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/legal/:path*',
    '/public/vacancies/:path*',
    '/home',
  ],
}
