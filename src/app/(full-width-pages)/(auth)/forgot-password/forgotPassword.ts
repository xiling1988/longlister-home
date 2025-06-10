// Forgot password function for the forgot-password page FormActionState
'use server'

import { AUTH_API_URL } from '@/common/constants'
import { User } from '@/common/models'
import { FormErrors } from '@/common/util/errors'
import { post } from '@/common/util/fetch'
import { forgotPasswordSchema } from '@/common/zod-schemas/auth/signUpSchema'
import { redirect } from 'next/navigation'

export default async function forgotPassword(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  console.log(formData)
  const data = Object.fromEntries(formData.entries())
  const validation = forgotPasswordSchema.safeParse(data)

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
    const response = await post(
      AUTH_API_URL,
      'auth/forgot-password',
      formDataToSend,
    )
    return { success: true, errors: undefined }
  } catch (error) {
    console.log('❌ Error during API call:', error)
    return {
      errors: {
        api: 'An error occurred while processing your request - Please try again.',
      },
    }
  }
}
