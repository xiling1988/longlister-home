import { DOMAIN_URL } from '@/common/constants'
import Button from '@/components/tailAdmin/ui/button/Button'
import React, { useState } from 'react'

function PublicJobShareButton({ vacancyId }: { vacancyId: string }) {
  const [copied, setCopied] = useState(false)
  const vacancyLink = `${DOMAIN_URL}/public/vacancies/${vacancyId}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(vacancyLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
      // Optional: set some error state
    }
  }
  return (
    <Button
      variant="outline"
      className="bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      onClick={handleCopy}
    >
      {copied ? 'Link copied!' : 'Share with Candidate'}
    </Button>
  )
}

export default PublicJobShareButton
