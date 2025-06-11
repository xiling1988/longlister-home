'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'

import React, { ChangeEvent, useActionState } from 'react'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Select from '@/components/tailAdmin/form/Select'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { newVacancyRemunerationAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import { FormErrors } from '@/common/util/errors'

interface VacancyRemunerationFormProps {
  onNext: () => void
  onBack?: () => void // Uncomment if you want to handle back navigation
}

const initialState: FormErrors = {}

function VacancyRemunerationForm({
  onNext,
  onBack,
}: VacancyRemunerationFormProps) {
  const { newVacancyData, updateVacancyData } = useNewVacancyContext()
  const [state, formAction] = useActionState(newVacancyRemunerationAction, {
    errors: initialState,
  })

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

  return (
    <form>
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
        value={newVacancyData?.bonusStructure || ''}
        onChange={handleTextAreaChange('bonusStructure')}
        error={!!state.errors?.bonusStructure}
        hint={state.errors?.bonusStructure && state.errors.bonusStructure}
        className="mb-4"
      />
      <Label>Standard Benefits</Label>
      <TextArea
        name="c"
        placeholder="Health insurance, annual leave, etc."
        value={newVacancyData?.standardBenefits || ''}
        onChange={handleTextAreaChange('standardBenefits')}
        error={!!state.errors?.standardBenefits}
        hint={state.errors?.standardBenefits && state.errors.standardBenefits}
        className="mb-4"
      />
      <Label>Standard Benefits</Label>
      <TextArea
        name="standardBenefits"
        placeholder="Health insurance, annual leave, etc."
        className="mb-4"
        value={newVacancyData?.standardBenefits || ''}
        onChange={handleTextAreaChange('standardBenefits')}
        error={!!state.errors?.standardBenefits}
        hint={state.errors?.standardBenefits && state.errors.standardBenefits}
      />
      <Label>Additional Benefits</Label>
      <TextArea
        name="additionalBenefits"
        placeholder="Relocation package, housing allowance, etc."
        value={newVacancyData?.additionalBenefits || ''}
        onChange={handleTextAreaChange('additionalBenefits')}
        error={!!state.errors?.additionalBenefits}
        hint={
          state.errors?.additionalBenefits && state.errors.additionalBenefits
        }
        className="mb-4"
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
      <Label>Training Opportunities</Label>
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

      {/* Training Opportunities */}
      <Label>Training Opportunities</Label>
      <TextArea
        name="careerProgression"
        placeholder="Detail internal mobility, promotion pathways..."
        value={newVacancyData?.careerProgression || ''}
        onChange={handleTextAreaChange('careerProgression')}
        error={!!state.errors?.careerProgression}
        hint={state.errors?.careerProgression && state.errors.careerProgression}
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
    </form>
  )
}

export default VacancyRemunerationForm
