import { API_URL } from '@/common/constants'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Image from 'next/image'
import React from 'react'
import { Job } from '@/common/models'
import { daysLeft, formatDate } from '@/common/util/helpers'
import { DollarSignIcon } from 'lucide-react'

interface ExploreDetailsHeaderProps {
  selectedVacancy: Job
}

function ExploreDetailsHeader({ selectedVacancy }: ExploreDetailsHeaderProps) {
  return (
    <div className="mb-6 flex-col items-start justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div className="h-full w-32 flex-shrink-0 overflow-hidden rounded-full dark:bg-gray-800">
          <Image
            src={`${API_URL}/company-logos/${selectedVacancy.clientId}.jpg`}
            alt={selectedVacancy?.companyName || 'Company Logo'}
            width={56}
            height={56}
            className="h-full w-full object-cover"
            unoptimized
          />
        </div>
        <h4 className="text-md font-bold">{selectedVacancy.companyName}</h4>
      </div>
    
      {/* Job Info */}
      <div className="flex flex-1 flex-col">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {selectedVacancy.jobTitle}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {/* { selectedVacancy.location} */}
          Dubai, UAE
        </p>
      </div>

      {/* Budget/Timing Info */}
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-semibold text-brand-coral dark:text-gray-300">
            Budget
          </h5>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border p-4">
            <div className="col-span-1 flex-col items-center">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Price per CV: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {selectedVacancy?.cvPriceBudget} AED
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Deadline: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {formatDate(selectedVacancy.deadline || '')}
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                {' '}
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Price per CV: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {selectedVacancy.maxCvs} candidates
              </Badge>
            </div>
            <div className="col-span-1 flex-col items-center gap-1">
              <div className="flex items-center gap-1 pb-2">
                <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-xs">Days left: </span>
              </div>

              <Badge className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                {daysLeft(selectedVacancy.deadline || '')} days left
              </Badge>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          <h5 className="text-sm font-semibold text-brand-coral dark:text-gray-300">
            Non-Negotiables
          </h5>
          <div className="flex h-full w-full flex-wrap gap-2 overflow-y-auto rounded-2xl border p-4">
            {selectedVacancy.nonNegotiables?.map((skill, index) => (
              <Badge
                key={index}
                variant="solid"
                className="h-[50px] text-center text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300"
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

export default ExploreDetailsHeader
