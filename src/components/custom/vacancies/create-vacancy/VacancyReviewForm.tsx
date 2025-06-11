'use client'

import Badge from '@/components/tailAdmin/ui/badge/Badge'
import { DollarLineIcon, InfoIcon, CalenderIcon, ListIcon } from '@/icons'

import { PencilIcon } from 'lucide-react'
import { ReactNode } from 'react'

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

function VacancyReviewForm({
  setActiveStep,
}: {
  setActiveStep: (step: number) => void
}) {
  // Placeholder sample data (replace with real context values later)
  const jobTitle = 'Senior Product Designer'
  const nonNegotiables = ['Figma proficiency', 'Remote work']
  const jobDescription =
    '<p>Lead design projects and mentor junior designers...</p>'

  const salaryMin = 18000
  const salaryMax = 22000
  const bonusStructure = 'Quarterly performance bonus'
  const standardBenefits = 'Health insurance, Annual leave'
  const additionalBenefits = 'Relocation assistance'
  const salaryReviewCycle = 'Annually'

  const recruitmentTimeline = 4
  const stages = 3
  const interviewMode = 'Hybrid'
  const decisionProcess = 'Hiring manager reviews finalists'
  const notifyParties = [
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'John Smith', email: 'john@example.com' },
  ]

  const maxCvs = 10
  const deadline = '2025-07-01'
  const totalBudget = 5000
  const cvPriceBudget = 500

  return (
    <div className="space-y-8">
      {/* --- ROLE SECTION --- */}
      <FormSection
        title="Role & Responsibilities"
        icon={InfoIcon}
        onEdit={() => setActiveStep(0)}
      >
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Job Title</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {jobTitle}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Non-Negotiables
            </dt>
            <dd className="flex flex-wrap gap-2 pt-1">
              {nonNegotiables.map((item, idx) => (
                <span
                  key={idx}
                  className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-white"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Job Description
          </h3>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: jobDescription }}
          />
        </div>
      </FormSection>

      {/* --- REMUNERATION SECTION --- */}
      <FormSection
        title="Remuneration & Benefits"
        icon={DollarLineIcon}
        onEdit={() => setActiveStep(1)}
      >
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Min Salary</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              AED {salaryMin}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Max Salary</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              AED {salaryMax}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Bonus Structure
            </dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {bonusStructure}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Salary Review</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {salaryReviewCycle}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Standard Benefits
            </dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {standardBenefits}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Additional Benefits
            </dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {additionalBenefits}
            </dd>
          </div>
        </dl>
      </FormSection>

      {/* --- RECRUITMENT SECTION --- */}
      <FormSection
        title="Recruitment Process"
        icon={CalenderIcon}
        onEdit={() => setActiveStep(2)}
      >
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Recruitment Timeline
            </dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {recruitmentTimeline} weeks
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Stages</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {stages}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Interview Mode
            </dt>
            <dd>
              <Badge color="info">{interviewMode}</Badge>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">
              Decision Process
            </dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {decisionProcess}
            </dd>
          </div>
        </dl>

        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">
            Notification Recipients
          </h3>
          <ul className="space-y-1 text-sm text-gray-800 dark:text-white/90">
            {notifyParties.map((p, i) => (
              <li
                key={i}
                className="flex justify-between border-b py-1 text-sm"
              >
                <span>{p.name}</span>
                <span className="text-gray-500">{p.email}</span>
              </li>
            ))}
          </ul>
        </div>
      </FormSection>

      {/* --- BUDGET SECTION --- */}
      <FormSection
        title="Budget & CV Target"
        icon={ListIcon}
        onEdit={() => setActiveStep(3)}
      >
        <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Target CVs</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {maxCvs}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Deadline</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              {new Date(deadline).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Budget</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              AED {totalBudget || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Budget per CV</dt>
            <dd className="text-base text-gray-900 dark:text-white/90">
              AED {cvPriceBudget || '—'}
            </dd>
          </div>
        </dl>
      </FormSection>
    </div>
  )
}

export default VacancyReviewForm
