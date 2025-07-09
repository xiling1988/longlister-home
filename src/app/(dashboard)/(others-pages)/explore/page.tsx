'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { Job } from '@/common/models'
import ExploreListItem from '@/components/explore/ExploreListItem'
import ExploreVacancyDetails from '@/components/custom/pageComponents/ExploreVacancyDetails'
import { getExploreVacancies } from './actions'

interface ExplorePageProps {
  vacancies?: Job[]
}

export default function ExplorePage() {
  const [vacancies, setVacancies] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedVacancy, setSelectedVacancy] = useState<Job | null>(null)
  const [selectedTab, setSelectedTab] = useState<
    'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  >('optionOne')

  useEffect(() => {
    const loadVacancies = async () => {
      setError(null)
      setLoading(true)

      try {
        const data = await getExploreVacancies()
        setVacancies(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadVacancies()
  }, [])

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
    <Suspense fallback={<div>Loading...</div>}>
      <PageBreadcrumb pageTitle="Recruiter Dashboard - Explore Vacancies" />
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-lg border border-gray-100 shadow-sm dark:border-gray-800">
        {/* LEFT: Vacancy List */}
        <div className="w-full max-w-[400px] overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <ul className="divide-y divide-gray-100 bg-white dark:divide-gray-800">
            {[...vacancies].reverse().map((vacancy) => (
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
    </Suspense>
  )
}

// import ExplorePage from '@/components/custom/pageComponents/ExplorePage'
// import { Metadata } from 'next'
// import React from 'react'
// import { getExploreVacancies } from './actions'

// const metadata: Metadata = {
//   title: 'Explore Vacancies',
//   description: 'Browse and explore job vacancies',
// }

// export default async function page() {
//   const jobs = await getExploreVacancies()
//   console.log('jobs from EXPLORE server: ', jobs)
//   return <ExplorePage vacancies={jobs} />
// }
