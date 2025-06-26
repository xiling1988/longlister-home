import { Modal } from '@/components/tailAdmin/ui/modal'
import HtmlPreview from './HtmlPreview'

interface HtmlPreviewModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  html: string
  className?: string
}

function HtmlPreviewModal({
  html,
  openModal,
  closeModal,
  isOpen,
  className = '',
}: HtmlPreviewModalProps) {
  const handleSave = () => {
    // Handle save logic here
    console.log('Saving changes...')
    closeModal()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-h-4/5 max-w-[584px] overflow-auto p-5 lg:p-10"
    >
      <HtmlPreview html={html} className={className} />
    </Modal>
  )
}

export default HtmlPreviewModal
