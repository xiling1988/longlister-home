'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ExploreListItem from '../../explore/ExploreListItem'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { Job } from '@/common/models'
import ExploreVacancyDetails from './ExploreVacancyDetails'

interface ExplorePageProps {
  vacancies?: Job[]
}

export default function ExplorePage({ vacancies = [] }: ExplorePageProps) {
  const [selectedVacancy, setSelectedVacancy] = useState<Job | null>(null)
  const [selectedTab, setSelectedTab] = useState<
    'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  >('optionOne')

  const searchParams = useSearchParams()
  const router = useRouter()

  const jobIdFromUrl = searchParams.get('id')

  useEffect(() => {
    if (vacancies.length > 0 && jobIdFromUrl) {
      const found = vacancies.find((v) => v.id === jobIdFromUrl)
      if (found) {
        setSelectedVacancy(found)
      }
    }
  }, [jobIdFromUrl, vacancies])

  const handleSelectVacancy = (vacancy: Job) => {
    setSelectedVacancy(vacancy)
    router.push(`?id=${vacancy.id}`, { scroll: false })
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Explore Vacancies" />
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-lg border border-gray-100 shadow-sm dark:border-gray-800">
        {/* LEFT: Vacancy List */}
        <div className="w-full max-w-[400px] overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <ul className="divide-y divide-gray-100 bg-gray-100 py-1 dark:divide-gray-800">
            {vacancies.map((vacancy) => (
              <ExploreListItem
                vacancy={vacancy}
                selectedVacancy={selectedVacancy}
                setSelectedVacancy={handleSelectVacancy}
                key={vacancy.id}
              />
            ))}
          </ul>
        </div>

        {/* RIGHT: Detail View */}
        <div className="relative flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {/* === Job Details Header === */}
          {selectedVacancy && (
            <ExploreVacancyDetails
              vacancy={selectedVacancy}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          )}
        </div>
      </div>
    </>
  )
}
