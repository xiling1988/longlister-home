'use client'

import CreateVacancyModal from '@/components/custom/vacancies/create-vacancy/CreateVacancyModal'
import BasicTableOne from '@/components/tailAdmin/tables/BasicTableOne'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import React, { useEffect, useState } from 'react'
import { getMyVacanciesClient } from './actions'
import { Job } from '@/common/models'
import ClientVacanciesTable from '@/components/tailAdmin/tables/ClientVacanciesTable'
import { set } from 'zod/v4'
import { useAuth } from '@/context/auth/auth-context'
import RecruiterVacanciesTable from '@/components/tailAdmin/tables/RecruiterVacanciesTable'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import Link from 'next/link'

// export const metadata: Metadata = {
//   title: 'Next.js Profile | TailAdmin - Next.js Dashboard Template',
//   description:
//     'This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
// }

export default function Vacancies() {
  const { isOpen, openModal, closeModal } = useModal()
  const { user } = useAuth()

  return (
    <div>
      <PageBreadcrumb pageTitle="Vacancies" />
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]"> */}
      <div className="mb-5 flex items-center justify-between lg:mb-7">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          My Vacancies
        </h3>
        {user?.userType === 'client' && (
          <Link href={`/vacancies/create`}>
            <Button
              // onClick={openModal}
              className="bg-brand-red hover:bg-brand-coral"
              size="sm"
            >
              Create New Vacancy
            </Button>
          </Link>
        )}
      </div>
      <div className="space-y-6">
        {user?.userType === 'client' && <ClientVacanciesTable />}
        {user?.userType === 'recruiter' && <RecruiterVacanciesTable />}
      </div>
    </div>
    // </div>
  )
}
