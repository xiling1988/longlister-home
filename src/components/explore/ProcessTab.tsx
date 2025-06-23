import React from 'react'
import Badge from '../tailAdmin/ui/badge/Badge'

interface ProcessTabProps {
  jobProcess: {
    recruitmentTimeline?: number
    stages?: number
    interviewMode?: string
    decisionProcess?: string
  }
}

function ProcessTab({ jobProcess }: ProcessTabProps) {
  return (
    <>
      <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="space-y-1 text-sm text-gray-700 dark:text-white/80">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-base font-medium text-gray-500">
                Recruitment Timeline
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobProcess.recruitmentTimeline} weeks
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">Stages</dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobProcess.stages}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Interview Mode
              </dt>
              <dd>
                <Badge color="info">{jobProcess.interviewMode}</Badge>
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Decision Process
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobProcess.decisionProcess}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default ProcessTab
