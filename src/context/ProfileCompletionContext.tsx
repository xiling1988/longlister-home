'use client'

import { UserType } from '@/common/models'
import {
  ProfileFormData,
  UnifiedProfileContextType,
} from '@/common/types/profile-completion'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { useAuth } from './auth/auth-context'
import { getDefaultsByType, getSchemaByType } from '@/common/util/helpers'

const ProfileCompletionContext =
  createContext<UnifiedProfileContextType | null>(null)

export function ProfileCompletionProvider({
  children,
}: {
  children: ReactNode
}) {
  const { user } = useAuth()
  const userType = user?.userType as UserType

  const [profileData, setProfileData] = useState<ProfileFormData>(
    getDefaultsByType(userType),
  )
  const [dataLoaded, setDataLoaded] = useState(false)
  const [suppressWrite, setSuppressWrite] = useState(false)

  const LOCAL_STORAGE_KEY = 'completeProfileData'
  const schema = getSchemaByType(userType)
  const defaults = getDefaultsByType(userType)

  const readFromLocalStorage = useCallback(() => {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!raw) {
      setProfileData(defaults)
      return
    }

    try {
      const parsed = JSON.parse(raw)

      if (parsed.userType !== userType) {
        setProfileData(defaults)
        return
      }

      const validated = schema.safeParse(parsed.profileData)

      if (validated.success) {
        setProfileData(validated.data)
      } else {
        setProfileData(defaults)
      }
    } catch (err) {
      console.warn('Failed to parse profile data from storage', err)
      setProfileData(defaults)
    }
  }, [defaults, schema, userType])

  useEffect(() => {
    readFromLocalStorage()
    setDataLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const writeToLocalStorage = useCallback(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({
        userType,
        profileData,
      }),
    )
  }, [profileData, userType])

  useEffect(() => {
    if (dataLoaded && !suppressWrite) {
      writeToLocalStorage()
    }
  }, [profileData, dataLoaded, writeToLocalStorage, suppressWrite])

  const updateProfileData = (data: any) => {
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  const resetData = () => {
    setSuppressWrite(true)
    setProfileData(defaults)
    localStorage.removeItem(LOCAL_STORAGE_KEY)

    // reset suppressWrite after a short delay (to allow profileData update to finish)
    setTimeout(() => setSuppressWrite(false), 0)
  }

  return (
    <ProfileCompletionContext.Provider
      value={{
        userType,
        profileData,
        updateProfileData,
        resetData,
        dataLoaded,
      }}
    >
      {children}
    </ProfileCompletionContext.Provider>
  )
}

export function useProfileCompletionContext() {
  const context = useContext(ProfileCompletionContext)
  if (!context) {
    throw new Error(
      'useProfileCompletionContext must be used within a ProfileCompletionProvider',
    )
  }
  return context
}
