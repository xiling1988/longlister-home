'use client'
import { Job } from '@/common/models'
import { useState } from 'react'
import { Header } from '@/components/salient/Header'
import PublicVacancyDetails from '../vacancies/public/PublicVacancyDetails'

interface PublicVacancyDetailsProps {
  vacancy: Job
}

export default function PublicVacancyDetailsPage({
  vacancy,
}: PublicVacancyDetailsProps) {
  const [selectedTab, setSelectedTab] = useState<
    'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  >('optionOne')
  return (
    <div className="bg-white">
      <Header transparent />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
        <div className="mx-auto max-w-3xl">
          <PublicVacancyDetails
            vacancy={vacancy}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
    </div>
  )
}
