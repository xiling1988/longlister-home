import { JOBS_API_URL } from '@/common/constants'
import { Job } from '@/common/models'

export async function fetchPublicVacancyInfo(id: string): Promise<Job> {
  const res = await fetch(`${JOBS_API_URL}/jobs/public/${id}`)

  if (!res.ok) {
    throw new Error(`Failed to fetch vacancy. Status ${res.status}`)
  }

  const vacancyInfo: Job = await res.json()

  if (!vacancyInfo) {
    throw new Error('Vacancy not found')
  }

  return vacancyInfo
}
