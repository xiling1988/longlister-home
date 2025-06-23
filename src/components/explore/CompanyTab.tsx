import React from 'react'
import HtmlPreview from '../custom/common/HtmlPreview'

function CompanyTab({
  companyDescription,
  companyCulture,
}: {
  companyDescription?: string
  companyCulture?: string
}) {
  return (
    <>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-brand-coral dark:text-gray-300">
          Company Overview
        </h4>
      </div>
      <HtmlPreview html={companyDescription || ''} />
      <div className="my-4">
        <h4 className="text-lg font-semibold text-brand-coral dark:text-gray-300">
          Company Culture
        </h4>
      </div>
      <HtmlPreview html={companyCulture || ''} />
    </>
  )
}

export default CompanyTab
