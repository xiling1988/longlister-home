'use server'

import { cookies } from 'next/headers'
import { AUTH_API_URL, JOBS_API_URL } from '../constants'
import { getErrorMessage } from './errors'

export const getHeaders = async () => {
  const cookieStore = await cookies()
  return {
    Cookie: cookieStore.toString(),
  }
}

export async function post(url: string, path: string, formData: FormData) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getHeaders()),
  }
  const res = await fetch(`${url}/${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(Object.fromEntries(formData)),
  })
  const parsedRes = await res.json()
  if (!res.ok) {
    console.log('NOT OK: ', parsedRes)
    return { error: getErrorMessage(parsedRes) }
  }
  return { error: '' }
}

export async function get(url: string, path: string) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getHeaders()),
  }
  const res = await fetch(`${url}/${path}`, {
    credentials: 'include',
    headers: headers,
    // headers: await { ...getHeaders() },
  })
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

export async function patch(path: string, formData: FormData) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getHeaders()),
  }

  const data: Record<string, any> = {}

  formData.forEach((value, key) => {
    // Check for nested keys (e.g., "recruiterProfile.firstName")
    const keys = key.split('.')
    let current = data

    while (keys.length > 1) {
      const part = keys.shift()!
      if (!current[part]) current[part] = {} // Create nested structure if missing
      current = current[part]
    }

    current[keys[0]] = value
  })

  console.log('LOGGING PATCH TRANSFORMED FORMDATA', JSON.stringify(data))

  const res = await fetch(`${AUTH_API_URL}/${path}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify(data),
  })

  const parsedRes = await res.json()
  console.log('PARSED RESPONSE: ', parsedRes)
  if (!res.ok) {
    console.log('NOT OK: ', parsedRes)
    return { error: getErrorMessage(parsedRes) }
  }
  // const userId = parsedRes.data.id
  // Returning the userId to be used as a param to upload company logo.
  return { error: '' }
}

export async function remove(url: string, path: string) {
  const headers = {
    'Content-Type': 'application/json',
    ...(await getHeaders()),
  }
  try {
    const res = await fetch(`${url}/${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: headers,
    })
    // if (!res.ok) {
    //   throw new Error(`HTTP error! status: ${res.status} : ${res.statusText}`)
    // }

    return res.json()
  } catch (error) {
    console.error('Error in remove function:', error)
    return { error: getErrorMessage(error) }
  }
}
