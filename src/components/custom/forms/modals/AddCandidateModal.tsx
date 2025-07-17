import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import Button from '@/components/tailAdmin/ui/button/Button'
import { Modal } from '@/components/tailAdmin/ui/modal'
import { useDropzone } from 'react-dropzone'

import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'
import { UploadFormState } from '@/common/util/errors'
import { CheckLineIcon } from '@/icons'
import { Trash2Icon } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Alert from '@/components/tailAdmin/ui/alert/Alert'
import CandidateSuccessCard from './CandidateSuccessCard'
import { CandidateProfileVersion } from '@/common/models'
import { uploadCandidateSubmission } from '@/app/(dashboard)/(others-pages)/vacancies/[id]/actions'
import CVDropzone from '../CVDropzone'
import { currencies } from '@/common/constants'
import Select from '@/components/tailAdmin/form/Select'

interface CreateVacancyModalProps {
  openModal: () => void
  closeModal: () => void
  isOpen: boolean
  vacancyId: string
}
const initialState: UploadFormState = { errors: {} }
function AddCandidateModal({
  openModal,
  closeModal,
  isOpen,
  vacancyId,
}: CreateVacancyModalProps) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [state, formAction] = useActionState(
    uploadCandidateSubmission,
    initialState,
  )
  const isPending = true
  const [currency, setCurrency] = useState<string>('')
  const [candidate, setCandidate] = useState<CandidateProfileVersion | null>(
    null,
  )

  useEffect(() => {
    if (state.success?.success) {
      // Only set candidate if the success object has a 'candidate' property
      if ('candidate' in state.success) {
        setCandidate(state.success.candidate)
      }
      // Reset form state on success
      setCurrency('')
      setCvFile(null)
    }
  }, [state.success])

  const handleCloseModal = () => {
    // Reset form state when modal closes
    setCurrency('')
    setCvFile(null)
    setCandidate(null)
    closeModal()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    if (cvFile) {
      data.append('cv', cvFile)
    }

    // Ensure currency is included in form data
    if (currency) {
      data.set('currency', currency)
    }

    startTransition(() => {
      formAction(data)
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-h-5/6 w-52 max-w-5xl overflow-scroll p-5 lg:p-10"
      disableEscape={true}
    >
      <form onSubmit={handleSubmit}>
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {state.success
            ? 'Successfully Added Candidate'
            : isPending
              ? 'Uploading Candidate - Generating Profile'
              : 'Add Candidate'}
        </h4>

        {'api' in (state.errors ?? {}) && (state.errors as any).api && (
          <Alert
            variant="error"
            title="API Error Message "
            message={(state.errors as any).api?.message || ''}
            showLink={false}
            className="mb-4"
          />
        )}

        {state.success && 'candidate' in state.success ? (
          <CandidateSuccessCard
            candidate={state.success.candidate as CandidateProfileVersion}
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
            <CVDropzone cvFile={cvFile} setCvFile={setCvFile} isPending />
            <input type="hidden" name="vacancyId" value={vacancyId} />
            <div className="col-span-3 flex gap-4">
              <div className="flex-1">
                {isPending ? (
                  <Skeleton count={5} />
                ) : (
                  <>
                    <Label>Current Location</Label>
                    <Input
                      error={
                        !!(
                          'location' in (state.errors ?? {}) &&
                          (state.errors as any).location
                        )
                      }
                      hint={
                        ('location' in (state.errors ?? {}) &&
                          (state.errors as any).location?.message) ||
                        ''
                      }
                      disabled={isPending}
                      name="location"
                      type="text"
                      placeholder="Dubai, UAE"
                    />
                  </>
                )}
              </div>

              <div className="flex-1">
                {isPending ? (
                  <Skeleton count={5} />
                ) : (
                  <>
                    <Label>Notice Period (Months)</Label>
                    <Input
                      error={
                        !!(
                          'noticePeriod' in (state.errors ?? {}) &&
                          (state.errors as any).noticePeriod
                        )
                      }
                      hint={
                        ('noticePeriod' in (state.errors ?? {}) &&
                          (state.errors as any).noticePeriod?.message) ||
                        ''
                      }
                      disabled={isPending}
                      name="noticePeriod"
                      type="number"
                      placeholder="3"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="col-span-3 flex gap-4">
              <div>
                {isPending ? (
                  <Skeleton count={2} />
                ) : (
                  <>
                    <Label>Currency</Label>
                    <Select
                      name="currency"
                      options={currencies}
                      onChange={(value) => setCurrency(value)}
                      placeholder="Select a salary currency"
                      defaultValue={currency}
                      error={
                        !!(
                          'currency' in (state.errors ?? {}) &&
                          (state.errors as any).currency
                        )
                      }
                      hint={
                        ('currency' in (state.errors ?? {}) &&
                          (state.errors as any).currency?.message) ||
                        ''
                      }
                    />
                  </>
                )}
              </div>
              <div className="flex-1">
                {isPending ? (
                  <Skeleton count={2} />
                ) : (
                  <>
                    <Label>Current Salary (monthly)</Label>
                    <Input
                      error={
                        !!(
                          'currentSalary' in (state.errors ?? {}) &&
                          (state.errors as any).currentSalary
                        )
                      }
                      hint={
                        ('currentSalary' in (state.errors ?? {}) &&
                          (state.errors as any).currentSalary?.message) ||
                        ''
                      }
                      disabled={isPending}
                      name="currentSalary"
                      type="text"
                      placeholder={currency}
                    />
                  </>
                )}
              </div>
              <div className="flex-1">
                {isPending ? (
                  <Skeleton count={2} />
                ) : (
                  <>
                    <Label>Expected Salary (monthly)</Label>
                    <Input
                      error={
                        !!(
                          'expectedSalary' in (state.errors ?? {}) &&
                          (state.errors as any).expectedSalary
                        )
                      }
                      hint={
                        ('expectedSalary' in (state.errors ?? {}) &&
                          (state.errors as any).expectedSalary?.message) ||
                        ''
                      }
                      disabled={isPending}
                      name="expectedSalary"
                      type="number"
                      placeholder={currency}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={handleCloseModal}>
            Close
          </Button>
          {!state.success && (
            <Button size="sm" type="submit" disabled={isPending}>
              Submit Candidate
            </Button>
          )}
        </div>
      </form>
    </Modal>
  )
}

export default AddCandidateModal
