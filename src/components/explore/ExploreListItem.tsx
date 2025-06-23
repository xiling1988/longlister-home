import { API_URL } from '@/common/constants'
import { Job } from '@/common/models'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import { User2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type ExploreListItemProps = {
  vacancy: Job
  selectedVacancy: Job | null
  setSelectedVacancy: (vacancy: Job) => void
}

function ExploreListItem({
  vacancy,
  selectedVacancy,
  setSelectedVacancy,
}: ExploreListItemProps) {
  return (
    <li
      key={vacancy.id}
      onClick={() => setSelectedVacancy(vacancy)}
      className={`mb-1 flex cursor-pointer items-center gap-x-2 rounded border-b p-2 transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
        selectedVacancy?.id === vacancy.id
          ? 'border-gray-200 bg-gray-100 shadow-2xs hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800'
          : 'bg-white shadow-sm dark:bg-gray-900'
      }`}
    >
      <div className="h-full w-full flex-1 rounded dark:bg-gray-700">
        <Image
          height={40}
          width={40}
          src={`${API_URL}/company-logos/0fb6e83d-9995-44f2-b28c-69b17dd06a55.jpg`}
          alt="Company Logo"
          className="h-full w-full rounded object-center p-5"
          unoptimized
        />
      </div>
      <div className="ml-3 flex flex-3 flex-col gap-y-1">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          {vacancy.jobTitle}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {vacancy.companyName} - Dubai, UAE
        </p>
        <div className="mt-1 flex items-center justify-between gap-x-2">
          <div className="flex items-center gap-x-1">
            <User2Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Badge className="text-xs">3 CVs</Badge>
          </div>
          <div className="flex items-center gap-x-1">
            <User2Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Badge className="text-xs">2 TAs</Badge>
          </div>
          <div className="flex items-center gap-x-1">
            <User2Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Badge className="text-xs">4 days left</Badge>
          </div>
        </div>
        {/* <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {vacancy.summary}
        </p> */}
      </div>
    </li>
  )
}

export default ExploreListItem
