'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import React, { useEffect } from 'react'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useActionState } from 'react'
import { FormErrors } from '@/common/util/errors'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import RichTextEditor from '@/components/custom/forms/RichTextEditor'
import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import { defaultRecruiterProfileData } from '@/common/constants'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import Select from '@/components/tailAdmin/form/Select'
import { recruiterProfileAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'

const initialState: FormErrors = {}

type Option = { value: string; label: string }

const experienceOptions: Option[] = [
  { value: '0-1 years', label: '0-1 years' },
  { value: '2-5 years', label: '2-5 years' },
  { value: '6-10 years', label: '6-10 years' },
  { value: '10+ years', label: '10+ years' },
]

const industryOptions: Option[] = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Other', label: 'Other' },
]

export default function RecruiterProfileForm({
  activeStep,
  steps,
  setActiveStep,
}: StepComponentProps) {
  const [state, formAction] = useActionState(recruiterProfileAction, {
    errors: initialState,
  })

  const { profileData, updateProfileData } = useProfileCompletionContext()

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })
  }

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep])

  return (
    <form action={formAction}>
      <div className="mb-6">
        <Label className="mt-2">Experience</Label>
        <Select
          options={experienceOptions}
          name="recruitingExperience"
          required
          defaultValue={
            (profileData as RecruiterProfileInitialValuesType)
              .recruitingExperience || ''
          }
          onChange={(value) =>
            updateProfileData({ recruitingExperience: value })
          }
          error={!!state.errors?.recruitingExperience}
          hint={state.errors?.recruitingExperience}
        />
      </div>

      <div className="my-6">
        <Label>Industry Specialization</Label>
        <Select
          options={industryOptions}
          name="industry"
          required
          defaultValue={
            (profileData as RecruiterProfileInitialValuesType).industry || ''
          }
          onChange={(value) => updateProfileData({ industry: value })}
          error={!!state.errors?.industry}
          hint={state.errors?.industry}
        />
      </div>
      <RichTextEditor
        title="Recruiter Bio"
        initialValue={
          (profileData as RecruiterProfileInitialValuesType).bio || ''
        }
        value={(profileData as RecruiterProfileInitialValuesType).bio || ''}
        onChange={(html) => updateProfileData({ bio: html })}
      />
      <input
        type="hidden"
        name="bio"
        value={(profileData as RecruiterProfileInitialValuesType).bio || ''}
      />

      <div className="mt-6 flex justify-between px-4">
        <Button
          type="button"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          variant="outline"
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          Back
        </Button>

        <Button
          type="submit"
          className="hover:bg-primary-dark rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm"
        >
          Next
        </Button>
      </div>
    </form>
  )
}
