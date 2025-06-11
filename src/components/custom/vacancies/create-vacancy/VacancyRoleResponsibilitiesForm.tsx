import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import React from 'react'
import MultiElementInput from '../../forms/MultiElementInput'
import ComponentCard from '@/components/tailAdmin/common/ComponentCard'
import RichTextEditor from '../../forms/RichTextEditor'
import Button from '@/components/tailAdmin/ui/button/Button'

function VacancyRoleResponsibilitiesForm() {
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
        />
        <MultiElementInput
          title="Non-Negotiables"
          name="nonNegotiables"
          placeholder="Enter a responsibility"
          className="mb-4"
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

export default VacancyRoleResponsibilitiesForm
