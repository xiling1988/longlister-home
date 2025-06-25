'use client'
import { notFound } from 'next/navigation'

import { Metadata } from 'next'
import SectionHeading from '../common/SectionHeading'
import VacancySummaryCard from './ClientVacancySummaryCard'
import { CandidateOnJob, Job } from '@/common/models'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { useModal } from '@/hooks/useModal'
import Button from '@/components/tailAdmin/ui/button/Button'
import AddCandidateModal from '../forms/modals/AddCandidateModal'
import CandidateCard from './CandidateCard'
import RecruiterVacancySummaryCard from './RecruiterVacancySummaryCard'

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

        <AddCandidateModal
          openModal={openModal}
          vacancyId={vacancy.id || ''}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </div>
      <RecruiterVacancySummaryCard vacancy={vacancy} openModal={openModal} />

      <div className="flex items-center justify-between">
        <SectionHeading title="Submitted Candidates" className="mt-10" />
        <Button
          onClick={openModal}
          className="bg-brand-red hover:bg-brand-coral"
          size="sm"
        >
          Add Candidate
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.length > 0 ? (
          candidates.map((candidate: CandidateOnJob) => (
            <CandidateCard
              vacancy={vacancy}
              candidateOnJobId={candidate.id}
              viewMode="recruiter"
              key={candidate.id}
              candidate={candidate.candidateProfileVersion}
              isDisclosed={candidate.isDisclosed}
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
