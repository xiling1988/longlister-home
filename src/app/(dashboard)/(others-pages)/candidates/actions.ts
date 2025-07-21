'use server'

import { JOBS_API_URL } from '@/common/constants'
import { get, remove } from '@/common/util/fetch'

export async function getMyCandidates() {
  const data = await get(JOBS_API_URL, 'candidates/my-candidates')
  if (data.error) {
    throw new Error(data.error.message)
  }
  return data
}

export async function deleteCandidateProfileVersion(
  candidateId: string,
  profileVersionId: string,
) {
  const data = await remove(
    JOBS_API_URL,
    `candidates/${candidateId}/delete-version/${profileVersionId}`,
  )
  if (data.error) {
    throw new Error(data.error.message)
  }

  return data
}
