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
      {state.errors.api && (
        <Alert
          variant="error"
          title="API Error Message "
          message={state.errors?.api || ''}
          showLink={false}
        />
      )}
      <h2 className="mt-10 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>{' '}
        to your account.
      </p>
      <form
        action={formAction}
        className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <div className="col-span-full">
          <Label>Select Company Type</Label>
          <div className="relative">
            <Select
              options={options}
              placeholder="Select an option"
              name="userType"
              onChange={handleUserTypeChange}
              className="dark:bg-dark-900"
            />
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {/* <ChevronDownIcon /> */}
            </span>
          </div>
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            // defaultValue={email}
            error={!!state.errors.email}
            name="email"
            placeholder="Enter your email"
            hint={state.errors?.email && state.errors.email}
          />
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              name="password"
              error={!!state.errors.password}
              hint={state.errors?.password && state.errors.password}
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
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Sign up <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
