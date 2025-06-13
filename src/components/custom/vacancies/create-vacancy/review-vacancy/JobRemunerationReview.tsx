import React from 'react'
import { ReviewCardProps } from './JobDetailsReview'
import { DollarLineIcon } from '@/icons'
import { on } from 'events'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import FormSection from '@/components/custom/forms/FormSection'

function JobRemunerationReview({ onEdit, vacancyData }: ReviewCardProps) {
  const {
    salaryMin,
    salaryMax,
    bonusStructure,
    salaryReviewCycle,
    standardBenefits,
    additionalBenefits,
  } = vacancyData
  return (
    <FormSection
      title="Remuneration & Benefits"
      icon={DollarLineIcon}
      onEdit={onEdit}
    >
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-base font-medium text-gray-500">Min Salary</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            AED {salaryMin}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">Max Salary</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            AED {salaryMax}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Bonus Structure
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {bonusStructure}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">Salary Review</dt>
          <Badge color="info">{salaryReviewCycle}</Badge>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Standard Benefits
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {standardBenefits}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Additional Benefits
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {additionalBenefits}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Additional Benefits
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {additionalBenefits}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Additional Benefits
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {additionalBenefits}
          </dd>
        </div>
      </dl>
    </FormSection>
  )
}

export default JobRemunerationReview
