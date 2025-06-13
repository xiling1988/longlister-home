import { Job } from '@/common/models'

// components/vacancies/VacancySummaryCard.tsx
interface VacancySummaryCardProps {
  vacancy: Job
}

export default function VacancySummaryCard({
  vacancy,
}: VacancySummaryCardProps) {
  const { jobTitle, deadline, salaryMin, companyName } = vacancy
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-white/[0.02]">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {jobTitle}
      </h3>
      <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {companyName && (
          <div>
            <dt className="font-medium text-gray-600 dark:text-gray-400">
              Company
            </dt>
            <dd className="text-gray-800 dark:text-gray-200">{companyName}</dd>
          </div>
        )}
        {salaryMin && (
          <div>
            <dt className="font-medium text-gray-600 dark:text-gray-400">
              salaryMin
            </dt>
            <dd className="text-gray-800 dark:text-gray-200">{salaryMin}</dd>
          </div>
        )}
        {deadline && (
          <div>
            <dt className="font-medium text-gray-600 dark:text-gray-400">
              Deadline
            </dt>
            <dd className="text-gray-800 dark:text-gray-200">{deadline}</dd>
          </div>
        )}
        {salaryMin && (
          <div>
            <dt className="font-medium text-gray-600 dark:text-gray-400">
              Salary
            </dt>
            <dd className="text-gray-800 dark:text-gray-200">{salaryMin}</dd>
          </div>
        )}
      </dl>
    </div>
  )
}
