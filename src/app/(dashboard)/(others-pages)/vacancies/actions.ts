'use server'

import { JOBS_API_URL } from '@/common/constants/index'
import { get, getHeaders, remove } from '@/common/util/fetch'

export const getMyVacanciesClient = async () => {
  console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/company/my-jobs')
  const data = await get(JOBS_API_URL, 'jobs/company/my-jobs')
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data
}

export const getMyVacanciesRecruiter = async () => {
  console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/recruiter/my-jobs')
  const data = await get(JOBS_API_URL, 'jobs/recruiter/my-jobs')
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data
}

export const removeVacancyFromWorkspace = async (id: string) => {
  const data = await remove(JOBS_API_URL, `jobs/remove-from-workspace/${id}`)
  if (data.error) {
    throw new Error(data.error.message)
  }
  return data
}

export const deleteVacancy = async (id: string) => {
  const headers = await getHeaders()
  const res = await fetch(`${JOBS_API_URL}/jobs/${id}`, {
    method: 'DELETE',
    headers,
  })

  // ✅ Ensure response is processed before returning
  if (!res.ok) {
    return { ok: false, status: res.status, statusText: res.statusText }
  }

  return { ok: true } // 🔥 Always return a plain object
}
