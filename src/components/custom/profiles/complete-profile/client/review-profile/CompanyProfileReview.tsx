import FormSection from '@/components/custom/forms/FormSection'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'
import { stripHtml } from '@/common/util/helpers'
import Button from '@/components/tailAdmin/ui/button/Button'
import { useModal } from '@/hooks/useModal'
import { useState } from 'react'
import HtmlPreviewModal from '@/components/custom/common/HtmlPreviewModal'

interface Props {
  profileData: CompanyProfileInitialValuesType
  setActiveStep: (step: number) => void
}

export default function CompanyProfileReview({
  profileData,
  setActiveStep,
}: Props) {
  const { openModal, closeModal, isOpen } = useModal()
  const [modalType, setModalType] = useState<null | 'overview' | 'culture'>(
    null,
  )
  const openOverviewModal = () => setModalType('overview')
  const openCultureModal = () => setModalType('culture')
  const closeModalHandler = () => {
    setModalType(null)
    closeModal()
  }
  return (
    <FormSection title="Profile & Culture" onEdit={() => setActiveStep(1)}>
      <ul className="space-y-2 text-sm text-gray-700">
        <li>
          <Button variant="outline" size="sm" onClick={openOverviewModal}>
            Preview Company Overview
          </Button>
        </li>
        <li>
          <Button variant="outline" size="sm" onClick={openCultureModal}>
            Preview Company Culture
          </Button>
        </li>
      </ul>
      {modalType === 'overview' && (
        <HtmlPreviewModal
          html={stripHtml(profileData.overview || '')}
          openModal={openOverviewModal}
          closeModal={closeModalHandler}
          isOpen
        />
      )}
      {modalType === 'culture' && (
        <HtmlPreviewModal
          html={stripHtml(profileData.companyCultureDescription || '')}
          openModal={openCultureModal}
          closeModal={closeModalHandler}
          isOpen
        />
      )}
    </FormSection>
  )
}
