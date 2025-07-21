'use client'

import { deleteCandidateProfileVersion } from '@/app/(dashboard)/(others-pages)/candidates/actions'
import { getCandidateCV, getCompanyLogo } from '@/common/util/helpers'
import Alert from '@/components/tailAdmin/ui/alert/Alert'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/tailAdmin/ui/table'
import { File, Info, Sheet, SheetIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Tooltip from '../common/Tooltip'

export interface CandidatesPageProps {
  myCandidates: any[] // Adjust type as necessary
}

function RecruiterCandidatesPage({ myCandidates }: CandidatesPageProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [candidates, setCandidates] = useState(myCandidates || [])

  const handleDelete = async (
    candidateId: string,
    profileVersionId: string,
  ) => {
    const res = await deleteCandidateProfileVersion(
      candidateId,
      profileVersionId,
    )
    if (res.error) {
      setError(res.error)
      return
    }
    setCandidates((prevCandidates) =>
      prevCandidates.filter((candidate) => candidate.id !== profileVersionId),
    )
  }

  useEffect(() => {
    if (myCandidates) {
      setLoading(false)
    }
  }, [myCandidates])

  console.log('CANDIDATES: ', candidates)

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <p>{error}</p>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Submitted to:
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  CV
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Profile Disclosure
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Candidate Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Email
                </TableCell>
                {/* <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Full Profile
                </TableCell> */}

                <TableCell
                  isHeader
                  className="px-5 py-3 text-start text-xs font-medium text-gray-500"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell className="py-6 text-center">
                    {/* <Spinner /> */} <p>loading</p>
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell className="py-6 text-center">
                    <Alert variant="error" title="Error" message={error} />
                  </TableCell>
                </TableRow>
              ) : candidates.length === 0 ? (
                <TableRow>
                  <TableCell className="py-6 text-center text-gray-500">
                    No candidates found.
                  </TableCell>
                </TableRow>
              ) : (
                candidates.map((candidate) => {
                  const { id, clientId, companyName, jobTitle } =
                    candidate.jobs[0]?.job
                  return (
                    <TableRow key={candidate.id}>
                      <TableCell className="px-5 py-4 text-start">
                        <Link
                          href={`/vacancies/${id}`}
                          className="h-full w-full"
                        >
                          <div className="group flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full object-cover">
                              <Image
                                width={100}
                                height={100}
                                src={getCompanyLogo(clientId)}
                                unoptimized
                                alt={companyName || 'Company Logo'}
                                // loading="lazy"
                              />
                            </div>
                            <div>
                              <span className="block text-theme-sm font-medium text-gray-800 group-hover:underline dark:text-white/90">
                                {jobTitle}
                              </span>
                              <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                                {companyName || 'Unknown Company'}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start">
                        <Link
                          href={getCandidateCV(candidate.id)}
                          target="_blank"
                        >
                          <File className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                        </Link>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                        <div>
                          <dt className="sr-only">Disclosure</dt>
                          <dd
                            className={`rounded-md px-2 py-1 text-center text-xs font-medium ring-1 ring-inset ${
                              candidate.jobs[0]?.isDisclosed
                                ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}
                          >
                            {candidate.jobs[0]?.isDisclosed
                              ? 'Disclosed'
                              : 'Undisclosed'}
                          </dd>
                        </div>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-800 dark:text-white">
                        {candidate.details.personal.full_name}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-start text-sm text-gray-800 dark:text-white">
                        {candidate.details.personal.email}
                      </TableCell>
                      {/* <TableCell className="px-5 py-4 text-start text-sm text-gray-700 dark:text-gray-300">
                        View Profile
                      </TableCell> */}

                      <TableCell className="px-5 py-4 text-start">
                        {candidate.jobs.length === 0 ||
                        candidate.jobs[0]?.isDisclosed === false ? (
                          <button
                            onClick={() =>
                              handleDelete(candidate.candidateId, candidate.id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="h-5 w-5 text-brand-coral" />
                          </button>
                        ) : candidate.jobs[0]?.isDisclosed === true ? (
                          <Tooltip
                            position="left"
                            icon={
                              <Info className="h-8 w-auto text-brand-coral" />
                            }
                          >
                            You can&apos;t delete a candidate that has already
                            been disclosed by the client.
                          </Tooltip>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default RecruiterCandidatesPage
