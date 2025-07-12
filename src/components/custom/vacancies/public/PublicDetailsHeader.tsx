import { API_URL } from '@/common/constants'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Job } from '@/common/models'
import { daysLeft, formatDate, getCompanyLogo } from '@/common/util/helpers'
import { DollarSignIcon } from 'lucide-react'
import { addVacancyToWorkspace } from '@/app/(dashboard)/(others-pages)/explore/actions'
import Button from '@/components/tailAdmin/ui/button/Button'

interface PublicDetailsHeaderProps {
  selectedVacancy: Job
}

function PublicDetailsHeader({ selectedVacancy }: PublicDetailsHeaderProps) {
  const [vacancyAdded, setVacancyAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const vacancyLink = 'https://yourdomain.com/vacancies/12345'

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
                src={getCompanyLogo(selectedVacancy.clientId)}
                alt={selectedVacancy?.companyName || 'Company Logo'}
                width={56}
                height={56}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
            <h4 className="text-md font-bold">{selectedVacancy.companyName}</h4>
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
      <div className="flex flex-col gap-2">
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
  )
}

export default PublicDetailsHeader
