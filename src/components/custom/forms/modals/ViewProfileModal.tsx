import { Modal } from '@/components/tailAdmin/ui/modal'
import React from 'react'
import FullCandidateProfileViewer from './FullCandidateProfileViewer'
import {
  CandidateProfileVersion,
  FullCandidateCV,
  Job,
  LimitedCandidateCV,
} from '@/common/models'

interface ViewProfileModalProps {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  isDisclosed: boolean
  cv: FullCandidateCV | LimitedCandidateCV
  disableEscape?: boolean
  vacancy: Job
  candidate: CandidateProfileVersion
  candidateOnJobId: string
}
function ViewProfileModal({
  isOpen,
  openModal,
  closeModal,
  cv,
  isDisclosed,
  disableEscape = false,
  vacancy,
  candidate,
  candidateOnJobId,
}: ViewProfileModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-h-full max-w-screen overflow-scroll p-5 lg:p-10"
      disableEscape={disableEscape}
    >
      <FullCandidateProfileViewer
        cv={cv}
        isDisclosed={isDisclosed}
        vacancy={vacancy}
        candidate={candidate}
        candidateOnJobId={candidateOnJobId}
      />
    </Modal>
  )
}

export default ViewProfileModal
