'use client'

import Button from '@/components/tailAdmin/ui/button/Button'
import { useActionState, useEffect, useTransition } from 'react'
import { FormErrors } from '@/common/util/errors'
import { useModal } from '@/hooks/useModal'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import FormSection from '@/components/custom/forms/FormSection'
import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import { recruiterCompleteProfileAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'
import ConfirmGeneralTerms from '@/components/custom/forms/modals/ConfirmGeneralTerms'
import RecruiterPersonalDetailsReview from './review-profile/RecruiterPersonalDetailsReview'
import RecruiterProfileReview from './review-profile/RecruiterProfileReview'

const initialState: FormErrors = {}

export default function RecruiterProfileReviewForm({
  activeStep,
  steps,
  setActiveStep,
  setSuccess,
}: StepComponentProps) {
  const { profileData } = useProfileCompletionContext()
  const { isOpen, openModal, closeModal } = useModal()
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(
    recruiterCompleteProfileAction.bind(
      null,
      profileData as RecruiterProfileInitialValuesType,
    ),
    {
      errors: initialState,
    },
  )

  const handleSubmit = () => {
    const formData = new FormData()
    Object.entries(profileData).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value))
    })
    startTransition(() => {
      formAction()
    })
  }

  useEffect(() => {
    if (state.success && !state.errors) {
      setSuccess && setSuccess(true)
    }
  }, [state, setSuccess])

  return (
    <div className="space-y-8">
      <RecruiterPersonalDetailsReview
        profileData={profileData as RecruiterProfileInitialValuesType}
        setActiveStep={setActiveStep}
      />

      <RecruiterProfileReview
        profileData={profileData as RecruiterProfileInitialValuesType}
        setActiveStep={setActiveStep}
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

        {activeStep < steps.length - 1 ? (
          <Button
            type="button"
            className="hover:bg-primary-dark rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button>
        ) : (
          <button
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
            onClick={openModal}
          >
            Submit
          </button>
        )}
        <ConfirmGeneralTerms
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
