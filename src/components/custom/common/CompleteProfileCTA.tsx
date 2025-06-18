import Button from '@/components/tailAdmin/ui/button/Button'
import { Bolt, BoltIcon, CloudLightning } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CompleteProfileCTA() {
  return (
    <div className="space-y-6 rounded-xl shadow-xl">
      <div className="w-full rounded-xl border border-gray-200 bg-brand-cream p-5 dark:border-gray-800 dark:bg-[#1E2634]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <BoltIcon className="h-6 w-6 text-brand-red dark:text-yellow-400" />
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-lg font-semibold text-brand-red dark:text-white/90">
                Complete your profile!
              </h3>
              <p className="text-left text-sm text-brand-coral dark:text-gray-400">
                Enjoy improved functionality and enhancements.
              </p>
            </div>
          </div>

          <Link
            href={'/profile/complete-profile'}
            className="flex w-full items-center gap-3 sm:max-w-fit"
          >
            <Button type="button">Update Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CompleteProfileCTA
