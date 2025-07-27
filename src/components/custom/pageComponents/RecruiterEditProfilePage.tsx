'use client'

import { User } from '@/common/models'
import RecruiterInfoCard from '@/components/tailAdmin/user-profile/EditRecruiterProfileCard'
import UserAddressCard from '@/components/tailAdmin/user-profile/UserAddressCard'
import React from 'react'
import EditUserAccountCard from '@/components/tailAdmin/user-profile/EditUserAccountCard'
import RecruiterPersonalInfoCard from '@/components/tailAdmin/user-profile/RecruiterPersonalInfoCard'
import EditRecruiterProfileCard from '@/components/tailAdmin/user-profile/EditRecruiterProfileCard'

export interface EditProfilePageProps {
  user: User
}

function RecruiterEditProfilePage({ user }: EditProfilePageProps) {
  return (
    <div className="space-y-6">
      <EditUserAccountCard user={user} />
      <RecruiterPersonalInfoCard user={user} />
      <EditRecruiterProfileCard user={user} />
      {/* <UserAddressCard user={user} /> */}
    </div>
  )
}

export default RecruiterEditProfilePage
