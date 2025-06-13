import { ChangeEvent, ReactElement } from 'react'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import Sliders from '../../forms/Sliders'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { NewVacancyInitialValuesType } from '@/common/zod-schemas/jobs/schemas'
import { Step } from '@/app/(dashboard)/(others-pages)/vacancies/create/page'
import { NotifyParty } from '../../forms/NotificationRecipients'

interface FormLayoutProps {
  steps: {
    title: string
    component: React.ComponentType<StepComponentProps>
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  }[]
  activeStep: number
  setActiveStep: (step: number) => void
  setSuccess?: (success: boolean) => void
}

export interface StepComponentProps {
  newVacancyData: NewVacancyInitialValuesType
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleTextAreaChange: (name: string) => (value: string) => void
  handleSelectChange: (name: string) => (value: string) => void
  handleNotififyPartiesChange: (parties: NotifyParty[]) => void
  steps: Step[]
  activeStep: number
  setActiveStep: (step: number) => void
  setSuccess?: (success: boolean) => void
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

export default function FormLayout({
  steps,
  activeStep,
  setActiveStep,
  setSuccess,
}: FormLayoutProps) {
  const { newVacancyData, updateVacancyData } = useNewVacancyContext()
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateVacancyData({ [event.target.name]: event.target.value })
  }

  const handleTextAreaChange = (name: string) => (value: string) => {
    updateVacancyData({ [name]: value })
  }

  // Reusable select change handler
  const handleSelectChange = (name: string) => (value: string) => {
    if (value) {
      updateVacancyData({ [name]: value })
    }
  }

  const handleNotififyPartiesChange = (parties: any) => {
    updateVacancyData({ notifyParties: parties })
  }

  return (
    <div className="h-[calc(100vh-150px)] lg:grid lg:grid-cols-12 lg:gap-x-5">
      {/* Step Content - Scrollable */}
      <div className="overflow-y-auto pr-2 lg:col-span-9">
        <ComponentCard
          title={steps[activeStep]?.title}
          desc="Vacancy, Recruiter and Candidate Brief Sheet creation form"
        >
          {(() => {
            const StepComponent = steps[activeStep].component
            return (
              <StepComponent
                newVacancyData={newVacancyData}
                handleInputChange={handleInputChange}
                handleTextAreaChange={handleTextAreaChange}
                handleSelectChange={handleSelectChange}
                handleNotififyPartiesChange={handleNotififyPartiesChange}
                setActiveStep={setActiveStep}
                activeStep={activeStep}
                steps={steps}
                setSuccess={setSuccess}
              />
            )
          })()}
        </ComponentCard>
      </div>

      {/* Sidebar - Sticky */}
      <aside className="px-2 py-6 sm:px-6 lg:col-span-3 lg:px-0 lg:py-0">
        <div className="sticky top-6">
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
        </div>
      </aside>
    </div>
  )
}
