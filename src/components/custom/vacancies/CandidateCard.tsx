import Button from '@/components/tailAdmin/ui/button/Button'
import { CandidateProfileVersion, Job } from '@/common/models'
import {
  CalendarDaysIcon,
  CheckIcon,
  EyeIcon,
  MapIcon,
  XIcon,
} from 'lucide-react'
import { useModal } from '@/hooks/useModal'
import ViewProfileModal from '../forms/modals/ViewProfileModal'
import Link from 'next/link'
import { JOBS_API_URL } from '@/common/constants'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import RejectCandidateModal from '../forms/modals/RejectCandidateModal'
import ApproveCandidateModal from '../forms/modals/ApproveCandidateModal'
import { getCandidateCV } from '@/common/util/helpers'

interface CandidateCardProps {
  vacancy: Job
  candidateOnJobId: string
  candidate: CandidateProfileVersion
  isDisclosed: boolean
  viewMode: 'recruiter' | 'client'
}

export default function CandidateCard({
  vacancy,
  candidateOnJobId,
  candidate,
  isDisclosed,
  viewMode,
}: CandidateCardProps) {
  const { openModal, closeModal, isOpen } = useModal()
  const [modalType, setModalType] = useState<
    null | 'view' | 'reject' | 'approve'
  >(null)

  const openViewModal = () => setModalType('view')
  const openRejectModal = () => setModalType('reject')
  const openApproveModal = () => setModalType('approve')
  const closeModalHandler = () => {
    setModalType(null)
    closeModal()
  }

  console.log('candidate:', candidate)

  return (
    <div className="w-full rounded-xl bg-white ring-1 ring-gray-900/5 transition-shadow duration-200 ease-in-out hover:shadow-lg dark:bg-gray-900 dark:ring-gray-800">
      <div className="flex items-start justify-between p-4">
        <div>
          <dt
            className={`text-sm font-semibold text-gray-900 dark:text-white ${viewMode === 'client' && !isDisclosed ? 'blur-xs' : ''}`}
          >
            {viewMode === 'recruiter' || isDisclosed
              ? candidate.details.personal.full_name
              : 'Undisclosed Candidate'}
          </dt>
          <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {viewMode === 'recruiter' || isDisclosed ? (
              candidate.details.personal.title || '—'
            ) : (
              <Button
                variant="plain"
                color="gray-400"
                className="mt-1 text-sm italic"
                onClick={openApproveModal}
              >
                Available upon unlock
              </Button>
            )}
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

        {viewMode === 'recruiter' || isDisclosed ? (
          <Link
            href={getCandidateCV(candidate.id)}
            target="_blank"
            className="flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-3"
          >
            <dt className="flex-none">
              <DocumentArrowDownIcon className="h-6 w-5 text-gray-400" />
            </dt>
            <Button
              variant="plain"
              className="text-sm text-brand-red dark:text-gray-400"
            >
              View CV
            </Button>
          </Link>
        ) : (
          <div className="flex w-full flex-none items-center gap-x-4 border-t border-gray-900/5 px-6 pt-3">
            <Button
              variant="plain"
              color="gray-400"
              className="mt-1 text-sm italic"
              onClick={openApproveModal}
            >
              <dt className="flex-none">
                <DocumentArrowDownIcon className="h-6 w-5 text-gray-400" />
              </dt>
              Unlock to view CV
            </Button>
          </div>
        )}

        {/* Location */}

        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt className="flex-none">
            <MapIcon className="h-6 w-5 text-gray-400" />
          </dt>
          <dd className="text-sm text-brand-red dark:text-gray-400">
            {candidate.location ? candidate.location : 'Location not specified'}
          </dd>
        </div>

        {/* Notice Period */}

        <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
          <dt className="flex-none">
            <CalendarDaysIcon className="h-6 w-5 text-gray-400" />
          </dt>
          <dd className="text-sm text-gray-600 dark:text-gray-400">
            {candidate.noticePeriod}{' '}
            {candidate.noticePeriod > 1 ? 'months' : 'month'}
          </dd>
        </div>

        {/* Salary Info */}

        <div className="mt-4 w-full border-t border-gray-900/5 px-6 pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Current Salary (monthly)</span>
            <span className="font-medium text-gray-800 dark:text-white/90">
              {candidate.currentSalary
                ? `${candidate.currentSalary} ${candidate.currency}`
                : 'Not specified'}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Expected Salary (monthly)</span>
            <span className="font-medium text-gray-800 dark:text-white/90">
              {candidate.expectedSalary
                ? `${candidate.expectedSalary} ${candidate.currency}`
                : 'Not specified'}
            </span>
          </div>
        </div>
      </dl>

      {/* Actions */}
      <div className="mt-2 flex items-center justify-between gap-x-1 border-t border-gray-900/5 px-3 py-1">
        <div className="flex-1 py-4 text-left">
          <Button
            size="sm"
            variant="outline"
            color="sky-500"
            onClick={openViewModal}
            className="group text-sky-500"
          >
            <EyeIcon className="h-4 w-4" />
            View Profile
          </Button>
        </div>
        {viewMode === 'client' && !isDisclosed && (
          <div className="flex items-center gap-x-2 py-4 text-left">
            <Button size="sm" variant="primary" onClick={openRejectModal}>
              <XIcon className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={openApproveModal}
              className=""
            >
              <CheckIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      {modalType === 'view' && (
        <ViewProfileModal
          isOpen
          openModal={openViewModal}
          closeModal={closeModalHandler}
          cv={candidate.details}
          isDisclosed={viewMode === 'recruiter' ? true : isDisclosed}
          vacancy={vacancy}
          candidate={candidate}
          candidateOnJobId={candidateOnJobId}
          disableEscape={false}
        />
      )}
      {modalType === 'reject' && (
        <RejectCandidateModal
          isOpen
          openModal={openRejectModal}
          closeModal={closeModalHandler}
          candidateOnJobId={candidateOnJobId}
        />
      )}
      {modalType === 'approve' && (
        <ApproveCandidateModal
          vacancy={vacancy}
          candidate={candidate}
          isOpen
          openModal={openApproveModal}
          closeModal={closeModalHandler}
          candidateOnJobId={candidateOnJobId}
        />
      )}
    </div>
  )
}
