'use server'

import { API_URL } from '@/common/constants'
import { FormErrors } from '@/common/util/errors'
import { getHeaders } from '@/common/util/fetch'
import {
  NewVacancyInitialValuesType,
  VacancyAgencyData,
  vacancyAgencySchema,
  vacancyRecruitmentProcessSchema,
  vacancyRemunerationSchema,
  vacancyRoleResponsibilitiesSchema,
} from '@/common/zod-schemas/jobs/schemas'
import { SafeParseReturnType } from 'zod'

export async function newVacancyRoleResponsibilitiesAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log('RECEIVED FORM DATA:', formData)
  const data = Object.fromEntries(formData.entries())
  const validation = vacancyRoleResponsibilitiesSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }
  console.log('✅ Valid form submission:', validation.data)
  return { success: true }
}

export async function newVacancyRemunerationAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())
  const validation = vacancyRemunerationSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}

export async function newVacancyRecruitmentProcessAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log(
    'Logging form data in newVacancyRecruitmentProcessAction',
    formData,
  )
  const data = Object.fromEntries(formData.entries())

  // 🛠 Convert stringified JSON fields
  if (typeof data.notifyParties === 'string') {
    try {
      data.notifyParties = JSON.parse(data.notifyParties)
    } catch (error) {
      return {
        errors: { notifyParties: 'Invalid format for notifyParties' },
      }
    }
  }

  const validation = vacancyRecruitmentProcessSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  console.log('✅ Valid form submission:', validation.data)
  return { success: true }
}

export async function newVacancySubmitAction(
  newVacancyData: NewVacancyInitialValuesType,
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log('🚀 Received Vacancy Details from UI:', newVacancyData)

  let validation: SafeParseReturnType<VacancyAgencyData, any>

  // ✅ Validate with Zod
  validation = vacancyAgencySchema.safeParse(newVacancyData)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Vacancy validation failed:', errors)
    return { errors }
  }

  console.log('LOG AFTER VALIDATION: ', validation.data)

  const deadlineDate = new Date()
  // set deadlineDate to validation.data.deadline days from now:_prevState
  deadlineDate.setDate(
    deadlineDate.getDate() + Number(validation.data.deadline),
  )
  // convert deadlineDate to ISO string:
  validation.data.deadline = deadlineDate.toISOString()
  console.log(validation.data.deadline)

  // Add additionalData object to validation.data
  // validation.data = { ...validation.data }

  // ✅ Extract logo from validated data

  const vacancyData = validation.data

  // ✅ Send to API
  // ✅ Convert `newVacancyData` into `FormData`
  const requestData = new FormData()
  Object.entries(vacancyData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(key, String(value))
    }
  })

  console.log('✅ Sending POST request with FormData:', vacancyData)

  const headers = {
    'Content-Type': 'application/json',
    ...(await getHeaders()),
  }
  // const response = await post(JOBS_API_URL, 'jobs', requestData)
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers,
    body: JSON.stringify(vacancyData),
  })
  console.log('GENERAL RESPONSE, CHECKING FOR JOB OBJECT!', response)

  if (!response.ok) {
    console.log('❌ API Error:', response)
    return { errors: { api: response.statusText } }
  }
  const data = await response.json()

  console.log('LOGGING RESPONSE FROM API: ', data)

  console.log('✅ Valid form submission:', validation.data)
  return { success: true }
}
