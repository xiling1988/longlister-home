import { Modal } from '@/components/tailAdmin/ui/modal'
import React from 'react'
import FullCandidateProfileViewer from './FullCandidateProfileViewer'
import { FullCandidateCV, LimitedCandidateCV } from '@/common/models'

interface ViewProfileModalProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  cv: FullCandidateCV | LimitedCandidateCV
}
function ViewProfileModal({
  isOpen,
  openModal,
  closeModal,
  cv,
}: ViewProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-h-full max-w-screen overflow-scroll p-5 lg:p-10"
      disableEscape={true}
    >
      <FullCandidateProfileViewer cv={cv} />
    </Modal>
  )
}

export default ViewProfileModal
