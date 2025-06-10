'use server'

import { AUTHENTICATION_COOKIE } from '@/context/auth/auth-cookie'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Delete the authentication cookie from browser storage
export default async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTHENTICATION_COOKIE)
}
