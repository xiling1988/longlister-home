import FormSection from '@/components/custom/forms/FormSection'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'

interface Props {
  profileData: CompanyProfileInitialValuesType
  setActiveStep: (step: number) => void
}

export default function CompanyPaymentDetailsReview({
  profileData,
  setActiveStep,
}: Props) {
  return (
    <FormSection title="Payment Details" onEdit={() => setActiveStep(2)}>
      <ul className="hidden text-sm text-gray-700"></ul>
    </FormSection>
  )
}
