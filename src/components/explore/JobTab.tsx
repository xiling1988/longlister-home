import { Html } from 'next/document'
import React from 'react'
import HtmlPreview from '../custom/common/HtmlPreview'

function JobTab({ jobDescription }: { jobDescription?: string }) {
  return (
    <>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-brand-coral dark:text-gray-300">
          Job Description
        </h4>
      </div>
      <HtmlPreview html={jobDescription || ''} />
    </>
  )
}

export default JobTab
