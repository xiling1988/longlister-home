import { rejectCandidate } from '@/app/(dashboard)/(others-pages)/vacancies/[id]/actions'
import { UploadFormState } from '@/common/util/errors'
import TextArea from '@/components/tailAdmin/form/input/TextArea'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'

import React, { useActionState, useCallback, useEffect, useState } from 'react'

interface ModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  candidateOnJobId: string
  handleSubmit?: () => void // Optional function to handle submission
}
const initialState: UploadFormState = { errors: {} }
function RejectCandidateModal({
  openModal,
  candidateOnJobId,
  closeModal,
  isOpen,
  handleSubmit = () => {
    // Default no-op function for handleSubmit
    console.warn('handleSubmit not provided, using default no-op function.')
  },
}: ModalProps) {
  const [reason, setReason] = useState('')
  const [state, formAction] = useActionState(rejectCandidate, initialState)

  const handleClose = useCallback(() => {
    setReason('')
    closeModal()
  }, [closeModal])

  useEffect(() => {
    if (state.success) {
      handleClose()
    }
  }, [state.success, handleClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[584px] p-5 lg:p-10"
    >
      {/* <ComponentCard title="Candidate Rejection" className="w-full"> */}
      <form
        action={formAction}
        className="rounded-lg border border-gray-200 p-6 dark:border-gray-800"
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Reject Candidate
        </h2>
        <div className="grid w-full grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-2">
            <TextArea
              className="col-span-2 w-full"
              placeholder="Please provide a reason for rejection..."
              name="rejectReason"
              value={reason}
              onChange={setReason}
            />
            <input
              type="hidden"
              name="candidateOnJobId"
              value={candidateOnJobId}
            />
          </div>
        </div>

        <div className="mt-2 flex w-full items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" size="sm">
            Reject
          </Button>
        </div>
      </form>
      {/* </ComponentCard> */}
    </Modal>
  )
}

export default RejectCandidateModal
