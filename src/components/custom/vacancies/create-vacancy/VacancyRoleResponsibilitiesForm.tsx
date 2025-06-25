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
import Select from '@/components/tailAdmin/form/Select'
import TextArea from '@/components/tailAdmin/form/input/TextArea'

const initialState: FormErrors = {}

function VacancyRoleResponsibilitiesForm({
  handleInputChange,
  activeStep,
  steps,
  handleSelectChange,
  handleTextAreaChange,
  setActiveStep,
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
      <div className="mb-8">
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
          error={!!state.errors?.nonNegotiables}
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
        {state.errors?.nonNegotiables && (
          <p className={`mt-1.5 text-xs text-error-500`}>
            {state.errors?.nonNegotiables}
          </p>
        )}
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
        <div className="flex items-center justify-between gap-4">
          <div className="w-full">
            <Label>Work Mode</Label>
            <Select
              name="workMode"
              options={[
                { value: 'Remote', label: 'Remote' },
                { value: 'On-site', label: 'On-site' },
                { value: 'Hybrid', label: 'Hybrid' },
              ]}
              onChange={handleSelectChange('workMode')}
              defaultValue={newVacancyData?.workMode || ''}
              error={!!state.errors?.workMode}
              hint={state.errors?.workMode && state.errors.workMode}
              className="w-full"
            />
          </div>
          <div className="w-full">
            <Label>Base Location</Label>
            <Input
              name="baseLocation"
              type="text"
              placeholder="City, Country"
              required
              error={!!state.errors?.baseLocation}
              hint={state.errors?.baseLocation && state.errors?.baseLocation}
              defaultValue={newVacancyData?.baseLocation || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <Label>Type of Hire</Label>
            <Select
              name="hireType"
              options={[
                { value: 'Permanent', label: 'Permanent' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Contract', label: 'Contract' },
              ]}
              onChange={handleSelectChange('hireType')}
              defaultValue={newVacancyData?.hireType || ''}
              error={!!state.errors?.hireType}
              hint={state.errors?.hireType && state.errors.hireType}
              className=""
            />
          </div>
        </div>
        {(newVacancyData?.hireType === 'Contract' ||
          newVacancyData?.hireType === 'Part-time') && (
          <>
            <Label className="mt-6">
              {newVacancyData.hireType} hire details
            </Label>
            <TextArea
              name="hireTypeDetails"
              placeholder="Describe working days, hours, and any other relevant details"
              required
              value={newVacancyData?.hireTypeDetails || ''}
              onChange={handleTextAreaChange('hireTypeDetails')}
              error={!!state.errors?.hireTypeDetails}
              hint={
                state.errors?.hireTypeDetails && state.errors.hireTypeDetails
              }
              className="mb-4"
            />
          </>
        )}
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
