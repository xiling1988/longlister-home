'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Label from '@/components/tailAdmin/form/Label'
import Select from '@/components/tailAdmin/form/Select'

import React, { ChangeEvent, useActionState, useEffect } from 'react'
import NotificationRecipients from '../../forms/NotificationRecipients'
import { useNewVacancyContext } from '@/context/NewVacancyContext'
import { newVacancyRecruitmentProcessAction } from '@/app/(dashboard)/(others-pages)/vacancies/create/actions'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from './FormLayout'
import Button from '@/components/tailAdmin/ui/button/Button'

const initialState: FormErrors = {}
function VacancyRecruitmentProcessForm({
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
    newVacancyRecruitmentProcessAction,
    { errors: initialState },
  )

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep, activeStep])

  return (
    <form action={formAction}>
      {/* Recruitment Timeline */}
      <div className="mb-6">
        <Label>Recruitment Timeline (weeks)</Label>
        <Input
          name="recruitmentTimeline"
          type="number"
          placeholder="e.g. 14"
          required
          onChange={handleInputChange}
          defaultValue={newVacancyData?.recruitmentTimeline || ''}
          error={!!state.errors?.recruitmentTimeline}
          hint={
            state.errors?.recruitmentTimeline &&
            state.errors.recruitmentTimeline
          }
        />
      </div>

      {/* Number of Stages */}
      <div className="mb-6">
        <Label>Number of Interviews</Label>
        <Input
          name="stages"
          type="number"
          placeholder="e.g. 3"
          required
          onChange={handleInputChange}
          defaultValue={newVacancyData?.stages || ''}
          error={!!state.errors?.stages}
          hint={state.errors?.stages && state.errors.stages}
        />
      </div>

      {/* Assessments */}
      <div className="mb-6">
        <Label>Assessments</Label>
        <TextArea
          name="assessments"
          placeholder="Describe any assessments (e.g. coding test, case study)"
          value={newVacancyData?.assessments || ''}
          onChange={handleTextAreaChange('assessments')}
          error={!!state.errors?.assessments}
          hint={state.errors?.assessments && state.errors.assessments}
        />
      </div>

      {/* Required Documents */}
      <div className="mb-6">
        <Label>Required Documents</Label>
        <TextArea
          name="requiredDocs"
          placeholder="ID, certificates, portfolio, etc."
          value={newVacancyData?.requiredDocs || ''}
          onChange={handleTextAreaChange('requiredDocs')}
          error={!!state.errors?.requiredDocs}
          hint={state.errors?.requiredDocs && state.errors.requiredDocs}
        />
      </div>

      {/* Interview Mode */}
      <div className="mb-6">
        <Label>Interview Mode</Label>

        <Select
          name="interviewMode"
          options={[
            { value: 'In Person', label: 'In Person' },
            { value: 'Online', label: 'Online' },
            { value: 'Phone', label: 'Phone' },
          ]}
          onChange={handleSelectChange('interviewMode')}
          defaultValue={newVacancyData?.interviewMode || ''}
          error={!!state.errors?.interviewMode}
          hint={state.errors?.interviewMode && state.errors.interviewMode}
          className="mb-4"
        />
      </div>

      {/* Decision Process */}
      <div className="mb-6">
        <Label>Decision-Making Process</Label>
        <TextArea
          name="decisionProcess"
          placeholder="Explain how decisions will be made and communicated"
          value={newVacancyData?.decisionProcess || ''}
          onChange={handleTextAreaChange('decisionProcess')}
          error={!!state.errors?.decisionProcess}
          hint={state.errors?.decisionProcess && state.errors.decisionProcess}
        />
      </div>

      {/* Notify Parties (recipient list UI TBD) */}
      <div className="mb-6">
        <Label>Email Notification Recipients</Label>
        <NotificationRecipients
          onChange={handleNotififyPartiesChange}
          parties={newVacancyData.notifyParties}
        />
        <input
          type="hidden"
          name="notifyParties"
          value={JSON.stringify(newVacancyData.notifyParties)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateVacancyData({
              notifyParties: JSON.parse(e.target.value),
            })
          }
          className="hidden"
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

export default VacancyRecruitmentProcessForm
