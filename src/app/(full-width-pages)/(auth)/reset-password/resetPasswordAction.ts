'use server'

import { AUTH_API_URL } from '@/common/constants'
import { FormErrors } from '@/common/util/errors'
import { post } from '@/common/util/fetch'
import { resetPasswordSchema } from '@/common/zod-schemas/auth/signUpSchema'
import { tr } from 'zod/v4/locales'

// Password reset function for the reset-password page FormActionState

export default async function resetPasswordAction(
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

  const validation = resetPasswordSchema.safeParse(data)
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
  formDataToSend.append('token', data.token)

  try {
    const response = await post(
      AUTH_API_URL,
      'auth/reset-password',
      formDataToSend,
    )

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
