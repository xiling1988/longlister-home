import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import React, { useActionState } from 'react'
import MultiElementInput from '../../forms/MultiElementInput'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import RichTextEditor from '../../forms/RichTextEditor'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { newVacancyRoleResponsibilitiesAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import { FormErrors } from '@/common/util/errors'

interface VacancyRoleResponsibilitiesFormProps {
  onNext: () => void
}

const initialState: FormErrors = {}

function VacancyRoleResponsibilitiesForm({
  onNext,
}: VacancyRoleResponsibilitiesFormProps) {
  const { newVacancyData, updateVacancyData } = useNewVacancyContext()
  const [state, formAction] = useActionState(
    newVacancyRoleResponsibilitiesAction,
    { errors: initialState },
  )
  return (
    <form>
      <div>
        <Label>Job Title</Label>
        <Input
          name="jobTitle"
          type="text"
          placeholder="Enter the role title"
          required
          className="mb-4"
          error={!!state.errors?.jobTitle}
          hint={state.errors?.jobTitle && state.errors?.jobTitle}
          defaultValue={newVacancyData?.jobTitle || ''}
        />
        <MultiElementInput
          title="Non-Negotiables"
          name="nonNegotiables"
          items={newVacancyData?.nonNegotiables || []}
          placeholder="Enter a responsibility"
          className="mb-4"
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
          placeholder=""
          value={`<h3>Who we are</h3><p>Introduce your company...</p><br>
  <h3>What we do</h3><p>Describe your products/services...</p><br>
  <h3>Our mission</h3><p>State your company's mission...</p><br>
  <h3>Our vision</h3><p>Describe your long-term goals...</p><br></br>`}
        />
      </div>
    </form>
  )
}

export default VacancyRoleResponsibilitiesForm
