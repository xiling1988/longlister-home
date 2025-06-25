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
  // const { user } = useAuth()

  // useEffect(() => {
  //   if (user) {
  //     setLoaded(true)
  //   }
  // }, [user])

  //////////////////////////// WHILE NO DASHBOARD PAGE /////////////////////////////

  const router = useRouter()

  useEffect(() => {
    router.replace('/vacancies')
  }, [router])

  return null // or a loading spinner if you prefer

  // return (
  //   <div className="grid grid-cols-12 gap-4 md:gap-6">
  //     <div className="col-span-12 space-y-6 xl:col-span-12">
  //       <div className="flex flex-col gap-4">
  //         <h2 className="text-xl font-semibold">
  //           Welcome,{' '}
  //           {user?.recruiterProfile?.firstName ||
  //             user?.clientProfile?.companyName}
  //           !
  //         </h2>
  //         <p className="text-gray-600">
  //           Here’s a quick overview of your e-commerce metrics.
  //         </p>
  //       </div>
  //       {!user?.isProfileComplete && loaded && <CompleteProfileCTA />}
  //       <EcommerceMetrics />

  //       {/* <MonthlySalesChart /> */}
  //     </div>
  //     <div className="col-span-12 xl:col-span-5"></div>

  //     <div className="col-span-12 xl:col-span-5">{/* <MonthlyTarget /> */}</div>

  //     <div className="col-span-12">{/* <StatisticsChart /> */}</div>

  //     {/* <div className="col-span-12 xl:col-span-5"> */}
  //     {/* <DemographicCard /> */}
  //     {/* </div> */}

  //     <div className="col-span-12 xl:col-span-7">
  //       <RecentOrders />
  //     </div>
  //   </div>
  // )
}
