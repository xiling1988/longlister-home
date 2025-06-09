'use server'

import { AUTH_API_URL } from '@/common/constants'
import { User } from '@/common/models'
import { FormErrors, getErrorMessage } from '@/common/util/errors'
import { post } from '@/common/util/fetch'
import { loginSchema } from '@/common/zod-schemas/auth/signUpSchema'
import { AUTHENTICATION_COOKIE } from '@/context/auth/auth-cookie'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { ca } from 'zod/v4/locales'

export default async function loginAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined; user: User }
> {
  console.log(
    'Login action called with formData: ',
    Object.fromEntries(formData),
  )

  const data = Object.fromEntries(formData.entries())

  const validation = loginSchema.safeParse(data)

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
    const response = await post(AUTH_API_URL, 'auth/login', formDataToSend)
    const { error } = await response
    if (error) {
      console.log('❌ API Error:', error)
      return { errors: { api: error } }
    }
  } catch (error) {
    console.log('❌ Error during API call:', error)
    return {
      errors: {
        api: 'An error occurred while processing your request - Please try again.',
      },
    }
  }

  // ////////////////////////////////////////// OLD FETCH AUTH API //////////////////////////////////////////

  let res
  let parsedRes: User
  try {
    res = await fetch(`${AUTH_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
    parsedRes = await res.json()
    if (!res.ok) {
      console.log('NOT OK: ', parsedRes)
      return { errors: getErrorMessage(parsedRes) }
    }
    console.log('OK, parsed response: ', parsedRes)
  } catch (error) {
    console.error('Error during fetch:', error)
    return {
      errors: {
        api: 'An error occurred while processing your request - Please try again.',
      },
    }
  }

  // ////////////////////////////////////////// SET AUTH COOKIE //////////////////////////////////////////

  const setCookieHeader = res.headers.get('Set-Cookie')
  if (setCookieHeader) {
    const token = setCookieHeader.split(';')[0].split('=')[1]
    const cookieStore = await cookies()
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      path: '/',
      expires: new Date(jwtDecode(token).exp! * 1000),
    })
  }

  return { success: true, user: parsedRes }
}
