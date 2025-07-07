import React, { startTransition, useActionState, useEffect } from 'react'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'
import { UploadFormState } from '@/common/util/errors'
import 'react-loading-skeleton/dist/skeleton.css'
import Alert from '@/components/tailAdmin/ui/alert/Alert'
import { CandidateProfileVersion, Job } from '@/common/models'
import { approveCandidate } from '@/app/(dashboard)/(others-pages)/vacancies/[id]/actions'
import { formatDate } from '@/common/util/helpers'
import CandidateSuccessCard from './CandidateSuccessCard'

interface ApproveCandidateModalProps {
  vacancy: Job
  candidate: CandidateProfileVersion
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  candidateOnJobId: string
  disableEscape?: boolean
}
const initialState: UploadFormState = { errors: {} }
function ApproveCandidateModal({
  vacancy,
  candidate,
  isOpen,
  closeModal,
  candidateOnJobId,
  disableEscape = false,
}: ApproveCandidateModalProps) {
  const [state, formAction, isPending] = useActionState(
    approveCandidate,
    initialState,
  )

  useEffect(() => {
    if (state.success?.success) {
      // Only set candidate if the success object has a 'candidate' property
    }
  }, [state.success])

  const handleSubmit = () => {
    startTransition(() => {
      formAction(candidateOnJobId)
    })
  }

  const approvedCount = vacancy.candidates.filter((c) => c.isDisclosed).length
  const price = Number(vacancy.cvPriceBudget)
  const current = approvedCount * price
  const future = current + price
  const maxReached = approvedCount + 1 >= vacancy.maxCvs

  if (!isOpen) return null
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-4xl overflow-scroll p-5 lg:p-10"
      disableEscape={disableEscape}
    >
      <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
        <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
          {!state.success ? 'Approve Candidate' : 'Candidate Approved'}
        </h2>

        {'api' in (state.errors ?? {}) && (state.errors as any).api && (
          <Alert
            variant="error"
            title="API Error Message "
            message={(state.errors as any).api?.message || ''}
            showLink={false}
            className="mb-4"
          />
        )}

        {'candidateOnJob' in (state.success ?? {}) ? (
          <div>
            <CandidateSuccessCard candidate={candidate} />
          </div>
        ) : (
          <>
            <div className="space-y-4 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="py-1 text-sm text-gray-500">
                    📅 Vacancy Deadline
                  </p>
                  <p className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-white">
                    {vacancy.deadline
                      ? formatDate(new Date(vacancy.deadline))
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="py-1 text-sm text-gray-500">
                    ✅ Approved Candidates
                  </p>
                  <p className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-white">
                    {approvedCount} / {vacancy.maxCvs}
                  </p>
                </div>
                <div>
                  <p className="py-1 text-sm text-gray-500">💰 Total Budget</p>
                  <p className="rounded bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-white">
                    {vacancy.totalBudget} AED
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-200 dark:border-gray-700" />

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Candidate Value</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {price.toFixed(2)} AED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Current Total</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {current.toFixed(2)} AED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>New Total after Approval</span>
                  <span
                    className={`font-medium ${
                      future > Number(vacancy.totalBudget)
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {future.toFixed(2)} AED
                  </span>
                </div>
              </div>

              {/* {maxReached && (
              <p className="mt-2 text-sm text-red-500">
                ⚠️ Approving this candidate will reach the max number of CVs (
                {vacancy.maxCvs}).
              </p>
            )} */}
            </div>
          </>
        )}
        <div className="mt-6 flex justify-end gap-x-3">
          <Button variant="outline" onClick={closeModal}>
            {state.success ? 'Close' : 'Cancel'}
          </Button>
          {!state.success && (
            <Button variant="primary" color="green" onClick={handleSubmit}>
              Approve Candidate
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ApproveCandidateModal
