'use client'

import Link from 'next/link'

import { Button } from '@/components/salient/Button'
import { SelectField, TextField } from '@/components/salient/Fields'
import { SlimLayout } from '@/layout/salient/SlimLayout'
import Image from 'next/image'
import FullLogo from '@/images/full_logo_red.png'
import Label from '@/components/tailAdmin/form/Label'
import Select from '@/components/tailAdmin/form/Select'
import { ChevronDownIcon, EyeCloseIcon, EyeIcon } from '@/icons'
import { useActionState, useState } from 'react'
import Input from '@/components/tailAdmin/form/input/InputField'
import signUpAction from './signUpAction'
import Alert from '@/components/tailAdmin/ui/alert/Alert'
import { tr } from 'zod/v4/locales'

// export const metadata: Metadata = {
//   title: 'Sign Up',
// }

const options = [
  { value: 'recruiter', label: 'Freelance Recruiter' },
  { value: 'client', label: 'Hiring Company / Recruitment Agency' },
]

export default function Register() {
  const [state, formAction] = useActionState(signUpAction, { errors: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState('')

  const handleUserTypeChange = () => {
    console.log('change')
    // setUserType(event.target.value as string)
  }

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
          title="Welcome to Longlister"
          message={
            'Your account has been created successfully! Please click the link below to login.'
          }
          showLink={true}
          linkText="Go to Login"
          linkHref="/login"
          className="mb-4"
        />
      )}
      <h2 className="mt-1 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 -mb-5 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href="/login"
          className="font-medium text-brand-red hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>
      <form
        action={formAction}
        className="mt-10 grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-2"
      >
        <div className="col-span-full -mb-3">
          <Label>Select User Type</Label>
          <div className="relative">
            <Select
              options={options}
              placeholder="Select an option"
              name="userType"
              onChange={handleUserTypeChange}
              className="dark:bg-dark-900"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400"></span>
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            // defaultValue={email}
            error={!!state.errors?.email}
            name="email"
            placeholder="you@example.com"
            hint={state.errors?.email && state.errors.email}
            className="-mb-3 bg-white"
          />
        </div>
        <div>
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              error={!!state.errors?.password}
              hint={state.errors?.password && state.errors?.password}
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
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="col-span-full">
          <Button
            type="submit"
            variant="solid"
            color="brand-red"
            className="w-full"
          >
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
