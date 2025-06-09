'use client'

import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/salient/Button'
import { TextField } from '@/components/salient/Fields'
import FullLogo from '@/images/full_logo_red.png'
import { SlimLayout } from '@/layout/salient/SlimLayout'
import { useAuth } from '@/context/auth/auth-context'
import loginAction from './loginAction'
import { useActionState, useEffect, useState } from 'react'
import Image from 'next/image'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import { EyeCloseIcon, EyeIcon } from '@/icons'
import { redirect } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Sign In',
// }

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(loginAction, { errors: '' })
  const authContext = useAuth()

  if (!authContext) {
    throw new Error('AuthContext must be used within a Provider')
  }

  const { setIsAuthenticated, setUser, contextLogin } = authContext

  useEffect(() => {
    // If login is successful (no error in the state), update the context
    if (!state?.errors && state?.success && state?.user) {
      setIsAuthenticated(true)
      contextLogin(state.user)
      redirect('/')
    }
  }, [state, setIsAuthenticated, setUser])

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/home" aria-label="Home">
          <Image
            src={FullLogo}
            alt="Full Logo"
            className="h-20 w-auto"
            unoptimized
            width={40}
            height={40}
          />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>
      <form action={formAction} className="mt-10 grid grid-cols-1 gap-y-8">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            // defaultValue={email}
            placeholder="Enter your email"
            name="email"
            required
            error={!!state.errors?.email}
            hint={state.errors?.email && state.errors?.email}
          />
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              error={!!state.errors?.password}
              hint={state.errors?.password && state.errors?.password}
              placeholder="Enter your password"
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                setShowPassword(!showPassword)
              }}
              className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
