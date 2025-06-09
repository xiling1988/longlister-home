import { Candidate } from './candidate'

export interface RecruiterProfile {
  id: string
  userId: string
  firstName?: string
  lastName?: string
  avatar?: string
  phoneNumber?: string
  company?: string

  industry?: string
  recruitingExperience?: string
  linkedIn?: string
  bio?: string
  city?: string
  country?: string
  website?: string

  // ✅ Stripe fields
  isStripeVerified: boolean
  stripeAccountId?: string
  stripeRequirementsDue?: string[]

  // Associations
  recruiterApplications?: RecruiterApplication[]
  hiredRecruiters?: HiredRecruiter[]
  candidates?: Candidate[]
}

export interface RecruiterApplication {
  id: string
  recruiterProfileId: string
  // Add additional fields as necessary
}

export interface HiredRecruiter {
  id: string
  recruiterProfileId: string
  // Add additional fields as necessary
}
