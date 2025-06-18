// CompanyDetailsReview.tsx

import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import FormSection from '@/components/custom/forms/FormSection'

interface Props {
  profileData: CompanyProfileInitialValuesType
  setActiveStep: (step: number) => void
}

export default function CompanyDetailsReview({
  profileData,
  setActiveStep,
}: Props) {
  return (
    <FormSection title="Company Info" onEdit={() => setActiveStep(0)}>
      <ul className="text-sm text-gray-700">
        <li>
          <strong>Name:</strong> {profileData.companyName}
        </li>
        <li>
          <strong>Tagline:</strong> {profileData.tagline}
        </li>
        <li>
          <strong>Industry:</strong> {profileData.industry}
        </li>
        <li>
          <strong>Size:</strong> {profileData.companySize}
        </li>
        <li>
          <strong>Headquarters:</strong> {profileData.headquarters}
        </li>
        <li>
          <strong>Website:</strong> {profileData.website}
        </li>
        <li>
          <strong>Founded:</strong> {profileData.yearFounded}
        </li>
        <li>
          <strong>Primary Contact:</strong> {profileData.primaryContactName}
        </li>
        {/* <li>
          <strong>Email:</strong> {profileData.pri}
        </li> */}
      </ul>
    </FormSection>
  )
}
