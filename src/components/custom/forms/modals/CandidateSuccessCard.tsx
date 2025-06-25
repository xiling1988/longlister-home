'use client'

import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'
import { CheckCircleIcon } from '@/icons'
import React, { useState } from 'react'
import LinkToPdf from '../../common/LinkToPdf'
import { CandidateProfileVersion, FullCandidateCV } from '@/common/models'

interface CandidateSuccessCardProps {
  candidate: CandidateProfileVersion
}

export default function CandidateSuccessCard({
  candidate,
}: CandidateSuccessCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const profile: FullCandidateCV = candidate.details as FullCandidateCV
  const { full_name, title, email, phone } = profile.personal
  const experience = profile.experience || []

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <div className="h-28 w-28 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
            <LinkToPdf candidateVersionId={candidate.id} />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {full_name}
            </h4>
            {title && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {title}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {email && (
                <span className="rounded-full bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red">
                  {email}
                </span>
              )}
              {phone && (
                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-white">
                  {phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <CheckCircleIcon className="text-green-500" size={28} />
        </div>
      </div>

      <div className="my-4 h-px w-full bg-gray-100 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-12">
        {experience && (
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Latest Experience
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {experience[0]?.job_title || 'N/A'}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="m-4 max-w-4xl"
      >
        <div className="relative w-full rounded-2xl bg-white p-6 dark:bg-gray-900">
          <h4 className="mb-4 text-center text-xl font-semibold text-gray-800 dark:text-white">
            Candidate Profile
          </h4>
          {/* <FullCandidateProfileViewer cv={candidate.details} /> */}
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setIsModalOpen(false)} size="sm">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
