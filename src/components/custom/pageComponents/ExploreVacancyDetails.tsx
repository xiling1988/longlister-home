import { Job } from '@/common/models'
import CompanyTab from '@/components/explore/CompanyTab'
import ExploreDetailsHeader from '@/components/explore/ExploreDetailsHeader'
import ExploreDetailsTabs from '@/components/explore/ExploreDetailsTabs'
import JobTab from '@/components/explore/JobTab'
import PackageTab from '@/components/explore/PackageTab'
import ProcessTab from '@/components/explore/ProcessTab'
import React from 'react'

interface ExploreVacancyDetailsProps {
  vacancy: Job
  selectedTab: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour'
  setSelectedTab: (
    tab: 'optionOne' | 'optionTwo' | 'optionThree' | 'optionFour',
  ) => void
}

function ExploreVacancyDetails({
  vacancy,
  selectedTab,
  setSelectedTab,
}: ExploreVacancyDetailsProps) {
  const jobPackage = {
    salaryMin: vacancy.salaryMin || 0,
    salaryMax: vacancy.salaryMax || 0,
    bonusStructure: vacancy.bonusStructure || 'N/A',
    salaryReviewCycle: vacancy.salaryReviewCycle || 'N/A',
    standardBenefits: vacancy.standardBenefits || 'N/A',
    additionalBenefits: vacancy.additionalBenefits || 'N/A',
  }
  const jobProcess = {
    recruitmentTimeline: vacancy.recruitmentTimeline,
    stages: vacancy.stages,
    interviewMode: vacancy.interviewMode || 'N/A',
    decisionProcess: vacancy.decisionProcess || 'N/A',
  }
  return (
    <>
      <ExploreDetailsHeader selectedVacancy={vacancy} />
      <ExploreDetailsTabs
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      <div className="mt-4 mb-56 px-6">
        {selectedTab === 'optionOne' && (
          <JobTab jobDescription={vacancy.jobDescription} />
        )}
        {selectedTab === 'optionTwo' && (
          <CompanyTab
            companyDescription={vacancy.companyDescription}
            companyCulture={vacancy.companyCulture}
          />
        )}
        {selectedTab === 'optionThree' && (
          <PackageTab jobPackage={jobPackage} />
        )}
        {selectedTab === 'optionFour' && <ProcessTab jobProcess={jobProcess} />}
      </div>
    </>
  )
}

export default ExploreVacancyDetails
