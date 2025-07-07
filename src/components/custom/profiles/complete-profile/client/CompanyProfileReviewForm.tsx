'use client'

import Button from '@/components/tailAdmin/ui/button/Button'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { FormErrors } from '@/common/util/errors'
import { useModal } from '@/hooks/useModal'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import FormSection from '@/components/custom/forms/FormSection'
import {
  CompanyProfileInitialValuesType,
  RecruiterProfileInitialValuesType,
} from '@/common/zod-schemas/profiles/schemas'
import {
  companyCompleteProfileAction,
  recruiterCompleteProfileAction,
} from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'
import ConfirmGeneralTerms from '@/components/custom/forms/modals/ConfirmGeneralTerms'
import CompanyDetailsReview from './review-profile/CompanyDetailsReview'
import CompanyProfileReview from './review-profile/CompanyProfileReview'
import CompanyPaymentDetailsReview from './review-profile/CompanyPaymentDetailsReview'

const initialState: FormErrors = {}

export default function CompanyProfileReviewForm({
  activeStep,
  steps,
  setActiveStep,
  setSuccess,
}: StepComponentProps) {
  const { profileData, resetData } = useProfileCompletionContext()
  const { isOpen, openModal, closeModal } = useModal()
  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(
    companyCompleteProfileAction.bind(
      null,
      profileData as CompanyProfileInitialValuesType,
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
      resetData()
      setSuccess && setSuccess(true)
    }
  }, [state, setSuccess, resetData])

  return (
    <div className="space-y-8">
      <CompanyDetailsReview
        profileData={profileData as CompanyProfileInitialValuesType}
        setActiveStep={setActiveStep}
      />

      <CompanyProfileReview
        profileData={profileData as CompanyProfileInitialValuesType}
        setActiveStep={setActiveStep}
      />

      <CompanyPaymentDetailsReview
        profileData={profileData as CompanyProfileInitialValuesType}
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
