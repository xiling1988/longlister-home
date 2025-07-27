import { Metadata } from 'next'
import React from 'react'
import { getMyCandidates } from './actions'
import RecruiterCandidatesPage from '@/components/custom/pageComponents/RecruiterCandidatesPage'
import { notFound } from 'next/navigation'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'

export const metadata: Metadata = {
  title: 'My Candidates',
  description:
    'Manage your candidates, view their profiles, and track their applications.',
}

export default async function CandidatesPage() {
  const { userType, candidates } = await getMyCandidates()

  return (
    <div>
      <PageBreadcrumb pageTitle="My Candidates" />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]"> */}
      <div className="mb-5 flex items-center justify-between lg:mb-7">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          Manage Canadidates
        </h3>
      </div>
      <div className="space-y-6">
        {userType === 'recruiter' && (
          <RecruiterCandidatesPage myCandidates={candidates} />
        )}
        {userType === 'client' && notFound()}
      </div>
    </div>
  )
}
