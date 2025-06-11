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
  const [vacancies, setVacancies] = useState<Job[]>([])
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
                  className="px-3 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Company
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  CV Target
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Approved / Submitted
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Self Submitted
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Deadline
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Recruiters
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Earnings / CV
                </TableCell>
                <TableCell
                  isHeader
                  className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Current Earnings
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {vacancies.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/[0.05] dark:hover:bg-white/[0.05]"
                >
                  <TableCell className="px-3 py-4 text-start sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          width={100}
                          height={100}
                          src={getCompanyLogo(job.clientId || '')}
                          unoptimized
                          alt={job?.companyName || 'Company Logo'}
                          // loading="lazy"
                        />
                      </div>
                      <div>
                        <span className="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                          {job.jobTitle}
                        </span>
                        <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                          {job.companyName || 'Unknown Company'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.maxCvs}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.candidates
                      ? `${
                          job.candidates?.filter(
                            (candidate) => candidate.isDisclosed === true,
                          ).length
                        } / ${job.candidates?.length}`
                      : '0 / 0'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.candidates
                      ? `${
                          job.candidates?.filter(
                            (candidate) =>
                              candidate.recruiterId ===
                                user?.recruiterProfile?.id &&
                              candidate.isDisclosed === true,
                          ).length
                        } / ${
                          job.candidates?.filter(
                            (candidate) =>
                              candidate.recruiterId ===
                              user?.recruiterProfile?.id,
                          ).length
                        }`
                      : '0 / 0'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        job.status === 'ACTIVE'
                          ? 'success'
                          : job.status === 'CLOSED'
                            ? 'error'
                            : 'warning'
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                    <div
                      className={
                        getDeadlineLabel(new Date(job.deadline || '')).className
                      }
                    >
                      {getDeadlineLabel(new Date(job.deadline || '')).label}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.recruiters?.length}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.cvPriceBudget} AED
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.totalBudget} AED
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
