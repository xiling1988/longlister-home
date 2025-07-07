'use client'

import { useEffect, useActionState } from 'react'
import Button from '@/components/tailAdmin/ui/button/Button'
import Label from '@/components/tailAdmin/form/Label'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import { companyProfileAndCultureAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'
import RichTextEditor from '@/components/custom/forms/RichTextEditor'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'

const initialState: FormErrors = {}

export default function CompanyProfileAndCultureForm({
  activeStep,
  steps,
  setActiveStep,
}: StepComponentProps) {
  const { profileData, updateProfileData } = useProfileCompletionContext()
  const [state, formAction] = useActionState(companyProfileAndCultureAction, {
    errors: initialState,
  })

  const handleChange = (field: string, value: string) => {
    updateProfileData({ [field]: value })
  }

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep, activeStep])

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <RichTextEditor
            title="Company Overview"
            value={
              (profileData as CompanyProfileInitialValuesType).overview || ''
            }
            onChange={(val) => handleChange('overview', val)}
          />
          <input
            type="hidden"
            name="overview"
            value={
              (profileData as CompanyProfileInitialValuesType).overview || ''
            }
          />
          {state.errors?.overview && (
            <p className="mt-1 text-sm text-red-600">{state.errors.overview}</p>
          )}
        </div>

        <div>
          <RichTextEditor
            title="Company Culture Description"
            value={
              (profileData as CompanyProfileInitialValuesType)
                .companyCultureDescription || ''
            }
            onChange={(val) => handleChange('companyCultureDescription', val)}
          />
          <input
            type="hidden"
            name="companyCultureDescription"
            value={
              (profileData as CompanyProfileInitialValuesType)
                .companyCultureDescription || ''
            }
          />
          {state.errors?.companyCultureDescription && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.companyCultureDescription}
            </p>
          )}
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
