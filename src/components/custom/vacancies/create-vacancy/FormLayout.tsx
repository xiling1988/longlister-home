import { ReactElement } from 'react'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import Sliders from '../../forms/Sliders'
import Button from '@/components/tailAdmin/ui/button/Button'

interface FormLayoutProps {
  steps: {
    title: string
    component: React.ComponentType<{
      onNext: () => void
      onBack: () => void
      setActiveStep: (step: number) => void
    }>
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

export default function FormLayout({
  steps,
  activeStep,
  setActiveStep,
}: FormLayoutProps) {
  const onNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const onBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
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
                onNext={() => setActiveStep(activeStep + 1)}
                onBack={() => setActiveStep(activeStep - 1)}
                setActiveStep={setActiveStep}
              />
            )
          })()}
        </ComponentCard>
        <div className="mt-6 flex justify-between px-4">
          <Button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            variant="outline"
            onClick={() => setActiveStep(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Back
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              type="button"
              className="hover:bg-primary-dark rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm"
              onClick={() => setActiveStep(activeStep + 1)}
            >
              Next
            </Button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              // You can call a handleSubmit function here
            >
              Submit
            </button>
          )}
        </div>
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
