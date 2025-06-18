import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import FormSection from '@/components/custom/forms/FormSection'
import React from 'react'

interface RecruiterProfileReviewProps {
  profileData: RecruiterProfileInitialValuesType
  setActiveStep: (step: number) => void
}

function RecruiterProfileReview({
  profileData,
  setActiveStep,
}: RecruiterProfileReviewProps) {
  return (
    <FormSection title="Professional Profile" onEdit={() => setActiveStep(1)}>
      <ul className="text-sm text-gray-700">
        <li>
          <strong>Experience:</strong> {profileData.recruitingExperience}
        </li>
        <li>
          <strong>Industry:</strong> {profileData.industry}
        </li>
        <li className="mt-2">
          <strong>Bio:</strong>
        </li>
        <div
          className="prose mt-1 max-w-none rounded-md border border-gray-100 p-3 text-sm dark:border-gray-700"
          dangerouslySetInnerHTML={{
            __html: profileData.bio || '',
          }}
        />
      </ul>
    </FormSection>
  )
}

export default RecruiterProfileReview
