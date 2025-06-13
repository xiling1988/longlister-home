import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import React, { ChangeEvent, useActionState, useEffect } from 'react'
import MultiElementInput from '../../forms/MultiElementInput'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import RichTextEditor from '../../forms/RichTextEditor'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { newVacancyRoleResponsibilitiesAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from './FormLayout'

const initialState: FormErrors = {}

function VacancyRoleResponsibilitiesForm({
  handleInputChange,
  activeStep,
  steps,
  setActiveStep,
  handleTextAreaChange,
  handleSelectChange,
  handleNotififyPartiesChange,
}: StepComponentProps) {
  const { newVacancyData, updateVacancyData } = useNewVacancyContext()
  const [state, formAction] = useActionState(
    newVacancyRoleResponsibilitiesAction,
    { errors: initialState },
  )

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep])

  return (
    <form action={formAction}>
      <div>
        <Label>Job Title</Label>
        <Input
          name="jobTitle"
          type="text"
          placeholder="Enter the role title"
          required
          error={!!state.errors?.jobTitle}
          hint={state.errors?.jobTitle && state.errors?.jobTitle}
          defaultValue={newVacancyData?.jobTitle || ''}
          onChange={handleInputChange}
        />
        <MultiElementInput
          title="Non-Negotiables"
          name="nonNegotiables"
          items={newVacancyData?.nonNegotiables || []}
          placeholder="Enter a responsibility"
          className="my-4"
          updateVacancyData={({
            nonNegotiables,
          }: {
            nonNegotiables: string[]
          }) => {
            updateVacancyData({
              ...newVacancyData,
              nonNegotiables,
              companyType:
                newVacancyData.companyType === 'company' ||
                newVacancyData.companyType === 'agency'
                  ? newVacancyData.companyType
                  : undefined,
            })
          }}
        />
        <RichTextEditor
          title="Job Description"
          className="mt-8 rounded-lg"
          value={newVacancyData?.jobDescription || ''}
          initialValue={newVacancyData?.jobDescription || ''}
          onChange={(html) =>
            updateVacancyData({
              jobDescription: html,
            })
          }
        />
        <input
          type="hidden"
          name="jobDescription"
          value={newVacancyData.companyCulture}
        />
      </div>
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
            type="submit"
            className="hover:bg-primary-dark rounded-lg bg-brand-red px-4 py-2 text-sm font-medium text-white shadow-sm"
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
    </form>
  )
}

export default VacancyRoleResponsibilitiesForm
