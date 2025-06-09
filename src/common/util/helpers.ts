import { API_URL } from '../constants'

export function getCompanyLogo(id: string) {
  return `${API_URL}/company-logos/${id}.jpg`
}

export function getRecruiterAvatar(avatar: string) {
  return `${API_URL}/recruiter-avatars/${avatar}.png`
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
