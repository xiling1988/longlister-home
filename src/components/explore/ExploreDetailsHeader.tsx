import { API_URL } from '@/common/constants'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Job } from '@/common/models'
import { daysLeft, formatDate } from '@/common/util/helpers'
import { DollarSignIcon } from 'lucide-react'
import Button from '../tailAdmin/ui/button/Button'
import { addVacancyToWorkspace } from '@/app/(dashboard)/(others-pages)/explore/actions'

interface ExploreDetailsHeaderProps {
  selectedVacancy: Job
}

function ExploreDetailsHeader({ selectedVacancy }: ExploreDetailsHeaderProps) {
  const [vacancyAdded, setVacancyAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const vacancyLink = `http://localhost:8080/public/vacancies/${selectedVacancy.id}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vacancyLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
      // Optional: set some error state
    }
  }

  const handleAddVacancyToWorkspace = async () => {
    setLoading(true)

    // ✅ Calls server action
    const response = await addVacancyToWorkspace(selectedVacancy?.id as string)
    if (response instanceof Error) {
      setError(response.message) // ✅ Updates UI state
    } else {
      setVacancyAdded(true) // ✅ Updates UI state
    }

    setLoading(false) // ✅ Updates UI state
  }

  // cleanup error state when selectedVacancy changes
  useEffect(() => {
    return () => {
      if (error) {
        setError(null)
      }
    }
  }, [selectedVacancy, error])

  return (
    <div className="mb-6 flex-col items-start justify-between gap-4 px-6">
      {/* Logo */}
      <div className="my-4 rounded-2xl p-6">
        {/* Top row: logo + company + actions */}
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Company */}
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded dark:bg-gray-800">
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

          {/* Actions */}

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={handleCopy}
            >
              {copied ? 'Link copied!' : 'Share with Candidate'}
            </Button>

            <Button
              className="hover:bg-opacity-90 rounded-md bg-brand-coral px-4 py-2 text-sm font-medium text-white shadow-sm"
              onClick={handleAddVacancyToWorkspace}
              disabled={loading || !!error}
            >
              {error ? error : vacancyAdded ? 'Added' : 'Add to Workspace'}
            </Button>
          </div>
        </div>

        {/* Job Info */}
        <div className="mt-4 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {selectedVacancy.jobTitle}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {/* {selectedVacancy.location || 'Dubai, UAE'} */}
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
          <div className="grid grid-cols-2 gap-3 rounded-2xl p-4">
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
                <span className="text-xs">Profile Target: </span>
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
          <h5 className="text-left text-lg font-semibold text-brand-coral dark:text-gray-300">
            Non-Negotiables
          </h5>
          <div className="flex h-full w-full flex-wrap gap-2 overflow-y-auto rounded-2xl p-4">
            {selectedVacancy.nonNegotiables?.map((skill, index) => (
              <Badge
                key={index}
                className="col-span-1 bg-brand-100 text-sm text-brand-700 dark:bg-brand-900 dark:text-brand-300"
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
