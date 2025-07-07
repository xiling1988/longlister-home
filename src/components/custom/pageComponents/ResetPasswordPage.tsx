'use client'

import Link from 'next/link'
import { Button } from '@/components/salient/Button'
import FullLogo from '@/images/full_logo_red.png'
import { SlimLayout } from '@/layout/salient/SlimLayout'
import { useActionState, useEffect, useState } from 'react'
import Image from 'next/image'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Alert from '@/components/tailAdmin/ui/alert/Alert'

import { useSearchParams } from 'next/navigation'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import resetPasswordAction from '@/app/(full-width-pages)/(auth)/reset-password/resetPasswordAction'

export default function ResetPassword() {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(resetPasswordAction, {
    errors: '',
  })

  const token = searchParams.get('token')

  return (
    <SlimLayout>
      <div className="mx-auto w-full">
        <Link href="/home" aria-label="Home">
          <Image
            src={FullLogo}
            alt="Full Logo"
            className="h-auto w-full"
            unoptimized
            width={40}
            height={40}
          />
        </Link>
      </div>
      {state.errors.api && (
        <Alert
          variant="error"
          title="API Error Message "
          message={state.errors?.api || ''}
          showLink={false}
        />
      )}
      <h2 className="mt-1 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 -mb-5 text-sm text-gray-700">
        Don’t have an account?{' '}
        <Link
          href="/register"
          className="font-medium text-brand-red hover:underline"
        >
          Sign up
        </Link>{' '}
        for a free trial.
      </p>
      <form action={formAction} className="mt-10 grid grid-cols-1 gap-y-6">
        <input type="hidden" name="token" value={token || ''} />
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              error={!!state.errors?.password}
              hint={state.errors?.password && state.errors?.password}
              placeholder="Password"
              className="bg-white"
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
                <EyeClosedIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Label>Confirm Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              required
              error={!!state.errors?.password}
              hint={state.errors?.password && state.errors?.password}
              placeholder="Password"
              className="bg-white"
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
                <EyeClosedIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Button
            type="submit"
            variant="solid"
            color="brand-red"
            className="w-full"
          >
            <span>
              Reset Password<span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
