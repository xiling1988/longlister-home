import React from 'react'

interface HtmlPreviewProps {
  html: string
  className?: string
}

function HtmlPreview({ html, className }: HtmlPreviewProps) {
  return (
    <div className="w-full overflow-y-auto rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
      <div
        className={`prose max-w-none dark:prose-invert ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default HtmlPreview
