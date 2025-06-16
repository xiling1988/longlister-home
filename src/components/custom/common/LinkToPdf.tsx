import { JOBS_API_URL } from '@/common/constants'
import { PageIcon } from '@/icons'
import Link from 'next/link'
import React from 'react'

function LinkToPdf({ candidateVersionId }: { candidateVersionId: string }) {
  return (
    <Link
      href={`${JOBS_API_URL}/candidate-cvs/${candidateVersionId}.pdf`}
      target="_blank"
      className="flex h-full w-full items-center justify-center rounded-lg transition-colors dark:hover:bg-gray-700"
    >
      <div className="">
        <PageIcon className="h-full text-brand-red mx-auto" />
        <h4 className="text-xs py-1 text-brand-red text-center" >CV</h4>
      </div>
    </Link>
  )
}

export default LinkToPdf
