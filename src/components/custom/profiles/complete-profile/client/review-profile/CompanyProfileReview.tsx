import FormSection from '@/components/custom/forms/FormSection'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import { stripHtml } from '@/common/util/helpers'

interface Props {
  profileData: CompanyProfileInitialValuesType
  setActiveStep: (step: number) => void
}

export default function CompanyProfileReview({
  profileData,
  setActiveStep,
}: Props) {
  return (
    <FormSection title="Profile & Culture" onEdit={() => setActiveStep(1)}>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <strong>Overview:</strong>
          <p className="mt-1 text-gray-600">
            {stripHtml(profileData.overview || '')}
          </p>
        </li>
        <li>
          <strong>Culture:</strong>
          <p className="mt-1 text-gray-600">
            {stripHtml(profileData.companyCultureDescription || '')}
          </p>
        </li>
      </ul>
    </FormSection>
  )
}
