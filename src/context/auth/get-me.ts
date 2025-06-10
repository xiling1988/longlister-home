'use server'

import { get } from 'http'

import { AUTH_API_URL } from '@/common/constants'
import { getHeaders } from '@/common/util/fetch'

export default async function getMe() {
  const headers = await getHeaders()
  const me = await fetch(`${AUTH_API_URL}/users/me`, {
    // credentials: 'include', // Add this line to include cookies in the request
    headers: headers,
  })
  return me.json()
}
