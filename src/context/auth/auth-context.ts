import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { User } from '../common/models'

// Create a hook for consuming the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Define an interface for the context type
interface AuthContextType {
  isAuthenticated: boolean // Indicates if the user is authenticated
  setIsAuthenticated: Dispatch<SetStateAction<boolean>> // Function to update the authentication state
  user: User | null // The user object
  setUser: Dispatch<SetStateAction<User | null>> // Function to update the user object
  contextLogin: (user: User) => void // Function to log in a user
  contextLogout: () => void // Function to log out a user
}
// The Dispatch type is a react type that represents a function that can be used to update a state value
// The SetStateAction type is a react type that represents the type of the state value that the function can update

// Create the context with the defined type, initialized to null
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false, // Default to unauthenticated
  setIsAuthenticated: () => {}, // No-op function for default
  user: null, // Default to no user
  setUser: () => {}, // No-op function for default
  contextLogin: () => {}, // No-op function for default
  contextLogout: () => {}, // No-op function for default
})
