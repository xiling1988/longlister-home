import { JOBS_API_URL } from '@/common/constants'
import { getCandidateCV } from '@/common/util/helpers'
import { DocumentIcon } from '@heroicons/react/16/solid'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { DockIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function LinkToPdf({ candidateVersionId }: { candidateVersionId: string }) {
  return (
    <Link
      href={getCandidateCV(candidateVersionId)}
      target="_blank"
      className="flex h-full w-full items-center justify-center rounded-lg transition-colors dark:hover:bg-gray-700"
    >
      <div className="">
        <DocumentArrowDownIcon className="mx-auto h-full text-brand-red" />
        <h4 className="py-1 text-center text-xs text-brand-red">CV</h4>
      </div>
    </Link>
  )
}

export default LinkToPdf
