'use client'

import type { Metadata } from 'next'
import { EcommerceMetrics } from '@/components/tailAdmin/ecommerce/EcommerceMetrics'
import React, { useEffect, useState } from 'react'
import RecentOrders from '@/components/tailAdmin/ecommerce/RecentOrders'
import { useAuth } from '@/context/auth/auth-context'
import CompleteProfileCTA from '@/components/custom/common/CompleteProfileCTA'
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title:
//     'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
//   description: 'This is Next.js Home for TailAdmin Dashboard Template',
// }

export default function Ecommerce() {
  const [loaded, setLoaded] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setLoaded(true)
    }
  }, [user])

  const router = useRouter()

  useEffect(() => {
    if (user?.isProfileComplete) {
      // Redirect to the vacancies page if the profile is complete
      router.replace('/vacancies')
      return
    }
    router.replace('/vacancies')
  }, [router, user])
  //////////////////////////// WHILE NO DASHBOARD PAGE /////////////////////////////

  // return null // or a loading spinner if you prefer

  //////////////////////////// DASHBOARD PAGE /////////////////////////////

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Welcome to Longlister</h2>
          <p className="text-gray-600">
            Before getting started, please complete your profile to unlock all
            features.
          </p>
        </div>
        {!user?.isProfileComplete && loaded && <CompleteProfileCTA />}
      </div>
    </div>
  )
}
