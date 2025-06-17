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
  const [state, formAction, isPending] = useActionState(
    uploadCandidateSubmission,
    initialState,
  )
  const [candidate, setCandidate] = useState<CandidateProfileVersion | null>(
    null,
  )

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setCvFile(acceptedFiles[0])
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    },
  })

  useEffect(() => {
    if (state.success?.success) {
      // Only set candidate if the success object has a 'candidate' property
      if ('candidate' in state.success) {
        setCandidate(state.success.candidate)
      }
    }
  }, [state.success])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const data = new FormData(form)

    if (cvFile) {
      data.append('cv', cvFile)
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
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            <div
              className={`col-span-2 cursor-pointer rounded-xl ${isPending ? '' : 'border border-dashed border-gray-300 transition hover:border-brand-red'} dark:border-gray-700 dark:hover:border-brand-red`}
            >
              {isPending ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <div
                  {...getRootProps()}
                  className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
                    isDragActive
                      ? 'border-brand-red bg-gray-100 dark:bg-gray-800'
                      : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
                  } `}
                  id="demo-upload"
                >
                  <input {...getInputProps()} />
                  <div className="dz-message m-0! flex flex-col items-center">
                    {/* Icon Container */}
                    <div className="mb-[22px] flex justify-center">
                      <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-brand-coral text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                        {cvFile ? (
                          <CheckLineIcon />
                        ) : (
                          <svg
                            className="fill-current"
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    {cvFile ? (
                      <>
                        <h4 className="mb-3 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                          {cvFile.name}
                        </h4>
                        <Trash2Icon
                          className="h-4 w-4 cursor-pointer text-brand-red"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCvFile(null)
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="mb-3 text-theme-xl font-semibold text-gray-800 dark:text-white/90">
                          {isDragActive
                            ? 'Drop Files Here'
                            : 'Drag & Drop Files Here'}
                        </h4>

                        <span className="mb-5 block w-full max-w-[290px] text-center text-sm text-gray-700 dark:text-gray-400">
                          Drag and drop your PNG, JPG, WebP, SVG images here or
                          browse
                        </span>

                        <span className="text-theme-sm font-medium text-brand-red underline">
                          Browse File
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <input type="hidden" name="vacancyId" value={vacancyId} />
            <div className="col-span-1">
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

            <div className="col-span-1">
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

            <div className="col-span-1">
              {isPending ? (
                <Skeleton count={2} />
              ) : (
                <>
                  <Label>Current Salary</Label>
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
                    placeholder="AED"
                  />
                </>
              )}
            </div>
            <div className="col-span-1">
              {isPending ? (
                <Skeleton count={2} />
              ) : (
                <>
                  <Label>Expected Salary</Label>
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
                    placeholder="AED"
                  />
                </>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 flex w-full items-center justify-end gap-3">
          <Button size="sm" variant="outline" onClick={closeModal}>
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
