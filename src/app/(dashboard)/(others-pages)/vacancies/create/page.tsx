'use client'

import Sliders from '@/components/custom/forms/Sliders'
import FormLayout, {
  StepComponentProps,
} from '@/components/custom/vacancies/create-vacancy/FormLayout'
import SuccessPage from '@/components/custom/vacancies/create-vacancy/Success'
import VacancyRecruitmentProcessForm from '@/components/custom/vacancies/create-vacancy/VacancyRecruitmentProcessForm'
import VacancyRemunerationForm from '@/components/custom/vacancies/create-vacancy/VacancyRemunerationForm'
import VacancyReviewForm from '@/components/custom/vacancies/create-vacancy/VacancyReviewForm'
import VacancyRoleResponsibilitiesForm from '@/components/custom/vacancies/create-vacancy/VacancyRoleResponsibilitiesForm'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { NewVacancyDataProvider } from '@/context/NewVacancyContext'
import { Calendar1Icon, DollarSign, InfoIcon } from 'lucide-react'
import React, { useState } from 'react'
import { set } from 'zod/v4'

export interface Step {
  title: string
  component: React.ComponentType<StepComponentProps>
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function CreateVacancyPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [success, setSuccess] = useState(false)

  const steps = [
    {
      title: 'Role & Responsibilities',
      component: VacancyRoleResponsibilitiesForm,
      icon: InfoIcon,
    },
    {
      title: 'Remuneration',
      component: VacancyRemunerationForm,
      icon: DollarSign,
    },
    {
      title: 'Recruitment Process',
      component: VacancyRecruitmentProcessForm,
      icon: Calendar1Icon,
    },
    {
      title: 'Review & Submit',
      component: VacancyReviewForm,
      icon: Calendar1Icon,
    },
  ]
  return (
    <NewVacancyDataProvider>
      <PageBreadcrumb pageTitle="New Vacancy" />
      {success ? (
        <SuccessPage message="Your vacancy was created successfully!" />
      ) : (
        <>
          <Sliders />
          <h2
            className="my-4 text-xl font-semibold text-gray-800 dark:text-white/90"
            x-text="pageName"
          >
            Vacancy Details
          </h2>
          <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]">
            <FormLayout
              steps={steps}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setSuccess={setSuccess}
            />
          </div>
        </>
      )}
    </NewVacancyDataProvider>
  )
}

export default CreateVacancyPage
