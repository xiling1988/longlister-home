'use client'

import Badge from '@/components/tailAdmin/ui/badge/Badge'
import { DollarLineIcon, InfoIcon, CalenderIcon, ListIcon } from '@/icons'

import { PencilIcon } from 'lucide-react'
import {
  ReactNode,
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from 'react'
import { StepComponentProps } from './FormLayout'
import Button from '@/components/tailAdmin/ui/button/Button'
import FormSection from '../../forms/FormSection'
import JobDetailsReview from '../review-vacancy/JobDetailsReview'
import JobRemunerationReview from '../review-vacancy/JobRemunerationReview'
import JobProcessReview from '../review-vacancy/JobProcessReview'
import JobBudgetReview from '../review-vacancy/JobBudgetReview'
import { useModal } from '@/hooks/useModal'
import CreateVacancyModal from '../CreateVacancyModal'
import ConfirmVacancyTerms from '../../forms/modals/ConfirmVacancyTerms'
import { FormErrors } from '@/common/util/errors'
import { newVacancySubmitAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import SuccessPage from './Success'

const initialState: FormErrors = {}
function VacancyReviewForm({
  handleInputChange,
  activeStep,
  steps,
  setActiveStep,
  handleTextAreaChange,
  handleSelectChange,
  handleNotififyPartiesChange,
  newVacancyData,
  setSuccess,
}: StepComponentProps) {
  const { isOpen, openModal, closeModal } = useModal()
  const [state, formAction] = useActionState(
    newVacancySubmitAction.bind(null, newVacancyData),
    {
      errors: initialState,
    },
  )

  const handleSubmit = () => {
    const formData = new FormData()
    Object.entries(newVacancyData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item, idx) => {
          if (typeof item === 'object' && item !== null) {
            Object.entries(item).forEach(([subKey, subValue]) => {
              formData.append(`${key}[${idx}][${subKey}]`, String(subValue))
            })
          } else {
            formData.append(`${key}[${idx}]`, String(item))
          }
        })
      } else if (value !== undefined) {
        formData.append(key, String(value))
      }
    })
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success && !state.errors) {
      setSuccess && setSuccess(true)
    }
  }, [state, setSuccess])

  return (
    <div className="space-y-8">
      <JobDetailsReview
        vacancyData={newVacancyData}
        onEdit={() => setActiveStep(0)}
      />
      <JobRemunerationReview
        vacancyData={newVacancyData}
        onEdit={() => setActiveStep(1)}
      />

      {/* --- RECRUITMENT SECTION --- */}
      <JobProcessReview
        vacancyData={newVacancyData}
        onEdit={() => setActiveStep(2)}
      />

      {/* --- BUDGET SECTION --- */}
      <JobBudgetReview
        vacancyData={newVacancyData}
        onEdit={() => setActiveStep(2)}
      />
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
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
            onClick={openModal}
            // You can call a handleSubmit function here
          >
            Submit
          </button>
        )}
        <ConfirmVacancyTerms
          openModal={openModal}
          closeModal={closeModal}
          isOpen={isOpen}
          handleSubmit={handleSubmit}
          totalBudget={newVacancyData.totalBudget || 0}
        />
      </div>
    </div>
  )
}

export default VacancyReviewForm
