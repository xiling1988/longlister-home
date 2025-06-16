import LinkToPdf from '../common/LinkToPdf'
import Button from '@/components/tailAdmin/ui/button/Button'
import { CandidateProfileVersion } from '@/common/models'
import { DocumentIcon, UserCircleIcon } from '@heroicons/react/16/solid'
import {
  CalendarDaysIcon,
  EyeIcon,
  LocationEdit,
  MapIcon,
  PinIcon,
} from 'lucide-react'
import { useModal } from '@/hooks/useModal'
import ViewProfileModal from '../forms/modals/ViewProfileModal'
import Link from 'next/link'
import { JOBS_API_URL } from '@/common/constants'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'

interface CandidateCardProps {
  candidate: CandidateProfileVersion
  isDisclosed?: boolean
}

export default function CandidateCard({
  candidate,
  isDisclosed,
}: CandidateCardProps) {
  const { openModal, closeModal, isOpen } = useModal()
  return (
    <div className="w-full rounded-xl bg-white ring-1 ring-gray-900/5 transition-shadow duration-200 ease-in-out hover:shadow-lg dark:bg-gray-900 dark:ring-gray-800">
      <div className="flex items-start justify-between p-4">
        <div>
          <dt className="text-sm font-semibold text-gray-900 dark:text-white">
            {candidate.details.personal.full_name}
          </dt>
          <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {candidate.details.personal.title || '—'}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Disclosure</dt>
          <dd
            className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              isDisclosed
                ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900 dark:text-yellow-200'
            }`}
          >
            {isDisclosed ? 'Disclosed' : 'Not Disclosed'}
          </dd>
        </div>
      </div>
      <dl className="flex flex-wrap">
        {/* Candidate Name + Title */}

        {/* Disclosure Status */}

        {/* CV Link */}
        <div className="mt-1 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
          <dd className="text-sm font-medium text-gray-900 dark:text-white">
            <Link
              href={`${JOBS_API_URL}/candidate-cvs/${candidate.id}.pdf`}
              target="_blank"
              className="flex h-full w-full items-center justify-center rounded-lg transition-colors dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <DocumentArrowDownIcon className="mr-3 h-5 text-brand-red" />
                <h4 className="py-1 text-center text-sm text-brand-red">
                  View CV
                </h4>
              </div>
            </Link>
          </dd>
        </div>

        {/* Location */}

        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt className="flex-none">
            <MapIcon className="h-6 w-5 text-gray-400" />
          </dt>
          <dd className="text-sm text-brand-red dark:text-gray-400">
            'Current Location'
          </dd>
        </div>

        {/* Notice Period */}

        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt className="flex-none">
            <CalendarDaysIcon className="h-6 w-5 text-gray-400" />
          </dt>
          <dd className="text-sm text-gray-600 dark:text-gray-400">
            1 month notice
          </dd>
        </div>

        {/* Salary Info */}

        <div className="mt-4 w-full border-t border-gray-900/5 px-6 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Current Salary</span>
            <span className="font-medium text-gray-800 dark:text-white/90">
              10000 AED
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Expected Salary</span>
            <span className="font-medium text-gray-800 dark:text-white/90">
              20000 AED
            </span>
          </div>
        </div>
      </dl>

      {/* Actions */}
      <div className="mt-6 border-t border-gray-900/5 px-6 py-4 text-left">
        <Button size="sm" variant="outline" onClick={openModal}>
          <EyeIcon className="mr-2 h-4 w-4" />
          View Full Profile
        </Button>
      </div>
      <ViewProfileModal
        cv={candidate.details}
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  )
}
