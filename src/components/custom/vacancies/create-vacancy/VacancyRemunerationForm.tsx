'use client'

import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'

import React from 'react'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Select from '@/components/tailAdmin/form/Select'
import Button from '@/components/tailAdmin/ui/button/Button'

function VacancyRemunerationForm() {
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
        />

        <Label>Maximum Salary</Label>
        <Input
          name="salaryMax"
          type="number"
          placeholder="e.g. 15000"
          required
        />
      </div>

      {/* Salary Negotiability — commented out for now since it's not in schema */}
      {/*
      <div className="mb-6">
        <Label>Is Salary Negotiable?</Label>
        <Select
          name="salaryNegotiable"
          options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]}
        />
      </div>
      */}

      {/* Bonus Structure */}
      <div className="mb-6">
        <Label>Bonus Structure</Label>
        <TextArea
          name="bonusStructure"
          placeholder="Describe any performance-based bonuses"
        />
      </div>

      {/* Standard Benefits */}
      <div className="mb-6">
        <Label>Standard Benefits (e.g., health insurance, leave)</Label>
        <TextArea
          name="standardBenefits"
          placeholder="Health insurance, annual leave, etc."
        />
      </div>

      {/* Additional Benefits */}
      <div className="mb-6">
        <Label>Additional Benefits (e.g., relocation, housing)</Label>
        <TextArea
          name="additionalBenefits"
          placeholder="Relocation package, housing allowance, etc."
        />
      </div>

      {/* Salary Review Cycle */}
      <div className="mb-6">
        <Label>Salary Review Cycle</Label>
        <Select
          name="salaryReviewCycle"
          options={[
            { value: 'Annually', label: 'Annually' },
            { value: 'Bi-Annually', label: 'Bi-Annually' },
            { value: 'Quarterly', label: 'Quarterly' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(value: string) => {
            // Handle custom logic if needed
            console.log('Selected salary review cycle:', value)
          }}
        />
      </div>

      {/* Training Opportunities */}
      <div className="mb-6">
        <Label>Professional Development & Training</Label>
        <TextArea
          name="trainingOpportunities"
          placeholder="Describe access to training, certifications, etc."
        />
      </div>

      {/* Career Progression */}
      <div className="mb-6">
        <Label>Career Progression</Label>
        <TextArea
          name="careerProgression"
          placeholder="Detail internal mobility, promotion pathways..."
        />
      </div>

      {/* Company Perks */}
      <div className="">
        <Label>Company Perks (e.g., hybrid work, wellness programs)</Label>
        <TextArea
          name="companyPerks"
          placeholder="Hybrid work policy, wellness stipend, etc."
        />
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

export default VacancyRemunerationForm
