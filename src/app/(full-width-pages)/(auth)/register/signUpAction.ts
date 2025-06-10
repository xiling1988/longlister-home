'use server'

import { AUTH_API_URL } from '@/common/constants'
import { FormError } from '@/common/interfaces/form-error'
import { FormErrors } from '@/common/util/errors'
import { post } from '@/common/util/fetch'
import { signUpSchema } from '@/common/zod-schemas/auth/signUpSchema'
import { redirect } from 'next/navigation'
import { ca } from 'zod/v4/locales'

export default async function signUpAction(
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

  const validation = signUpSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  const formDataToSend = new FormData()
  for (const [key, value] of Object.entries(validation.data)) {
    formDataToSend.append(`${key}`, value)
  }

  try {
    const response = await post(AUTH_API_URL, 'users', formDataToSend)
    const { error } = response
    if (error) {
      console.log('❌ API Error:', error)
      return {
        errors: {
          api:
            error ||
            'An error occurred while processing your request - Please try again.',
        },
      }
    }
    return { success: true }
  } catch (error) {
    console.log('❌ Error during API call:', error)
    return {
      errors: {
        api: 'An error occurred while processing your request - Please try again.',
      },
    }
  }
}
