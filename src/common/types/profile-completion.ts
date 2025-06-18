import {
  CompanyProfileData,
  CompanyProfileInitialValuesType,
  RecruiterProfileData,
  RecruiterProfileInitialValuesType,
} from '../zod-schemas/profiles/schemas'

export type UserType = 'client' | 'recruiter'

export type ProfileFormData =
  | RecruiterProfileInitialValuesType
  | CompanyProfileInitialValuesType

export type ProfileUpdateFunction =
  | ((data: Partial<RecruiterProfileData>) => void)
  | ((data: Partial<CompanyProfileData>) => void)

export type UnifiedProfileContextType = {
  userType: UserType
  profileData: ProfileFormData
  updateProfileData: ProfileUpdateFunction
  resetData: () => void
  dataLoaded: boolean
}


