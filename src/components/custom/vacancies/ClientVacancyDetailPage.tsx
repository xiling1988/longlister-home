'use client'

import { notFound } from 'next/navigation'

import { Metadata } from 'next'
import SectionHeading from '../common/SectionHeading'
import VacancySummaryCard from './ClientVacancySummaryCard'
import { Job } from '@/common/models'
import CandidateCard from './CandidateCard'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import ExploreDetailsHeader from '@/components/explore/ExploreDetailsHeader'
import ClientVacancySummaryCard from './ClientVacancySummaryCard'

interface VacancyDetailPageProps {
  vacancy: Job
}

export default function ClientVacancyDetailPage({
  vacancy,
}: VacancyDetailPageProps) {
  //   const vacancy = await getVacancyDetails(params.id)
  if (!vacancy) return notFound()

  const candidates = vacancy.candidates || []
  //   const candidates = await getCandidatesByVacancyId(params.id)

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <PageBreadcrumb pageTitle="Manage Vacancy" />
      {/* <SectionHeading title="Vacancy Overview" /> */}

      {/* <ExploreDetailsHeader selectedVacancy={vacancy} /> */}
      <ClientVacancySummaryCard vacancy={vacancy} />

      <SectionHeading title="Submitted Candidates" className="mt-10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {candidates.length > 0 ? (
          [...candidates]
            .reverse()
            .map((candidate) => (
              <CandidateCard
                vacancy={vacancy}
                candidateOnJobId={candidate.id}
                key={candidate.id}
                viewMode="client"
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
