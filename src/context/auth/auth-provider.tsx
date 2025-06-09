'use client'
import { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'
import authenticated from './authenticated'
import { User } from '../common/models'
import getMe from '../get-me'

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Define the login function
  const contextLogin = (user: User) => {
    setIsAuthenticated(true)
    setUser(user)
  }

  // Define the logout function
  const contextLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    // Clear tokens/cookies here if needed
  }

  // Fetch user info on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const isAuth = await authenticated()
        setIsAuthenticated(isAuth) // Check if user is authenticated

        if (isAuth) {
          // If authenticated, fetch user details
          const me = await getMe()
          setUser(me)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setIsAuthenticated(false)
        setUser(null)
      }
    }

    initializeAuth()
  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        contextLogin,
        contextLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
