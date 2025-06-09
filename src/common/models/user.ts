import { Job } from '@/app/common/models'
import { ClientProfile } from './client-profile'
import { RecruiterProfile } from './recruiter-profile'

export enum UserType {
  recruiter = 'recruiter',
  client = 'client',
}

export enum CompanyType {
  company = 'company',
  agency = 'agency',
}

export interface User {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
  userType: UserType
  isProfileComplete: boolean
  recruiterProfile?: RecruiterProfile // Optional, based on userType
  clientProfile?: ClientProfile // Optional, based on userType
  jobs: Job[]
}
