'use client'

import React from 'react'
import { EditProfilePageProps } from './RecruiterEditProfilePage'
import EditUserAccountCard from '@/components/tailAdmin/user-profile/EditUserAccountCard'
import CompanyInfoCard from '@/components/tailAdmin/user-profile/CompanyInfoCard'
import EditCompanyProfileCard from '@/components/tailAdmin/user-profile/EditCompanyProfileCard'
import EditClientPaymentMethodCard from '@/components/tailAdmin/user-profile/EditCompanyPaymentMethodCard'

function ClientEditProfilePage({ user }: EditProfilePageProps) {
  return (
    <div className="space-y-6">
      <EditUserAccountCard user={user} />
      <CompanyInfoCard user={user} />
      <EditCompanyProfileCard user={user} />
      <EditClientPaymentMethodCard user={user} />
      {/* <UserAddressCard user={user} /> */}
    </div>
  )
}

export default ClientEditProfilePage
