'use client'

import FormLayoutIdea from '@/components/custom/vacancies/create-vacancy/FormLayoutIdea'
import VacancyRecruitmentProcessForm from '@/components/custom/vacancies/create-vacancy/VacancyRecruitmentProcessForm'
import VacancyRemunerationForm from '@/components/custom/vacancies/create-vacancy/VacancyRemunerationForm'
import VacancyReviewForm from '@/components/custom/vacancies/create-vacancy/VacancyReviewForm'
import VacancyRoleResponsibilitiesForm from '@/components/custom/vacancies/create-vacancy/VacancyRoleResponsibilitiesForm'
import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import { CalenderIcon, DollarLineIcon, InfoIcon, ListIcon } from '@/icons'
import React, { useState } from 'react'

function CreateVacancyPage() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: 'Role & Responsibilities',
      component: <VacancyRoleResponsibilitiesForm />,
      icon: InfoIcon, // Pass the component, not the element
    },
    {
      title: 'Remuneration',
      component: <VacancyRemunerationForm />,
      icon: DollarLineIcon, // Pass the component, not the element
    },
    {
      title: 'Recruitment Process',
      component: <VacancyRecruitmentProcessForm />,
      icon: CalenderIcon, // Pass the component, not the element
    },
    {
      title: 'Review & Submit',
      component: <VacancyReviewForm />,
      icon: ListIcon, // Pass the component, not the element
    },
  ]
  return (
    <div>
      <PageBreadcrumb pageTitle="New Vacancy" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 xl:px-10 xl:py-12 dark:border-gray-800 dark:bg-white/[0.03]">
        <FormLayoutIdea
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
    </div>
  )
}

export default CreateVacancyPage
