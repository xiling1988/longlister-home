'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ExploreListItem from '../../explore/ExploreListItem'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { Job } from '@/common/models'
import ExploreDetailsHeader from '../../explore/ExploreDetailsHeader'
import ChartTab from '@/components/tailAdmin/common/ChartTab'
import ExploreDetailsTabs from '../../explore/ExploreDetailsTabs'
import JobTab from '../../explore/JobTab'
import CompanyTab from '../../explore/CompanyTab'
import PackageTab from '../../explore/PackageTab'
import ProcessTab from '../../explore/ProcessTab'

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

  const jobPackage = {
    salaryMin: selectedVacancy?.salaryMin || 0,
    salaryMax: selectedVacancy?.salaryMax || 0,
    bonusStructure: selectedVacancy?.bonusStructure || 'N/A',
    salaryReviewCycle: selectedVacancy?.salaryReviewCycle || 'N/A',
    standardBenefits: selectedVacancy?.standardBenefits || 'N/A',
    additionalBenefits: selectedVacancy?.additionalBenefits || 'N/A',
  }
  const jobProcess = {
    recruitmentTimeline: selectedVacancy?.recruitmentTimeline,
    stages: selectedVacancy?.stages,
    interviewMode: selectedVacancy?.interviewMode || 'N/A',
    decisionProcess: selectedVacancy?.decisionProcess || 'N/A',
  }

  return (
    <>
      <PageBreadcrumb pageTitle="Explore Vacancies" />
      <div className="flex h-[calc(100vh-6rem)] overflow-hidden rounded-lg border border-gray-100 shadow-sm dark:border-gray-800">
        {/* LEFT: Vacancy List */}
        <div className="w-full max-w-[400px] overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
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
        <div className="flex-1 overflow-auto bg-white p-6 dark:bg-gray-900">
          {/* === Job Details Header === */}
          {selectedVacancy && (
            <>
              <ExploreDetailsHeader selectedVacancy={selectedVacancy} />
              <ExploreDetailsTabs
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />

              <div className="mt-4 mb-56">
                {selectedTab === 'optionOne' && (
                  <JobTab jobDescription={selectedVacancy.jobDescription} />
                )}
                {selectedTab === 'optionTwo' && (
                  <CompanyTab
                    companyDescription={selectedVacancy.companyDescription}
                    companyCulture={selectedVacancy.companyCulture}
                  />
                )}
                {selectedTab === 'optionThree' && (
                  <PackageTab jobPackage={jobPackage} />
                )}
                {selectedTab === 'optionFour' && (
                  <ProcessTab jobProcess={jobProcess} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
