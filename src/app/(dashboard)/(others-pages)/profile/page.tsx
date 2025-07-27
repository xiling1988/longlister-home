import { User } from '@/common/models'
import ClientEditProfilePage from '@/components/custom/pageComponents/ClientEditProfilePage'
import RecruiterEditProfilePage from '@/components/custom/pageComponents/RecruiterEditProfilePage'
import RecruiterInfoCard from '@/components/tailAdmin/user-profile/EditRecruiterProfileCard'
import RecruiterMetaCard from '@/components/tailAdmin/user-profile/RecruiterPersonalInfoCard'
import UserAddressCard from '@/components/tailAdmin/user-profile/UserAddressCard'

import getMe from '@/context/auth/get-me'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: 'Edit Profile',
}

export default async function Profile() {
  const user = await getMe({ next: { tags: ['user-profile'] } })
  const userType = await user.userType
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Profile
        </h3>
        <div className="space-y-6">
          {userType === 'recruiter' ? (
            <RecruiterEditProfilePage user={user} />
          ) : userType === 'client' ? (
            <ClientEditProfilePage user={user} />
          ) : (
            notFound()
          )}
        </div>
      </div>
    </div>
  )
}
