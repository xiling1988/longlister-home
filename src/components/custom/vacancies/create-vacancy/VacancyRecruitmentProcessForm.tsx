'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Label from '@/components/tailAdmin/form/Label'
import Select from '@/components/tailAdmin/form/Select'

import React from 'react'
import NotificationRecipients from '../../forms/NotificationRecipients'
import Button from '@/components/tailAdmin/ui/button/Button'

function VacancyRecruitmentProcessForm() {
  return (
    <form>
      {/* Recruitment Timeline */}
      <div className="mb-6">
        <Label>Recruitment Timeline (in days)</Label>
        <Input
          name="recruitmentTimeline"
          type="number"
          placeholder="e.g. 14"
          required
        />
      </div>

      {/* Number of Stages */}
      <div className="mb-6">
        <Label>Number of Stages</Label>
        <Input name="stages" type="number" placeholder="e.g. 3" required />
      </div>

      {/* Assessments */}
      <div className="mb-6">
        <Label>Assessments</Label>
        <TextArea
          name="assessments"
          placeholder="Describe any assessments (e.g. coding test, case study)"
        />
      </div>

      {/* Required Documents */}
      <div className="mb-6">
        <Label>Required Documents</Label>
        <TextArea
          name="requiredDocs"
          placeholder="ID, certificates, portfolio, etc."
        />
      </div>

      {/* Interview Mode */}
      <div className="mb-6">
        <Label>Interview Mode</Label>
        <Select
          name="interviewMode"
          onChange={(value) => console.log(value)}
          required
          options={[
            { value: 'Remote', label: 'Remote' },
            { value: 'In-Person', label: 'In-Person' },
            { value: 'Hybrid', label: 'Hybrid' },
          ]}
        />
      </div>

      {/* Decision Process */}
      <div className="mb-6">
        <Label>Decision-Making Process</Label>
        <TextArea
          name="decisionProcess"
          placeholder="Explain how decisions will be made and communicated"
        />
      </div>

      {/* Notify Parties (recipient list UI TBD) */}
      <div className="mb-6">
        <Label>Email Notification Recipients</Label>
        <NotificationRecipients />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="mt-6 justify-end"
          variant="primary"
          size="sm"
        >
          Save and Continue
        </Button>
      </div>
    </form>
  )
}

export default VacancyRecruitmentProcessForm
