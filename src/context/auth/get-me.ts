'use server'

import { AUTH_API_URL } from '@/common/constants'
import { getHeaders } from '@/common/util/fetch'

export default async function getMe({ next }: { next?: { tags?: string[] } }) {
  const headers = await getHeaders()
  const me = await fetch(`${AUTH_API_URL}/users/me`, {
    next: { tags: ['user-profile'] },
    // credentials: 'include', // Add this line to include cookies in the request
    headers: headers,
  })
  return me.json()
}
