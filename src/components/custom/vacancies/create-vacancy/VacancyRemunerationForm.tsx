'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'

import React, { ChangeEvent, useActionState, useEffect } from 'react'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Select from '@/components/tailAdmin/form/Select'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { newVacancyRemunerationAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from './FormLayout'

const initialState: FormErrors = {}

function VacancyRemunerationForm({
  handleInputChange,
  activeStep,
  steps,
  setActiveStep,
  handleTextAreaChange,
  handleSelectChange,
  handleNotififyPartiesChange,
}: StepComponentProps) {
  const { newVacancyData } = useNewVacancyContext()
  const [state, formAction] = useActionState(newVacancyRemunerationAction, {
    errors: initialState,
  })

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep])

  return (
    <form action={formAction}>
      {/* Salary Fields */}
      <div className="mb-6">
        <Label>Minimum Salary</Label>
        <Input
          name="salaryMin"
          type="number"
          placeholder="e.g. 10000"
          required
          className="mb-4"
          defaultValue={newVacancyData?.salaryMin || ''}
          onChange={handleInputChange}
          error={!!newVacancyData?.salaryMin && newVacancyData.salaryMin < 0}
        />

        <Label>Maximum Salary</Label>
        <Input
          name="salaryMax"
          type="number"
          placeholder="e.g. 15000"
          required
          defaultValue={newVacancyData?.salaryMax || ''}
          onChange={handleInputChange}
          error={!!state.errors?.salaryMax}
          hint={state.errors?.salaryMax && state.errors.salaryMax}
        />
      </div>

      <Label>Bonus Structure</Label>
      <TextArea
        name="bonusStructure"
        placeholder="Describe any performance-based bonuses"
        required
        value={newVacancyData?.bonusStructure || ''}
        onChange={handleTextAreaChange('bonusStructure')}
        error={!!state.errors?.bonusStructure}
        hint={state.errors?.bonusStructure && state.errors.bonusStructure}
        className="mb-4"
      />
      <Label>Standard Benefits</Label>
      <TextArea
        name="standardBenefits"
        placeholder="Health insurance, annual leave, etc."
        value={newVacancyData?.standardBenefits || ''}
        onChange={handleTextAreaChange('standardBenefits')}
        error={!!state.errors?.standardBenefits}
        hint={state.errors?.standardBenefits && state.errors.standardBenefits}
        className="mb-4"
      />
      <Label>Additional Benefits</Label>
      <TextArea
        name="standardBenefits"
        placeholder="Health insurance, annual leave, etc."
        className="mb-4"
        value={newVacancyData?.standardBenefits || ''}
        onChange={handleTextAreaChange('additionalBenefits')}
        error={!!state.errors?.standardBenefits}
        hint={state.errors?.standardBenefits && state.errors.standardBenefits}
      />

      {/* Salary Review Cycle */}
      <Label>Salary Review Cycle</Label>
      <Select
        name="salaryReviewCycle"
        options={[
          { value: 'Annually', label: 'Annually' },
          { value: 'Bi-Annually', label: 'Bi-Annually' },
          { value: 'Quarterly', label: 'Quarterly' },
          { value: 'Other', label: 'Other' },
        ]}
        onChange={handleSelectChange('salaryReviewCycle')}
        defaultValue={newVacancyData?.salaryReviewCycle || ''}
        error={!!state.errors?.salaryReviewCycle}
        hint={state.errors?.salaryReviewCycle && state.errors.salaryReviewCycle}
        className="mb-4"
      />
      <Label>Professional Development & Training</Label>
      <TextArea
        name="trainingOpportunities"
        placeholder="Describe access to training, certifications, etc."
        value={newVacancyData?.trainingOpportunities || ''}
        onChange={handleTextAreaChange('trainingOpportunities')}
        error={!!state.errors?.trainingOpportunities}
        hint={
          state.errors?.trainingOpportunities &&
          state.errors.trainingOpportunities
        }
        className="mb-4"
      />
      <Label>Career Progression</Label>
      <TextArea
        name="careerProgression"
        placeholder="Describe access to training, certifications, etc."
        value={newVacancyData?.careerProgression || ''}
        onChange={handleTextAreaChange('trainingOpportunities')}
        error={!!state.errors?.trainingOpportunities}
        hint={
          state.errors?.trainingOpportunities &&
          state.errors.trainingOpportunities
        }
        className="mb-4"
      />

      {/* Company Perks */}

      <Label>Company Perks (e.g., hybrid work, wellness programs)</Label>
      <TextArea
        name="companyPerks"
        value={newVacancyData?.companyPerks || ''}
        onChange={handleTextAreaChange('companyPerks')}
        error={!!state.errors?.companyPerks}
        hint={state.errors?.companyPerks && state.errors.companyPerks}
        placeholder="Hybrid work policy, wellness stipend, etc."
        className="mb-4"
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

export default VacancyRemunerationForm
