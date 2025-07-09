'use server'
import { cookies } from 'next/headers'

import { JOBS_API_URL } from '@/common/constants'
import { get, getHeaders, post } from '@/common/util/fetch'

// export const getExploreVacancies = async () => {
//   console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/explore')
//   const data = await get(JOBS_API_URL, 'jobs/explore')
//   if (data.error) {
//     throw new Error(data.error.message)
//   }

//   return data
// }

export const getExploreVacancies = async () => {
  const headers = await getHeaders()

  console.log('FETCH REQUEST:', JOBS_API_URL, '/jobs/explore')

  const res = await fetch(`${JOBS_API_URL}/jobs/explore`, {
    headers,
    credentials: 'include',
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('Fetch failed:', res.status, errorText)
    throw new Error(`HTTP error! ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

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
