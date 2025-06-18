import ClientVacancyDetailPage from '@/components/custom/vacancies/ClientVacancyDetailPage'
import React from 'react'
import { getManageVacancyInfo } from './actions'
import { notFound } from 'next/navigation'
import RecruiterVacancyDetailPage from '@/components/custom/vacancies/RecruiterVacancyDetailPage'
import { Metadata } from 'next'

interface PageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Vacancy Details',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const vacancy = await getManageVacancyInfo(id)

  if (!vacancy) return notFound()
  if (vacancy.userType === 'client')
    return <ClientVacancyDetailPage vacancy={vacancy} />

  if (vacancy.userType === 'recruiter')
    return <RecruiterVacancyDetailPage vacancy={vacancy} />
}
