import React from 'react'
import { int } from 'zod/v4'
import Badge from '../tailAdmin/ui/badge/Badge'

interface PackageTabProps {
  jobPackage: {
    salaryMin?: number
    salaryMax?: number
    bonusStructure?: string
    salaryReviewCycle?: string
    standardBenefits?: string
    additionalBenefits?: string
  }
}

function PackageTab({ jobPackage }: PackageTabProps) {
  return (
    <>
      <div className="group relative mt-8 rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="space-y-1 text-sm text-gray-700 dark:text-white/80">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <div>
              <dt className="text-base font-medium text-gray-500">
                Min Salary
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                AED {jobPackage?.salaryMin}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Max Salary
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                AED {jobPackage?.salaryMax}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Bonus Structure
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobPackage?.bonusStructure}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Salary Review
              </dt>
              <Badge color="info">{jobPackage?.salaryReviewCycle}</Badge>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Standard Benefits
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobPackage?.standardBenefits}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Additional Benefits
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobPackage?.additionalBenefits}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Additional Benefits
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobPackage?.additionalBenefits}
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-gray-500">
                Additional Benefits
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white/90">
                {jobPackage?.additionalBenefits}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default PackageTab
