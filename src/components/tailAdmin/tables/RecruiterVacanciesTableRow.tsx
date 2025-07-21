import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import Link from 'next/link'
import Image from 'next/image'
import Badge from '../ui/badge/Badge'
import { getCompanyLogo, getDeadlineLabel } from '@/common/util/helpers'
import { EllipsisVertical } from 'lucide-react'
import { Dropdown } from '../ui/dropdown/Dropdown'
import { DropdownItem } from '../ui/dropdown/DropdownItem'
import { Job, User } from '@/common/models'

function RecruiterVacanciesTableRow({
  job,
  user,
  handleDelete,
}: {
  job: Job
  user: User | null
  handleDelete: (id: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  function handleRemove() {
    if (job.id) {
      handleDelete(job.id)
    }
    closeDropdown()
  }

  return (
    <TableRow
      key={job.id}
      className="hover:border-gray-200 hover:bg-gray-50 dark:hover:border-white/[0.05] dark:hover:bg-white/[0.05]"
    >
      <TableCell className="px-1 py-4 text-start sm:pl-6">
        <Link href={`/vacancies/${job.id}`} className="h-full w-full">
          <div className="group flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <Image
                width={100}
                height={100}
                src={getCompanyLogo(job.clientId)}
                unoptimized
                alt={job?.companyName || 'Company Logo'}
                // loading="lazy"
              />
            </div>
            <div>
              <span className="block text-theme-sm font-medium text-gray-800 group-hover:underline dark:text-white/90">
                {job.jobTitle}
              </span>
              <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                {job.companyName || 'Unknown Company'}
              </span>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className="px-1 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
        {job.maxCvs}
      </TableCell>
      <TableCell className="px-1 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
        {job.candidates
          ? `${
              job.candidates?.filter(
                (candidate) => candidate.isDisclosed === true,
              ).length
            } / ${job.candidates?.length}`
          : '0 / 0'}
      </TableCell>
      <TableCell className="px-1 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
        {job.candidates
          ? `${
              job.candidates?.filter(
                (candidate) =>
                  candidate.recruiterId === user?.recruiterProfile?.id &&
                  candidate.isDisclosed === true,
              ).length
            } / ${
              job.candidates?.filter(
                (candidate) =>
                  candidate.recruiterId === user?.recruiterProfile?.id,
              ).length
            }`
          : '0 / 0'}
      </TableCell>
      <TableCell className="px-1 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
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
      <TableCell className="px-1 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
        {job.deadline
          ? new Date(job.deadline).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : ''}
        <div
          className={getDeadlineLabel(new Date(job.deadline || '')).className}
        >
          {getDeadlineLabel(new Date(job.deadline || '')).label}
        </div>
      </TableCell>
      <TableCell className="px-1 py-3 text-center text-theme-sm text-gray-500 dark:text-gray-400">
        {job.recruiters?.length}
      </TableCell>
      <TableCell className="px-1 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
        {Number(Number(job.cvPriceBudget) / 2).toFixed(2)} {job.currency}
      </TableCell>

      <TableCell className="px-1 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
        <button onClick={toggleDropdown} className="dropdown-toggle relative">
          <EllipsisVertical />
        </button>
        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex flex-col gap-1 dark:border-gray-800">
            <li>
              <DropdownItem
                onItemClick={handleRemove}
                tag="a"
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-theme-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                <svg
                  className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                    fill=""
                  />
                </svg>
                Remove
              </DropdownItem>
            </li>
          </ul>
        </Dropdown>
      </TableCell>
    </TableRow>
  )
}

export default RecruiterVacanciesTableRow
