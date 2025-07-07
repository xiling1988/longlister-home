'use client'

import Link from 'next/link'

import { Button } from '@/components/salient/Button'
import FullLogo from '@/images/full_logo_red.png'
import { SlimLayout } from '@/layout/salient/SlimLayout'
import { useAuth } from '@/context/auth/auth-context'
import { useActionState, useEffect, useState } from 'react'
import Image from 'next/image'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Alert from '@/components/tailAdmin/ui/alert/Alert'
import forgotPassword from './forgotPassword'

// export const metadata: Metadata = {
//   title: 'Sign In',
// }

export default function ForgotPassword() {
  const [state, formAction] = useActionState(forgotPassword, { errors: '' })

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
      {state.errors?.api && (
        <Alert
          variant="error"
          title="API Error Message "
          message={state.errors?.api || ''}
          showLink={false}
        />
      )}
      {state.success && (
        <Alert
          variant="success"
          title="Email Submitted"
          message={
            'If the email is registered, you will receive a reset link shortly.'
          }
          className="mb-6"
        />
      )}
      <h2 className="mt-1 text-lg font-semibold text-gray-900">
        Forgot your password?{' '}
      </h2>
      <p className="mt-2 -mb-5 text-sm text-gray-700">
        {" Type your user email and we'll send you a reset link"}
      </p>
      <form action={formAction} className="mt-10 grid grid-cols-1 gap-y-8">
        <div className="-mb-3">
          <Label>Email</Label>
          <Input
            type="email"
            // defaultValue={email}
            placeholder="you@example.com"
            className="bg-white"
            name="email"
            required
            error={!!state.errors?.email}
            hint={state.errors?.email && state.errors?.email}
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="solid"
            color="brand-red"
            className="w-full"
          >
            <span>
              Sign in <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
