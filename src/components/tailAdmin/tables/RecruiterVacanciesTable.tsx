import React, { use, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'

import Badge from '../ui/badge/Badge'
import { Job } from '@/common/models'
import { useAuth } from '@/context/auth/auth-context'
import { API_URL } from '@/common/constants'
import Image from 'next/image'
import { getCompanyLogo, getDeadlineLabel } from '@/common/util/helpers'
import {
  getMyVacanciesClient,
  getMyVacanciesRecruiter,
} from '@/app/(dashboard)/(others-pages)/vacancies/actions'
import { RecruiterOnJob } from '@/common/models/recruiter-on-job'

export default function RecruiterVacanciesTable() {
  const [vacancies, setVacancies] = useState<RecruiterOnJob[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  console.log('LOGGING TA JOBS: ', vacancies)

  useEffect(() => {
    const loadVacancies = async () => {
      setError(null)
      setLoading(true)

      try {
        const data = await getMyVacanciesRecruiter()
        setVacancies(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadVacancies()
  }, [])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-7xl overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Company
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Job Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  CV Target
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  CVs Submitted
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Deadline
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Recruiters on Job
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Current Total
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Total Budget
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {vacancies.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="px-5 py-4 text-start sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={getCompanyLogo(job.job?.clientId || '')}
                          unoptimized
                          alt={job?.job?.companyName || 'Company Logo'}
                        />
                      </div>
                      <div>
                        <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                          {job.job?.companyName || 'Unknown Company'}
                        </span>
                        <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                          {job.job?.jobTitle}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.job?.maxCvs}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {
                      job.job?.candidates.filter(
                        (candidate) => candidate.isDisclosed,
                      ).length
                    }
                    / {job.job?.candidates.length}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        job.job?.status === 'ACTIVE'
                          ? 'success'
                          : job.job?.status === 'CLOSED'
                            ? 'error'
                            : 'warning'
                      }
                    >
                      {job.job?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.job?.deadline
                      ? new Date(job.job?.deadline).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )
                      : ''}
                    <div
                      className={
                        getDeadlineLabel(new Date(job.job?.deadline || ''))
                          .className
                      }
                    >
                      {
                        getDeadlineLabel(new Date(job.job?.deadline || ''))
                          .label
                      }
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.job?.recruiters?.length || 0}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.job?.currentTotal} AED
                    <Badge size="sm" color="info" className="ml-2">
                      {Number(
                        Number(
                          (job.job?.currentTotal ?? 0) /
                            (job.job?.totalBudget ?? 1),
                        ).toFixed(2),
                      ) * 100}
                      %
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.job?.totalBudget} AED
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
