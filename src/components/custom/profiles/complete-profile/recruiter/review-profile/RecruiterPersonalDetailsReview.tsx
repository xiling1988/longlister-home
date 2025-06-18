import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import FormSection from '@/components/custom/forms/FormSection'
import React from 'react'

interface RecruiterPersonalDetailsReviewProps {
  profileData: RecruiterProfileInitialValuesType
  setActiveStep: (step: number) => void
}

function RecruiterPersonalDetailsReview({
  profileData,
  setActiveStep,
}: RecruiterPersonalDetailsReviewProps) {
  return (
    <FormSection title="Personal Info" onEdit={() => setActiveStep(0)}>
      <ul className="text-sm text-gray-700">
        <li>
          <strong>Name:</strong> {profileData.firstName} {profileData.lastName}
        </li>
        <li>
          <strong>Phone:</strong> {profileData.phoneNumber}
        </li>
        <li>
          <strong>City:</strong> {profileData.city}
        </li>
        <li>
          <strong>Country:</strong> {profileData.country}
        </li>
        {profileData.linkedIn && (
          <li>
            <strong>LinkedIn:</strong> {profileData.linkedIn}
          </li>
        )}
        {profileData.website && (
          <li>
            <strong>Website:</strong> {profileData.website}
          </li>
        )}
      </ul>
    </FormSection>
  )
}

export default RecruiterPersonalDetailsReview
