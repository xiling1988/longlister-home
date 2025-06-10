import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import Badge from '@/components/tailAdmin/ui/badge/Badge'
import { PlusCircleIcon } from '@heroicons/react/20/solid'

import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Next.js Badge | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js Badge page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template',
  // other metadata
}

export default function BadgePage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Badges" />
      <div className="space-y-5 sm:space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              With Light Background
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Light Variant */}
              <Badge variant="light" color="primary">
                Primary
              </Badge>
              <Badge variant="light" color="success">
                Success
              </Badge>{' '}
              <Badge variant="light" color="error">
                Error
              </Badge>{' '}
              <Badge variant="light" color="warning">
                Warning
              </Badge>{' '}
              <Badge variant="light" color="info">
                Info
              </Badge>
              <Badge variant="light" color="light">
                Light
              </Badge>
              <Badge variant="light" color="dark">
                Dark
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              With Solid Background
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              {/* Light Variant */}
              <Badge variant="solid" color="primary">
                Primary
              </Badge>
              <Badge variant="solid" color="success">
                Success
              </Badge>{' '}
              <Badge variant="solid" color="error">
                Error
              </Badge>{' '}
              <Badge variant="solid" color="warning">
                Warning
              </Badge>{' '}
              <Badge variant="solid" color="info">
                Info
              </Badge>
              <Badge variant="solid" color="light">
                Light
              </Badge>
              <Badge variant="solid" color="dark">
                Dark
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Light Background with Left Icon
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge
                variant="light"
                color="primary"
                startIcon={<PlusCircleIcon />}
              >
                Primary
              </Badge>
              <Badge
                variant="light"
                color="success"
                startIcon={<PlusCircleIcon />}
              >
                Success
              </Badge>{' '}
              <Badge
                variant="light"
                color="error"
                startIcon={<PlusCircleIcon />}
              >
                Error
              </Badge>{' '}
              <Badge
                variant="light"
                color="warning"
                startIcon={<PlusCircleIcon />}
              >
                Warning
              </Badge>{' '}
              <Badge
                variant="light"
                color="info"
                startIcon={<PlusCircleIcon />}
              >
                Info
              </Badge>
              <Badge
                variant="light"
                color="light"
                startIcon={<PlusCircleIcon />}
              >
                Light
              </Badge>
              <Badge
                variant="light"
                color="dark"
                startIcon={<PlusCircleIcon />}
              >
                Dark
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Solid Background with Left Icon
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge
                variant="solid"
                color="primary"
                startIcon={<PlusCircleIcon />}
              >
                Primary
              </Badge>
              <Badge
                variant="solid"
                color="success"
                startIcon={<PlusCircleIcon />}
              >
                Success
              </Badge>{' '}
              <Badge
                variant="solid"
                color="error"
                startIcon={<PlusCircleIcon />}
              >
                Error
              </Badge>{' '}
              <Badge
                variant="solid"
                color="warning"
                startIcon={<PlusCircleIcon />}
              >
                Warning
              </Badge>{' '}
              <Badge
                variant="solid"
                color="info"
                startIcon={<PlusCircleIcon />}
              >
                Info
              </Badge>
              <Badge
                variant="solid"
                color="light"
                startIcon={<PlusCircleIcon />}
              >
                Light
              </Badge>
              <Badge
                variant="solid"
                color="dark"
                startIcon={<PlusCircleIcon />}
              >
                Dark
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Light Background with Right Icon
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge
                variant="light"
                color="primary"
                endIcon={<PlusCircleIcon />}
              >
                Primary
              </Badge>
              <Badge
                variant="light"
                color="success"
                endIcon={<PlusCircleIcon />}
              >
                Success
              </Badge>{' '}
              <Badge variant="light" color="error" endIcon={<PlusCircleIcon />}>
                Error
              </Badge>{' '}
              <Badge
                variant="light"
                color="warning"
                endIcon={<PlusCircleIcon />}
              >
                Warning
              </Badge>{' '}
              <Badge variant="light" color="info" endIcon={<PlusCircleIcon />}>
                Info
              </Badge>
              <Badge variant="light" color="light" endIcon={<PlusCircleIcon />}>
                Light
              </Badge>
              <Badge variant="light" color="dark" endIcon={<PlusCircleIcon />}>
                Dark
              </Badge>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="px-6 py-5">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              Solid Background with Right Icon
            </h3>
          </div>
          <div className="border-t border-gray-100 p-6 xl:p-10 dark:border-gray-800">
            <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
              <Badge
                variant="solid"
                color="primary"
                endIcon={<PlusCircleIcon />}
              >
                Primary
              </Badge>
              <Badge
                variant="solid"
                color="success"
                endIcon={<PlusCircleIcon />}
              >
                Success
              </Badge>{' '}
              <Badge variant="solid" color="error" endIcon={<PlusCircleIcon />}>
                Error
              </Badge>{' '}
              <Badge
                variant="solid"
                color="warning"
                endIcon={<PlusCircleIcon />}
              >
                Warning
              </Badge>{' '}
              <Badge variant="solid" color="info" endIcon={<PlusCircleIcon />}>
                Info
              </Badge>
              <Badge variant="solid" color="light" endIcon={<PlusCircleIcon />}>
                Light
              </Badge>
              <Badge variant="solid" color="dark" endIcon={<PlusCircleIcon />}>
                Dark
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
