import React, { use, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'

import Badge from '../ui/badge/Badge'
import { Job } from '@/common/models'
import { useAuth } from '@/context/auth/auth-context'
import { getDeadlineLabel } from '@/common/util/helpers'
import { getMyVacanciesClient } from '@/app/(dashboard)/(others-pages)/vacancies/actions'
import Link from 'next/link'

interface ClientVacanciesTableProps {
  vacancies: Job[]
}

export default function ClientVacanciesTable() {
  const [vacancies, setVacancies] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  console.log('VACANCIES!!', vacancies)
  useEffect(() => {
    const loadVacancies = async () => {
      setError(null)
      setLoading(true)

      try {
        const data = await getMyVacanciesClient()
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
                <TableRow
                  key={job.id}
                  className="group hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/[0.05] dark:hover:bg-white/[0.05]"
                >
                  <TableCell className="px-5 py-4 text-start sm:px-6">
                    <Link
                      href={`/vacancies/${job.id}`}
                      className="h-full w-full"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block text-theme-sm font-medium text-gray-800 group-hover:underline dark:text-white/90">
                            {job.jobTitle}
                          </span>
                          <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                            AED {job.salaryMin} - {job.salaryMax}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.maxCvs}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
                    {
                      job.candidates.filter(
                        (candidate) => candidate.isDisclosed,
                      ).length
                    }{' '}
                    / {job.candidates.length}
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
                    {job.recruiters?.length || 0}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {job.currentTotal} AED
                    <Badge size="sm" color="info" className="ml-2">
                      {Number(
                        Number(job.currentTotal / job.totalBudget).toFixed(2),
                      ) * 100}
                      %
                    </Badge>
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
