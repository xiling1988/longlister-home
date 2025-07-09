'use server'

import { JOBS_API_URL } from '@/common/constants'
import { get, post } from '@/common/util/fetch'

export const getExploreVacancies = async () => {
  console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/explore')
  const data = await get(JOBS_API_URL, 'jobs/explore')
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data
}

export const addVacancyToWorkspace = async (jobId: string) => {
  console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/add-to-workspace')
  const emptyFormData = new FormData()
  const data = await post(
    JOBS_API_URL,
    `jobs/add-to-workspace/${jobId}`,
    emptyFormData,
  )
  if (data.error) {
    console.log('DATA ERROR', data.error)
    return new Error(
      typeof data.error === 'string'
        ? data.error
        : data.error?.message || String(data.error),
    )
  }

  return data
}
