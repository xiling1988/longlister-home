import { RecruiterProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import HtmlPreviewModal from '@/components/custom/common/HtmlPreviewModal'
import FormSection from '@/components/custom/forms/FormSection'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import React from 'react'

interface RecruiterProfileReviewProps {
  profileData: RecruiterProfileInitialValuesType
  setActiveStep: (step: number) => void
}

function RecruiterProfileReview({
  profileData,
  setActiveStep,
}: RecruiterProfileReviewProps) {
  const { openModal, closeModal, isOpen } = useModal()
  return (
    <FormSection title="Professional Profile" onEdit={() => setActiveStep(1)}>
      <ul className="text-sm text-gray-700">
        <li>
          <strong>Experience:</strong> {profileData.recruitingExperience}
        </li>
        <li>
          <strong>Industry:</strong> {profileData.industry}
        </li>
        <div className="mt-6">
          <div>
            <dd className="text-base text-gray-900 dark:text-white/90">
              <Button variant="outline" size="sm" onClick={openModal}>
                Preview Bio
              </Button>
            </dd>
          </div>
          <HtmlPreviewModal
            html={profileData.bio || ''}
            openModal={openModal}
            closeModal={closeModal}
            isOpen={isOpen}
          />
        </div>
      </ul>
    </FormSection>
  )
}

export default RecruiterProfileReview
