'use server'
import { cookies } from 'next/headers'

import { JOBS_API_URL } from '@/common/constants'
import { get, getHeaders, post } from '@/common/util/fetch'
import { getErrorMessage } from '@/common/util/errors'

export const getExploreVacancies = async () => {
  const headers = await getHeaders()
  console.log('FETCH REQUEST: ', `${JOBS_API_URL}/jobs/explore`)
  const res = await fetch(`${JOBS_API_URL}/jobs/explore`, {
    credentials: 'include',
    headers,
  })
  const parsedRes = res.json()

  if (!res.ok) {
    console.log('NOT OK: ', parsedRes)
    return { error: getErrorMessage(parsedRes) }
  }
  return parsedRes
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
