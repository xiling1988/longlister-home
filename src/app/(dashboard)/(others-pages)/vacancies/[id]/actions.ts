'use server'

import { JOBS_API_URL } from '@/common/constants'
import {
  ApproveCandidateState,
  FormErrors,
  RejectCandidateState,
  UploadFormState,
} from '@/common/util/errors'
import { get, getHeaders, remove } from '@/common/util/fetch'
import { candidateSchema } from '@/common/zod-schemas/candidates/schemas'

export async function getManageVacancyInfo(id: string) {
  console.log('LOGGING FROM THE SERVER SIDE', id)
  const vacancyInfo = await get(JOBS_API_URL, `jobs/manageVacancy/${id}`)
  return vacancyInfo
}

export async function uploadCandidateSubmission(
  _prevState: UploadFormState,
  formData: FormData,
): Promise<UploadFormState> {
  console.log('testing from the server side.')
  console.log(formData)

  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())
  console.log('DATA: ', data)
  const validation = candidateSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.error('Validation errors:', errors)
    return { errors }
  }

  console.log('Validation successful, validattion DATA:', validation.data)

  try {
    const headers = await getHeaders()

    // If the validation is successful, send the original FormData to the server via our custom post function (which takes in a formData Object for the body of the request)
    console.log('📤 Submitting to:', `${JOBS_API_URL}/candidates`)
    const response = await fetch(`${JOBS_API_URL}/candidates`, {
      method: 'POST',
      headers,
      body: formData,
    })

    let parsedRes
    try {
      const contentType = response.headers.get('content-type') || ''
      const isJson = contentType.includes('application/json')
      const text = await response.text()

      if (!text) {
        // Body is empty
        throw new Error('Empty response body')
      }

      parsedRes = isJson ? JSON.parse(text) : { message: text }

      // parsedRes = await response.json()

      if (!response.ok) {
        return {
          errors: { api: parsedRes }, // 🟢 Returns the exact error your backend sent
        }
      }
      console.log('SUCCESS FROM THE SERVER!: ', parsedRes)
      return {
        success: {
          success: true,
          candidate: parsedRes.profileVersion,
        },
      }
    } catch (error) {
      console.error('⚠️ Failed to parse backend response:', error)
      return {
        errors: {
          message: 'Server returned an invalid response',
          code: 'UNKNOWN_ERROR',
        },
      }
    }
  } catch (error) {
    console.error('⚠️ Network or Server Error:', error)
    return {
      errors: {
        message: 'Network error. Please try again.',
        code: 'UNKNOWN_ERROR',
      },
    }
  }
}

export async function rejectCandidate(
  _prevState: RejectCandidateState,
  formData: FormData,
): Promise<RejectCandidateState> {
  console.log(formData)
  const { candidateOnJobId } = Object.fromEntries(formData.entries())
  console.log('Candidate On Job:', candidateOnJobId)

  try {
    await remove(JOBS_API_URL, `candidateOnJob/${candidateOnJobId}`)
    return {
      success: {
        success: true,
      },
    }
  } catch (error) {
    return {
      errors: {
        message: 'Network error. Please try again.',
        code: 'UNKNOWN_ERROR',
      },
    }
  }
}

export async function approveCandidate(
  _prevState: UploadFormState,
  candidateOnJobId: string,
): Promise<ApproveCandidateState> {
  console.log('hello from approveCandidate')
  console.log('logging formData', candidateOnJobId)
  // const { candidateOnJobId } = Object.fromEntries(formData.entries())
  console.log('Candidate On Job:', candidateOnJobId)

  const headers = await getHeaders()
  try {
    const response = await fetch(
      `${JOBS_API_URL}/candidateOnJob/approveCandidate/${candidateOnJobId}`,
      {
        method: 'PATCH',
        headers,
      },
    )
    const approval = await response.json()

    return {
      success: {
        success: true,
        candidateOnJob: approval,
      },
    }
  } catch (error) {
    return {
      errors: {
        message: `All good in the Hood. ${candidateOnJobId}`,
        code: 'UNKNOWN_ERROR',
      },
    }
  }
}
