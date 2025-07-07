import PublicVacancyDetailsPage from '@/components/custom/pageComponents/PublicVacancyDetailsPage'
import { Metadata } from 'next'
import { type FC } from 'react'
import { fetchPublicVacancyInfo } from './actions'
import { Job } from '@/common/models'

export const metadata: Metadata = {
  title: 'Vacancy Details',
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  try {
    const { id } = await params
    const vacancy: Job = await fetchPublicVacancyInfo(id)

    return <PublicVacancyDetailsPage vacancy={vacancy} />
  } catch (error) {
    return (
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">Vacancy Not Available</h1>
        <p className="text-gray-600">
          {
            'The vacancy you’re looking for does not exist or couldn’t be loaded.'
          }
        </p>
      </div>
    )
  }
}
