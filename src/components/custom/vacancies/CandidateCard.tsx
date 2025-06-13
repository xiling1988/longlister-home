// components/candidates/CandidateCard.tsx
import { Candidate, CandidateProfileVersion } from '@/common/models'
import { ReactNode } from 'react'

interface CandidateCardProps {
  name: string
  summary: string
  status?: string
  actions?: ReactNode
  candidate: CandidateProfileVersion
}

export default function CandidateCard({
  name,
  summary,
  status,
  actions,
  candidate,
}: CandidateCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-700 dark:bg-white/[0.02]">
      <div className="flex justify-between">
        <div>
          <h4 className="text-md font-medium text-gray-800 dark:text-white">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{summary}</p>
        </div>
        {actions && <div className="ml-4">{actions}</div>}
      </div>
      {status && (
        <div className="mt-2 text-xs font-semibold text-blue-500 uppercase">
          {status}
        </div>
      )}
    </div>
  )
}
