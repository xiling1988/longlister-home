'use client'
import React from 'react'
import { useModal } from '@/hooks/useModal'
import Image from 'next/image'
import { User } from '@/common/models'
import { getRecruiterAvatar } from '@/common/util/helpers'
import defaultProfileImage from '@/images/background-call-to-action.png'
import RecruiterEditAccountModal from '@/components/custom/forms/modals/RecruiterEditPersonalInfoModal'

export default function RecruiterPersonalInfoCard({
  user,
}: {
  user: User | null
}) {
  // If user is not passed, use a default user object
  const { isOpen, openModal, closeModal } = useModal()
  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...')
    closeModal()
  }
  const profile = user?.recruiterProfile
  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
              Personal Details
            </h4>
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-col items-center gap-6 xl:flex-row">
                <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800">
                  <Image
                    width={80}
                    height={80}
                    src={
                      getRecruiterAvatar(
                        user?.recruiterProfile?.avatar || '',
                      ) || defaultProfileImage
                    }
                    alt="user"
                    className={`h-20 object-cover ${!user && 'blur-xs'}`}
                  />
                </div>
                <div>
                  <h4 className="mb-2 flex items-center text-center text-lg font-semibold text-gray-800 xl:text-left dark:text-white/90">
                    {user?.recruiterProfile?.firstName}{' '}
                    {user?.recruiterProfile?.lastName}
                    <a
                      href={profile?.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-2 flex h-7 w-7 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.78381 4.16645C5.78351 4.84504 5.37181 5.45569 4.74286 5.71045C4.11391 5.96521 3.39331 5.81321 2.92083 5.32613C2.44836 4.83904 2.31837 4.11413 2.59216 3.49323C2.86596 2.87233 3.48886 2.47942 4.16715 2.49978C5.06804 2.52682 5.78422 3.26515 5.78381 4.16645ZM5.83381 7.06645H2.50048V17.4998H5.83381V7.06645ZM11.1005 7.06645H7.78381V17.4998H11.0672V12.0248C11.0672 8.97475 15.0422 8.69142 15.0422 12.0248V17.4998H18.3338V10.8914C18.3338 5.74978 12.4505 5.94145 11.0672 8.46642L11.1005 7.06645Z"
                          fill=""
                        />
                      </svg>
                    </a>
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.phoneNumber || '(Phone number)'}
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 xl:block dark:bg-gray-700"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.city}, {profile?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                  fill=""
                />
              </svg>
              Edit
            </button>
          </div>
        </div>
      </div>
      <RecruiterEditAccountModal
        user={user}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </>
  )
}
