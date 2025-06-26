import { InfoIcon } from '@/icons'
import React from 'react'

import Button from '@/components/tailAdmin/ui/button/Button'
import { useModal } from '@/hooks/useModal'

import Badge from '@/components/tailAdmin/ui/badge/Badge'
import CreateVacancyModal from '../CreateVacancyModal'
import FormSection from '@/components/custom/forms/FormSection'
import { Html } from 'next/document'
import HtmlPreview from '@/components/custom/common/HtmlPreview'
import HtmlPreviewModal from '@/components/custom/common/HtmlPreviewModal'

export interface ReviewCardProps {
  vacancyData: any
  onEdit: () => void
}

function JobDetailsReview({ onEdit, vacancyData }: ReviewCardProps) {
  const { jobTitle, nonNegotiables, jobDescription } = vacancyData
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <FormSection
      title="Role & Responsibilities"
      icon={InfoIcon}
      onEdit={onEdit}
    >
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-base font-medium text-gray-500">Job Title</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {jobTitle}
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Non-Negotiables
          </dt>
          <dd className="flex flex-wrap gap-2 pt-1">
            {nonNegotiables.map((item: string, idx: number) => (
              <Badge
                key={idx}
                className="rounded px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-white"
              >
                {item}
              </Badge>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <div>
          <dd className="text-base text-gray-900 dark:text-white/90">
            <Button variant="outline" size="sm" onClick={openModal}>
              Job Description
            </Button>
          </dd>
        </div>
        <HtmlPreviewModal
          html={jobDescription}
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />
        {/* <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: jobDescription }}
        /> */}
      </div>
    </FormSection>
  )
}

export default JobDetailsReview
