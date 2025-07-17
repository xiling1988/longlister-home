'use client'

import { FormEvent, startTransition, useEffect, useState } from 'react'
import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import { companyDetailsAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'
import { useActionState } from 'react'
import { FormErrors } from '@/common/util/errors'
import { StepComponentProps } from '../CompleteProfileFormLayout'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import LogoDropzone from '@/components/custom/forms/LogoDropZone'

const initialState: FormErrors = {}

export default function ClientCompanyDetailsForm({
  activeStep,
  steps,
  setActiveStep,
}: StepComponentProps) {
  const { profileData, updateProfileData } = useProfileCompletionContext()
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [state, formAction] = useActionState(companyDetailsAction, {
    errors: initialState,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProfileData({ [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep(activeStep + 1)
    }
  }, [state, setActiveStep, activeStep])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (logoFile) {
      formData.append('logo', logoFile)
    }

    // ✅ Wrap formAction in startTransition
    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label>Company Name</Label>
          <Input
            name="companyName"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).companyName
            }
            placeholder="e.g. Longlister Inc."
            onChange={handleChange}
            required
            error={!!state.errors?.companyName}
            hint={state.errors?.companyName}
          />
        </div>

        <div>
          <Label>Legal Name (Optional)</Label>
          <Input
            name="legalName"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).legalName
            }
            placeholder="e.g. Longlister Technologies FZ-LLC"
            onChange={handleChange}
            error={!!state.errors?.legalName}
            hint={state.errors?.legalName}
          />
        </div>

        <div>
          <Label>Industry</Label>
          <Input
            name="industry"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).industry
            }
            placeholder="e.g. Recruitment"
            onChange={handleChange}
            required
            error={!!state.errors?.industry}
            hint={state.errors?.industry}
          />
        </div>

        <div>
          <Label>Organization Type</Label>
          <Input
            name="orgType"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).orgType
            }
            placeholder="e.g. Private"
            onChange={handleChange}
            required
            error={!!state.errors?.orgType}
            hint={state.errors?.orgType}
          />
        </div>

        <div>
          <Label>Year Founded (Optional)</Label>
          <Input
            name="yearFounded"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).yearFounded
            }
            placeholder="e.g. 2022"
            onChange={handleChange}
            error={!!state.errors?.yearFounded}
            hint={state.errors?.yearFounded}
          />
        </div>

        <div>
          <Label>Company Size</Label>
          <Input
            name="companySize"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).companySize
            }
            placeholder="e.g. 11-50 employees"
            onChange={handleChange}
            required
            error={!!state.errors?.companySize}
            hint={state.errors?.companySize}
          />
        </div>

        <div>
          <Label>Headquarters</Label>
          <Input
            name="headquarters"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).headquarters
            }
            placeholder="e.g. Dubai, UAE"
            onChange={handleChange}
            required
            error={!!state.errors?.headquarters}
            hint={state.errors?.headquarters}
          />
        </div>
        <div className="col-span-2 h-4 rounded-2xl bg-transparent"></div>
        <div>
          <Label>Website</Label>
          <Input
            name="website"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).website
            }
            placeholder="e.g. https://yourcompany.com"
            onChange={handleChange}
            error={!!state.errors?.website}
            hint={state.errors?.website}
          />
        </div>

        <div>
          <Label>Tagline (Optional)</Label>
          <Input
            name="tagline"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType).tagline
            }
            placeholder="e.g. Talent that delivers"
            onChange={handleChange}
            error={!!state.errors?.tagline}
            hint={state.errors?.tagline}
          />
        </div>
        <div>
          <Label>Primary Contact Name</Label>
          <Input
            name="primaryContactName"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType)
                .primaryContactName
            }
            placeholder="e.g. John Doe"
            onChange={handleChange}
            error={!!state.errors?.primaryContactName}
            hint={state.errors?.primaryContactName}
          />
        </div>
        <div>
          <Label>Primary Contact Position</Label>
          <Input
            name="primaryContactPosition"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType)
                .primaryContactPosition
            }
            placeholder="e.g. HR Manager"
            onChange={handleChange}
            error={!!state.errors?.primaryContactPosition}
            hint={state.errors?.primaryContactPosition}
          />
        </div>
        <div>
          <Label>Primary Contact Phone Number</Label>
          <Input
            name="primaryContactPhone"
            defaultValue={
              (profileData as CompanyProfileInitialValuesType)
                .primaryContactPhone
            }
            placeholder="e.g. HR Manager"
            onChange={handleChange}
            error={!!state.errors?.primaryContactPhone}
            hint={state.errors?.primaryContactPhone}
          />
        </div>
        <div className="col-span-2 h-1 rounded-2xl bg-transparent"></div>
      </div>

      {/* Logo Upload */}
      <div className="mt-6">
        <div className="col-span-2 h-4 rounded-2xl bg-transparent"></div>
        <Label>Company Logo</Label>
        <LogoDropzone
          logoFile={logoFile}
          setLogoFile={(file) => {
            setLogoFile(file)
          }}
          isPending={false}
        />
      </div>

      {/* Hidden input to pass file in form */}
      <input type="hidden" name="logo" />

      <div className="mt-8 flex justify-between px-4">
        <Button
          type="button"
          onClick={() => setActiveStep(activeStep - 1)}
          variant="outline"
          disabled={activeStep === 0}
        >
          Back
        </Button>

        <Button type="submit">
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </form>
  )
}

// Object literal may only specify known properties, and 'logo' does not exist in type 'Partial<{ firstName: string; lastName: string; industry: string; recruitingExperience: string; bio: string; phoneNumber: string; city: string; country: string; cardNumber: string; expiryDate: string; ... 4 more ...; avatar?: string | undefined; }> & Partial<...>'.
