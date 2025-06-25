import React from 'react'
import { ReviewCardProps } from './JobDetailsReview'
import { CalenderIcon } from '@/icons'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import FormSection from '@/components/custom/forms/FormSection'
import { NotifyParty } from '@/components/custom/forms/NotificationRecipients'

function JobProcessReview({ onEdit, vacancyData }: ReviewCardProps) {
  const {
    recruitmentTimeline,
    stages,
    interviewMode,
    decisionProcess,
    notifyParties,
  } = vacancyData
  return (
    <FormSection
      title="Recruitment Process"
      icon={CalenderIcon}
      onEdit={onEdit}
    >
      <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <div>
          <dt className="text-base font-medium text-gray-500">
            Recruitment Timeline
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {recruitmentTimeline} weeks
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">Interviews</dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">{stages}</dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Interview Mode
          </dt>
          <dd>
            <Badge color="info">{interviewMode}</Badge>
          </dd>
        </div>
        <div>
          <dt className="text-base font-medium text-gray-500">
            Decision Process
          </dt>
          <dd className="text-sm text-gray-900 dark:text-white/90">
            {decisionProcess}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <h3 className="mb-2 text-base font-medium text-gray-500">
          Notification Recipients
        </h3>
        <ul className="space-y-1 px-3 text-base text-gray-800 dark:text-white/90">
          {notifyParties.map((p: NotifyParty, i: number) => (
            <li
              key={i}
              className="flex justify-between border-b py-1 text-base"
            >
              <span>{p.name}</span>
              <span className="text-brand-coral">{p.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </FormSection>
  )
}

export default JobProcessReview
