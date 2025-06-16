import ClientVacancyDetailPage from '@/components/custom/vacancies/ClientVacancyDetailPage'
import React from 'react'
import { getManageVacancyInfo } from './actions'
import { notFound } from 'next/navigation'
import RecruiterVacancyDetailPage from '@/components/custom/vacancies/RecruiterVacancyDetailPage'

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PageProps) {
  const vacancy = await getManageVacancyInfo(params.id)

  if (!vacancy) return notFound()
  if (vacancy.userType === 'client')
    return <ClientVacancyDetailPage vacancy={vacancy} />

  if (vacancy.userType === 'recruiter')
    return <RecruiterVacancyDetailPage vacancy={vacancy} />
  return
}
