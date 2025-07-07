'use client'

import RecruiterInfoCard from '@/components/tailAdmin/user-profile/RecruiterInfoCard'
import RecruiterMetaCard from '@/components/tailAdmin/user-profile/RecruiterMetaCard'
import UserAddressCard from '@/components/tailAdmin/user-profile/UserAddressCard'
import UserInfoCard from '@/components/tailAdmin/user-profile/UserInfoCard'
import UserMetaCard from '@/components/tailAdmin/user-profile/UserMetaCard'
import { useAuth } from '@/context/auth/auth-context'
import { Metadata } from 'next'
import React from 'react'

// export const metadata: Metadata = {
//   title: 'Next.js Profile | TailAdmin - Next.js Dashboard Template',
//   description:
//     'This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
// }

export default function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          Profile
        </h3>
        <div className="space-y-6">
          <RecruiterMetaCard user={user} />
          <RecruiterInfoCard />
          <UserAddressCard />
        </div>
      </div>
    </div>
  )
}
