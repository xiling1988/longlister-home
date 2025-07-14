'use client'

import { ProfileCompletionProvider } from '@/context/ProfileCompletionContext'
import { DollarLineIcon } from '@/icons'
import { CalendarSearchIcon, InfoIcon } from 'lucide-react'
import React, { useState } from 'react'
import VacancyRecruitmentProcessForm from '../vacancies/create-vacancy/VacancyRecruitmentProcessForm'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import SuccessPage from '../vacancies/create-vacancy/Success'
import FormLayout from '../vacancies/create-vacancy/FormLayout'
import { getSteps } from '@/common/util/helpers'
import { useAuth } from '@/context/auth/auth-context'
import CompleteProfileFormLayout from '../profiles/complete-profile/CompleteProfileFormLayout'

function CompleteProfilePage() {
  const { user } = useAuth()
  const userType = user?.userType

  const [activeStep, setActiveStep] = useState(0)
  const [success, setSuccess] = useState(false)

  if (!userType) {
    return null // or a loading indicator, or an error message
  }
  const steps = getSteps(userType) // <-- your dynamic step generator
  return (
    <ProfileCompletionProvider>
      <PageBreadcrumb
        pageTitle={`Complete ${userType === 'client' ? 'Company' : 'Recruiter'} Profile`}
      />
      {success ? (
        <SuccessPage message="Your user profile was completed successfully!" />
      ) : (
        <>
          {/* <h2
            className="my-4 text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            {userType === 'client' ? 'Company' : 'Recruiter'} Details
          </h2> */}
          <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]">
            <CompleteProfileFormLayout
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setSuccess={setSuccess}
            />
          </div>
        </>
      )}
    </ProfileCompletionProvider>
  )
}
export default CompleteProfilePage
