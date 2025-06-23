import ExplorePage from '@/components/custom/pageComponents/ExplorePage'
import { Metadata } from 'next'
import React from 'react'
import { getExploreVacancies } from './actions'

const metadata: Metadata = {
  title: 'Explore Vacancies',
  description: 'Browse and explore job vacancies',
}

export default async function page() {
  const jobs = await getExploreVacancies()
  console.log('jobs from EXPLORE server: ', jobs)
  return <ExplorePage vacancies={jobs} />
}
