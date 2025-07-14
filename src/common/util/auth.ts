import { cookies } from 'next/headers'
import { AUTHENTICATION_COOKIE } from '../../context/auth/auth-cookie'
import getMe from '../../context/auth/get-me'
import { getHeaders } from './fetch'

export async function verifyAuth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTHENTICATION_COOKIE)?.value

    if (!token) {
      return null // No token, user is not authenticated
    }

    // Fetch user data using getMe
    const user = await getMe()

    // Check for unauthorized response
    if (user?.statusCode === 401 || user?.message === 'Unauthorized') {
      return null // Handle 401 Unauthorized response
    }

    // Validate user data (ensure it's not an error response)
    if (!user || user.error) {
      return null // Handle other error responses
    }

    return user // Return user data
  } catch (error) {
    console.error('Authentication verification failed:', error)
    return null // Return null on error to indicate unauthenticated
  }
}
