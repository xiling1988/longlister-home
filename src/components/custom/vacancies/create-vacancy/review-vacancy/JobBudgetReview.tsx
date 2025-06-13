import React, { useState } from 'react'
import { ReviewCardProps } from './JobDetailsReview'
import { ListIcon } from '@/icons'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import FormSection from '@/components/custom/forms/FormSection'

function JobBudgetReview({ onEdit, vacancyData }: ReviewCardProps) {
  const { maxCvs, deadline, totalBudget, cvPriceBudget } = vacancyData
  const deadlineDate = new Date(
    new Date().getTime() + deadline * 24 * 60 * 60 * 1000,
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <FormSection title="Budget & CV Target" icon={ListIcon} onEdit={onEdit}>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-base font-medium text-gray-500">Target CVs</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">{maxCvs}</dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Deadline{' '}
            <Badge color="info" className="ml-2">
              {deadline} days
            </Badge>
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {deadlineDate}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">Total Budget</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            AED {Number(totalBudget).toFixed(2) || '—'}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">Budget per CV</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            AED {Number(cvPriceBudget).toFixed(2) || '—'}
          </dd>
        </div>
      </dl>
    </FormSection>
  )
}

export default JobBudgetReview
