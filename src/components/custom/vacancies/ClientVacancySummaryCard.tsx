import { API_URL } from '@/common/constants'
import { Job } from '@/common/models'
import { daysLeft, formatDate } from '@/common/util/helpers'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Button from '@/components/tailAdmin/ui/button/Button'
import { DollarSignIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

// components/vacancies/VacancySummaryCard.tsx
interface VacancySummaryCardProps {
  vacancy: Job
}

export default function ClientVacancySummaryCard({
  vacancy,
}: VacancySummaryCardProps) {
  const [vacancyAdded, setVacancyAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="mb-6 flex-col items-start justify-between gap-4">
      {/* Logo */}
      <div className="my-4 flex rounded-xl">
        {/* Top row: logo + company + actions */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Company */}
          {/* <div className="flex items-center gap-4">
            <h4 className="text-md font-bold">{vacancy.companyName}</h4>
          </div> */}
        </div>

        {/* Job Info */}
        <div className="mt-4 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {vacancy.jobTitle}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/* {vacancy.location || 'Dubai, UAE'} */}
            Dubai, UAE
          </p>
        </div>
      </div>

      {/* Budget/Timing Info */}
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-semibold text-brand-coral dark:text-gray-300">
            Budget
          </h5>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border p-4">
            <div className="col-span-1 flex-col items-center">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Price per CV: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {vacancy?.cvPriceBudget} AED
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Deadline: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {formatDate(vacancy.deadline || '')}
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                {' '}
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Price per CV: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {vacancy.maxCvs} candidates
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Days left: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {daysLeft(vacancy.deadline || '')} days left
              </Badge>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <h5 className="text-right text-lg font-semibold text-brand-coral dark:text-gray-300">
            Non-Negotiables
          </h5>
          <div className="flex h-full w-full flex-wrap gap-2 overflow-y-auto rounded-2xl border p-4">
            {vacancy.nonNegotiables?.map((skill, index) => (
              <Badge
                key={index}
                variant="solid"
                className="h-9 text-center text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
