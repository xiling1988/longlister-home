'use client'

import CreateVacancyModal from '@/components/custom/vacancies/CreateVacancyModal'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import BasicTableOne from '@/components/tailAdmin/tables/BasicTableOne'
import Button from '@/components/tailAdmin/ui/button/Button'
import UserAddressCard from '@/components/tailAdmin/user-profile/UserAddressCard'
import UserInfoCard from '@/components/tailAdmin/user-profile/UserInfoCard'
import UserMetaCard from '@/components/tailAdmin/user-profile/UserMetaCard'
import { useModal } from '@/hooks/useModal'
import { Metadata } from 'next'
import React from 'react'
// import { getMyVacanciesClient } from './actions'

// export const metadata: Metadata = {
//   title: 'Next.js Profile | TailAdmin - Next.js Dashboard Template',
//   description:
//     'This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
// }

export default function Candidates() {
  // const vacancies = getMyVacanciesClient()
  // console.log('Vacancies:', vacancies)
  const { isOpen, openModal, closeModal } = useModal()
  return (
    <div>
      {/* <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]"> */}
      <div className="mb-5 flex items-center justify-between lg:mb-7">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
          My Candidates
        </h3>
        <Button
          onClick={openModal}
          className="bg-brand-red hover:bg-brand-coral"
          size="sm"
        >
          Create New Vacancy
        </Button>
        <CreateVacancyModal
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      </div>
      <div className="space-y-6">
        <BasicTableOne />
      </div>
    </div>
    // </div>
  )
}
