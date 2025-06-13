import { PencilIcon } from '@/icons'
import React, { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  children: ReactNode
  onEdit?: () => void
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

function FormSection({ title, children, onEdit }: FormSectionProps) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 hidden items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-500 group-hover:flex hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
      >
        <PencilIcon size={16} />
        Edit
      </button>
      <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h3>
      <div className="space-y-1 text-sm text-gray-700 dark:text-white/80">
        {children}
      </div>
    </div>
  )
}

export default FormSection
