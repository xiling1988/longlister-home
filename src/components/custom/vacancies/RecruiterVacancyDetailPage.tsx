'use client'
import { notFound } from 'next/navigation'

import { Metadata } from 'next'
import SectionHeading from '../common/SectionHeading'
import VacancySummaryCard from './VacancySummaryCard'
import { Job } from '@/common/models'
import CandidateCard from './CandidateCard'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { useModal } from '@/hooks/useModal'
import { useAuth } from '@/context/auth/auth-context'
import Button from '@/components/tailAdmin/ui/button/Button'
import CreateVacancyModal from './create-vacancy/CreateVacancyModal'
import AddCandidateModal from '../forms/modals/AddCandidateModal'

interface VacancyDetailPageProps {
  vacancy: Job
}

export default function RecruiterVacancyDetailPage({
  vacancy,
}: VacancyDetailPageProps) {
  const { isOpen, openModal, closeModal } = useModal()
  if (!vacancy) return notFound()

  const candidates = vacancy.candidates || []
  //   const candidates = await getCandidatesByVacancyId(params.id)

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <PageBreadcrumb pageTitle={vacancy.jobTitle || ''} />
      <div className="mb-2 flex items-center justify-between lg:mb-7">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Vacancy Overview
        </h3>

        <Button
          onClick={openModal}
          className="bg-brand-red hover:bg-brand-coral"
          size="sm"
        >
          Add Candidate
        </Button>

        <AddCandidateModal
          openModal={openModal}
          vacancyId={vacancy.id || ''}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </div>
      <VacancySummaryCard vacancy={vacancy} />

      <SectionHeading title="Submitted Candidates" className="mt-10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate.candidateProfileVersion}
              name={candidate.candidateProfileVersion?.id || 'Unknown'}
              summary={
                candidate.candidateProfileVersion?.id || 'No summary available'
              }
            />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No candidates submitted yet for this vacancy.
          </p>
        )}
      </div>
    </div>
  )
}
