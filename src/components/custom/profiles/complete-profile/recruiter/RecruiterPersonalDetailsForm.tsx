'use client'

import { useEffect, useActionState } from 'react'
import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { getRecruiterAvatar } from '@/common/util/helpers'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import Avatar from '@/components/tailAdmin/ui/avatar/Avatar'
import { recruiterPersonalDetailsAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'

const initialState: FormErrors = {}
const AVATAR_OPTIONS = [
  'avatar-1',
  'avatar-2',
  'avatar-3',
  'avatar-4',
  'avatar-5',
  'avatar-6',
]

export default function RecruiterPersonalDetailsForm({
  activeStep,
  steps,
  setActiveStep,
}: StepComponentProps) {
  const { profileData, updateProfileData } = useProfileCompletionContext()
  const [state, formAction] = useActionState(recruiterPersonalDetailsAction, {
    errors: initialState,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfileData({ [e.target.name]: e.target.value })
  }

  const handleAvatarSelect = (avatar: string) => {
    updateProfileData({ avatar })
  }

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep, activeStep])

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label>First Name</Label>
          <Input
            name="firstName"
            placeholder="e.g. Hans"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.firstName
            }
            onChange={handleChange}
            required
            error={!!state.errors?.firstName}
            hint={state.errors?.firstName}
          />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input
            name="lastName"
            placeholder="e.g. Schilling"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.lastName
            }
            onChange={handleChange}
            required
            error={!!state.errors?.lastName}
            hint={state.errors?.lastName}
          />
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            name="phoneNumber"
            placeholder="e.g. 0501234567"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.phoneNumber
            }
            onChange={handleChange}
            required
            error={!!state.errors?.phoneNumber}
            hint={state.errors?.phoneNumber}
          />
        </div>

        <div>
          <Label>City</Label>
          <Input
            name="city"
            placeholder="e.g. Dubai"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.city
            }
            onChange={handleChange}
            required
            error={!!state.errors?.city}
            hint={state.errors?.city}
          />
        </div>

        <div>
          <Label>Country</Label>
          <Input
            name="country"
            placeholder="e.g. UAE"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.country
            }
            onChange={handleChange}
            required
            error={!!state.errors?.country}
            hint={state.errors?.country}
          />
        </div>

        <div>
          <Label>LinkedIn (Optional)</Label>
          <Input
            name="linkedIn"
            placeholder="https://linkedin.com/in/yourname"
            defaultValue={
              (profileData as RecruiterProfileInitialValuesType)?.linkedIn
            }
            onChange={handleChange}
            error={!!state.errors?.linkedIn}
            hint={state.errors?.linkedIn}
          />
        </div>

        <div>
          <Label>Website (Optional)</Label>
          <Input
            name="website"
            placeholder="https://your-portfolio.com"
            defaultValue={profileData.website}
            onChange={handleChange}
            error={!!state.errors?.website}
            hint={state.errors?.website}
          />
        </div>
      </div>

      <input
        type="hidden"
        name="avatar"
        value={(profileData as RecruiterProfileInitialValuesType)?.avatar || ''}
      />

      <div className="mt-6">
        <Label>Select Avatar</Label>
        <div className="mt-2 flex flex-wrap gap-4">
          {AVATAR_OPTIONS.map((avatar) => (
            <div
              key={avatar}
              className={`cursor-pointer rounded-full border-2 p-1 ${
                (profileData as RecruiterProfileInitialValuesType)?.avatar ===
                avatar
                  ? 'border-brand-red'
                  : 'border-transparent'
              }`}
              onClick={() => handleAvatarSelect(avatar)}
            >
              <Avatar
                src={getRecruiterAvatar(avatar)}
                alt="Avatar"
                // className="h-16 w-16"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between px-4">
        <Button
          type="button"
          onClick={() => setActiveStep(activeStep - 1)}
          variant="outline"
          disabled={activeStep === 0}
        >
          Back
        </Button>

        <Button type="submit">
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  )
}
