import UserTerms from '@/components/custom/pageComponents/UserTerms'
import { Metadata } from 'next'
import React from 'react'

const metaData: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Longlister, a platform connecting recruiters and job seekers.',
}

function page() {
  return <UserTerms />
}

export default page
