import {
  API_URL,
  defaultCompanyProfileData,
  defaultRecruiterProfileData,
  RECRUITER_AVATARS_BASE_URL,
} from '../constants'
import {
  CLIENT_PROFILE_STEPS,
  RECRUITER_PROFILE_STEPS,
} from '../constants/profiles/steps'
import { UserType } from '../types/profile-completion'
import {
  CompanyProfileInitialValuesSchema,
  recruiterProfileInitialValuesSchema,
} from '../zod-schemas/profiles/schemas'

export function getCompanyLogo(id: string) {
  return `${API_URL}/company-logos/${id}.jpg`
}

export function getRecruiterAvatar(avatar: string) {
  return `${RECRUITER_AVATARS_BASE_URL}/${avatar}.png`
}

export function getVacancyImage(id: string) {
  if (!id) {
    return `${API_URL}/vacancy-logos/default.jpg`
  }
  return `${API_URL}/vacancy-logos/${id}.jpg`
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function getDeadlineLabel(deadline: Date): {
  label: string
  className: string
} {
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: 'Past deadline', className: 'text-xs text-gray-400' }
  }

  if (diffDays <= 3) {
    return {
      label: `${diffDays} day${diffDays !== 1 ? 's' : ''} left`,
      className: 'text-xs text-brand-red',
    }
  }

  return {
    label: `${diffDays} day${diffDays !== 1 ? 's' : ''} left`,
    className: 'text-xs text-gray-400',
  }
}

export function formatDate(
  date: Date | string,
  locale: string = 'en-US',
  options?: Intl.DateTimeFormatOptions,
): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date

  if (isNaN(parsedDate.getTime())) return 'Invalid Date'

  return parsedDate.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  })
}

export function daysLeft(dateString: string) {
  const now = new Date()
  const deadline = new Date(dateString)
  const diff = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  )
  return diff >= 0 ? diff : 0
}

export const getDefaultsByType = (type: UserType) =>
  type === 'client' ? defaultCompanyProfileData : defaultRecruiterProfileData

export const getSchemaByType = (type: UserType) =>
  type === 'client'
    ? CompanyProfileInitialValuesSchema
    : recruiterProfileInitialValuesSchema

export const getSteps = (type: UserType) => {
  return type === 'client' ? CLIENT_PROFILE_STEPS : RECRUITER_PROFILE_STEPS
}
