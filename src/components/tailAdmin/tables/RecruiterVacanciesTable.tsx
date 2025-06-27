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
  removeVacancyFromWorkspace,
} from '@/app/(dashboard)/(others-pages)/vacancies/actions'
import { RecruiterOnJob } from '@/common/models/recruiter-on-job'
import Link from 'next/link'
import { DotSquareIcon, EllipsisVertical } from 'lucide-react'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownItem } from '../ui/dropdown/DropdownItem'
import RecruiterVacanciesTableRow from './RecruiterVacanciesTableRow'

export default function RecruiterVacanciesTable() {
  const [vacancies, setVacancies] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  console.log('LOGGING TA JOBS: ', vacancies)

  useEffect(() => {
    const loadVacancies = async () => {
      setError(null)
      setLoading(true)

      try {
        const data = await getMyVacanciesRecruiter()
        const filteredJobs = data.filter((job: Job) => job.status === 'ACTIVE')
        setVacancies(filteredJobs)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadVacancies()
  }, [])

  const handleDelete = async (id: string) => {
    const res = await removeVacancyFromWorkspace(id)
    if (res.error) {
      setError(res.error)
      return
    }
    setVacancies((prevVacancies) =>
      prevVacancies.filter((vacancy) => vacancy.id !== id),
    )
  }

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
                  className="px-1 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Vacancy
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  CV Target
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Approved / Submitted
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Self Submitted
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-center text-theme-xs font-medium text-gray-500 dark:text-gray-400"
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
                  className="px-1 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Recruiters
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Earnings / CV
                </TableCell>
                <TableCell
                  isHeader
                  className="px-1 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Vacancy Budget
                </TableCell>
                {/* <TableCell
                  isHeader
                  className="px-3 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Actions
                </TableCell> */}
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {vacancies.map((job) => (
                <RecruiterVacanciesTableRow
                  handleDelete={handleDelete}
                  key={job.id}
                  job={job}
                  user={user}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
