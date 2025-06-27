import { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export default function SectionHeading({
  title,
  description,
  actions,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col justify-between gap-2 sm:flex-row sm:items-center ${className}`}
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  )
}
