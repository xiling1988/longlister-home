'use server'

import { JOBS_API_URL } from '@/common/constants'
import { get } from '@/common/util/fetch'

export const getExploreVacancies = async () => {
  console.log('FETCH REQUEST: ', JOBS_API_URL, '/jobs/explore')
  const data = await get(JOBS_API_URL, 'jobs')
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data
}
