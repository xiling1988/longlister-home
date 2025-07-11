'use server'

import { AUTH_API_URL, PAYMENTS_API_URL } from '@/common/constants'
import { FormErrors, getErrorMessage } from '@/common/util/errors'
import { getHeaders, patch } from '@/common/util/fetch'
import {
  cardHolderNameSchema,
  companyDetailsSchema,
  companyPaymentMethodSchema,
  CompanyProfileInitialValuesType,
  companyProfileSchema,
  completeAgencyProfileSchema,
  completeCompanyProfileSchema,
  recruiterCompleteProfileSchema,
  recruiterPersonalDetailsSchema,
  RecruiterProfileInitialValuesType,
  recruiterProfileSchema,
} from '@/common/zod-schemas/profiles/schemas'
import { ca } from 'zod/v4/locales'

////////////////////////// Recruiter Profile Actions /////////////////////////

export async function recruiterPersonalDetailsAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = recruiterPersonalDetailsSchema.safeParse(data)

  console.log('VALIDATION OBJECT:', validation)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }
  // 🛠️ Process submission (e.g., save to DB)
  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}

export async function recruiterProfileAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = recruiterProfileSchema.safeParse(data)

  console.log('HELLO FROM THE SERVER')

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  // 🛠️ Process submission (e.g., save to DB)
  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}

export async function recruiterCompleteProfileAction(
  recruiterProfileData: RecruiterProfileInitialValuesType, // ✅ Pass this from the component
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log('🚀 Received Profile Data:', recruiterProfileData)

  // ✅ Validate with Zod
  const validation =
    recruiterCompleteProfileSchema.safeParse(recruiterProfileData)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Profile validation failed:', errors)
    return { errors }
  }

  const profileData = validation.data

  const requestData = new FormData()
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`recruiterProfile.${key}`, value)
    }
  })
  requestData.append('isProfileComplete', 'true')

  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }

  console.log('ABOUT TO RETURN SUCCESS TRUE!')
  // redirect('/dashboard')
  return { success: true }
}

////////////////////////// Client Profile Actions /////////////////////////

async function uploadClientLogo(file: File) {
  const formData = new FormData()
  formData.append('image', file)

  const headers = await getHeaders()
  await fetch(`${AUTH_API_URL}/users/me-client-logo`, {
    body: formData,
    method: 'POST',
    headers: headers,
  })
}

export async function companyDetailsAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log('FORMDATA FROM ACTION', formData)
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())
  // console.log('FORM DATA REFRESH:', data)
  // Validate using Zod
  const validation = companyDetailsSchema.safeParse(data)

  console.log('HELLO FROM THE SERVER')

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  console.log('✅ Valid form submission:', validation.data)

  // ✅ Extract logo from validated data
  const { logo } = data

  // 🛠️ Prepare FormData for the PATCH request
  // const formDataToSend = new FormData()

  // for (const [key, value] of Object.entries(profileData)) {
  //   formDataToSend.append(`clientProfile.${key}`, value)
  // }

  // console.log('✅ Sending FormData:', Array.from(formDataToSend.entries()))

  // const response = await patch('users/me', formDataToSend) // 🔥 Calls your backend!

  // if (response.error) {
  //   console.log('❌ API Error:', response.error)
  //   return { errors: { api: response.error } }
  // }

  // ✅ If there's a logo file, send it separately
  if (logo instanceof File) {
    const logoFormData = new FormData()
    logoFormData.append('image', logo)

    uploadClientLogo(logo)
  }

  // 🛠️ Process submission (e.g., save to DB)

  return { success: true }
}

export async function companyProfileAndCultureAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = companyProfileSchema.safeParse(data)

  console.log('HELLO FROM THE SERVER')

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  // 🛠️ Process submission (e.g., save to DB)
  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}

export async function companyPaymentDetailsAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())
  console.log('FORMDATA FROM companyPaymentDetailsAction: ', data)
  // Validate using Zod
  const validation = companyPaymentMethodSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  // 🛠️ Process submission (e.g., save to DB)
  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}

export async function getStripeDataAction(formData: FormData): Promise<
  | { errors: FormErrors; success?: undefined }
  | {
      success: boolean
      errors?: undefined
      stripeData?: { clientSecret: string; stripeCustomerId: string }
    }
> {
  // Convert FormData to an object
  const data = Object.fromEntries(formData.entries())
  console.log('FORMDATA FROM companyPaymentDetailsAction: ', data)
  // Validate using Zod
  const validation = cardHolderNameSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission 1:', errors)
    return { errors }
  }

  console.log('✅ Valid form submission:', validation.data)
  console.log('ON TO THE NEXT STEP: CREATE STRIPE CUSTOMER')

  const { error, stripeCustomerId } = await createStripeCustomerAction()
  if (error || !stripeCustomerId) {
    console.log('❌ Error creating Stripe customer:', error)
    console.log({ errors: { api: getErrorMessage(error) } })
    return { errors: { api: String(getErrorMessage(error)) } }
  }

  console.log('Stripe Customer ID:', stripeCustomerId)

  console.log('ON TO THE NEXT STEP: CREATE SETUP INTENT')

  let clientSecret
  try {
    clientSecret = await createSetupIntentAction(stripeCustomerId)
    clientSecret = clientSecret.clientSecret

    return { success: true, stripeData: { clientSecret, stripeCustomerId } }
  } catch (error) {
    console.log('ERROR CREATING SETUP INTENT:', error)
    return { errors: { api: String(error) } }
  }
}

export async function createStripeCustomerAction() {
  const headers = await getHeaders()
  const res = await fetch(
    `${PAYMENTS_API_URL}/payments-clients/create-customer`,
    {
      method: 'POST',
      headers,
      credentials: 'include',
    },
  )

  let stripeCustomerId: string | undefined = undefined

  try {
    const data = await res.json()
    stripeCustomerId = data?.stripeCustomerId
  } catch (err) {
    console.error('Invalid JSON in response', err)
    return { error: 'Invalid JSON in response' }
  }
  if (!res.ok || !stripeCustomerId) {
    console.log('NOT OK: ', stripeCustomerId)
    return { error: getErrorMessage(stripeCustomerId) }
  }
  console.log('Stripe Customer ID:', stripeCustomerId)

  return { stripeCustomerId }
}

export async function createSetupIntentAction(stripeCustomerId: string) {
  const headers = await getHeaders()
  const res = await fetch(
    `${PAYMENTS_API_URL}/payments-clients/create-setup-intent/${stripeCustomerId}`,
    {
      method: 'POST',
      credentials: 'include',
      headers,
    },
  )

  if (!res.ok) {
    throw new Error('Failed to create SetupIntent')
  }

  const data = await res.json() // ✅ Read once
  console.log('JSON RESPONSE:', data)

  const { clientSecret } = data
  return { clientSecret }
}

export async function companyCompleteProfileAction(
  companyProfileData: CompanyProfileInitialValuesType, // ✅ Pass this from the component
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log('🚀 Received Profile Data:', companyProfileData)

  // ✅ Validate with Zod
  const validation = completeCompanyProfileSchema.safeParse(companyProfileData)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Profile validation failed:', errors)
    return { errors }
  }

  const profileData = validation.data

  const requestData = new FormData()
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`clientProfile.${key}`, value)
    }
  })
  requestData.append('isProfileComplete', 'true')

  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }

  console.log('ABOUT TO RETURN SUCCESS TRUE!')
  // redirect('/dashboard')
  return { success: true }
}
