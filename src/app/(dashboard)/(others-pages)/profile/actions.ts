'use server'

import { FormErrors } from '@/common/util/errors'
import { patch } from '@/common/util/fetch'
import {
  changeEmailSchema,
  changePasswordSchema,
} from '@/common/zod-schemas/auth/signUpSchema'
import {
  companyDetailsSchema,
  companyPaymentMethodSchema,
  companyProfileSchema,
  recruiterPersonalDetailsSchema,
  recruiterProfileSchema,
} from '@/common/zod-schemas/profiles/schemas'
import { revalidateTag } from 'next/cache'
import { uploadClientLogo } from './complete-profile/actions'
import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '@/common/constants'

export async function editRecruiterPersonalInfoAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
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
  const recruiterData = validation.data

  const requestData = new FormData()
  Object.entries(recruiterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`recruiterProfile.${key}`, value)
    }
  })
  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }
  revalidateTag('user-profile')
  //   revalidatePath('/profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')
  // redirect('/dashboard')
  return { success: true }
}

export async function editRecruiterProfileAction(
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
  const recruiterData = validation.data

  const requestData = new FormData()
  Object.entries(recruiterData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`recruiterProfile.${key}`, value)
    }
  })
  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }
  revalidateTag('user-profile')
  //   revalidatePath('/profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')
  // redirect('/dashboard')
  return { success: true }
}

export async function editUserEmailAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = changeEmailSchema.safeParse(data)

  console.log('VALIDATION OBJECT:', validation.data)

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
  const emailData = validation.data

  const requestData = new FormData()
  requestData.append('email', emailData.email)

  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me/email', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }

  revalidateTag('user-profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')

  return { success: true }
}

export async function editUserPasswordAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = changePasswordSchema.safeParse(data)

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
  const passwordData = validation.data

  const requestData = new FormData()
  Object.entries(passwordData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(key, value)
    }
  })
  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me/password', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }

  revalidateTag('user-profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')

  return { success: true }
}

export async function editCompanyInfoAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())

  // Validate using Zod
  const validation = companyDetailsSchema.safeParse(data)

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

  // UPLOADING LOGO EDIT
  const { logo } = data

  if (logo instanceof File) {
    const logoFormData = new FormData()
    logoFormData.append('image', logo)

    uploadClientLogo(logo)
  }

  // SENDING FORM FIELDS PATCH REQUEST

  const companyData = validation.data

  const requestData = new FormData()
  Object.entries(companyData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`clientProfile.${key}`, value)
    }
  })

  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }

  revalidateTag('user-profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')

  return { success: true }
}

export async function editCompanyProfileAction(
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
  const companyData = validation.data

  const requestData = new FormData()
  Object.entries(companyData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`clientProfile.${key}`, value)
    }
  })
  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me', requestData)

  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }
  revalidateTag('user-profile')
  //   revalidatePath('/profile')

  console.log('ABOUT TO RETURN SUCCESS TRUE!')
  // redirect('/dashboard')
  return { success: true }
}

export async function getPaymentMethodAction(
  stripePaymentMethodId: string | null,
): Promise<any> {
  if (!stripePaymentMethodId) {
    return null
  }
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  })

  try {
    const pm = await stripe.paymentMethods.retrieve(stripePaymentMethodId)

    if (pm.type !== 'card' || !pm.card) return null
    return {
      brand: pm.card.brand,
      last4: pm.card.last4,
      expMonth: pm.card.exp_month,
      expYear: pm.card.exp_year,
    }
  } catch (err) {
    console.error('Error fetching payment method:', err)
    return null
  }
}

export async function editPaymentDetailsAction(
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
  const paymentMethodData = validation.data

  const requestData = new FormData()
  Object.entries(paymentMethodData).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      requestData.append(`clientProfile.${key}`, value)
    }
  })
  console.log('✅ Sending PATCH request with FormData:', requestData)

  // ✅ Send FormData instead of JSON
  const response = await patch('users/me/payment-method', requestData)
  if (response.error) {
    console.log('❌ API Error:', response.error)
    return { errors: { api: response.error } }
  }
  revalidateTag('user-profile')

  if (paymentMethodData.stripeCustomerId) {
    try {
      await removeAllOtherPaymentMethods(
        paymentMethodData.stripeCustomerId,
        paymentMethodData.stripePaymentMethodId,
      )
    } catch (error) {
      console.error('Error uploading payment method:', error)
    }
  }

  console.log('ABOUT TO RETURN SUCCESS TRUE!')

  return { success: true }
}

async function removeAllOtherPaymentMethods(
  customerId: string,
  keepPaymentMethodId: string,
) {
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  })
  const allPaymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card',
  })

  for (const pm of allPaymentMethods.data) {
    if (pm.id !== keepPaymentMethodId) {
      try {
        await stripe.paymentMethods.detach(pm.id)
        console.log(`Detached old payment method: ${pm.id}`)
      } catch (err) {
        console.warn(`Failed to detach payment method ${pm.id}:`, err)
      }
    }
  }
}


