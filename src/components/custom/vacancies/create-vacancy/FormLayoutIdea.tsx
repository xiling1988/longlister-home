import {
  PhotoIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {
  CreditCardIcon,
  KeyIcon,
  SquaresPlusIcon,
  UserCircleIcon as UserCircleIconOutline,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import { int } from 'zod/v4'
import { ReactElement } from 'react'

const navigation = [
  { name: 'Account', href: '#', icon: UserCircleIconOutline, current: true },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
  { name: 'Team', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Integrations', href: '#', icon: SquaresPlusIcon, current: false },
]

interface FormLayoutIdeaProps {
  steps: {
    title: string
    component: React.ReactNode
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
  activeStep: number
  setActiveStep: (step: number) => void
}

interface StepItem {
  title: string
  component: ReactElement
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  current: boolean
}

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function FormLayoutIdea({
  steps,
  activeStep,
  setActiveStep,
}: FormLayoutIdeaProps) {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
        <ul className="flex flex-col gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCurrent = index === activeStep

            return (
              <li key={step.title}>
                <button
                  onClick={() => setActiveStep(index)}
                  className={`group menu-item ${
                    isCurrent ? 'menu-item-active' : 'menu-item-inactive'
                  } lg:justify-start`}
                >
                  <span
                    className={`${
                      isCurrent
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive'
                    }`}
                  >
                    {Icon && <Icon />}
                  </span>
                  <span className="truncate">{step.title}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>
      {/* Step Content */}
      <div className="lg:col-span-9">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white px-6 py-8 dark:border-gray-800 dark:bg-white/[0.03]">
          {steps[activeStep]?.component}
        </div>
      </div>
    </div>
  )
}
