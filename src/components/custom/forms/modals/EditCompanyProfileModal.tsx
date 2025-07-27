import React, {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'
import { RecruiterEditProfileModalProps } from './RecruiterEditPersonalInfoModal'
import { Modal } from '@/components/tailAdmin/ui/modal'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Button from '@/components/tailAdmin/ui/button/Button'
import {
  experienceOptions,
  industryOptions,
} from '../../profiles/complete-profile/recruiter/RecruiterProfileForm'
import Select from '@/components/tailAdmin/form/Select'
import RichTextEditor from '../RichTextEditor'
import {
  editCompanyProfileAction,
  editRecruiterProfileAction,
} from '@/app/(dashboard)/(others-pages)/profile/actions'
import { initialState } from '@/common/util/errors'
export default function EditCompanyProfileModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const [overview, setOverview] = useState(user?.clientProfile?.overview || '')
  const [companyCultureDescription, setCompanyCultureDescription] = useState(
    user?.clientProfile?.companyCultureDescription || '',
  )
  const [selectedExperience, setSelectedExperience] = useState<
    string | undefined
  >(user?.recruiterProfile?.recruitingExperience || undefined)
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(
    user?.recruiterProfile?.industry || undefined,
  )
  const profile = user?.recruiterProfile
  const [state, formAction, isPending] = useActionState(
    editCompanyProfileAction,
    {
      errors: initialState,
    },
  )

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    console.log(
      'logging submitted formData:',
      Object.fromEntries(formData.entries()),
    )
    // ✅ Wrap formAction in startTransition
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state.success && !state.errors) {
      closeModal()
    }
  }, [state, closeModal])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[840px]">
      <div className="relative no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Company Profile
          </h4>
          <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSave}>
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="mt-2">
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Profile Information
              </h5>

              <div>
                <RichTextEditor
                  title="Company Overview"
                  initialValue={overview}
                  value={overview}
                  onChange={(html) => setOverview(html)}
                />
                {state?.errors?.overview && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state?.errors?.overview}
                  </p>
                )}
              </div>
              <div>
                <RichTextEditor
                  title="Company Culture"
                  initialValue={companyCultureDescription}
                  value={companyCultureDescription}
                  onChange={(html) => setCompanyCultureDescription(html)}
                  className="mt-8"
                />
                {state?.errors?.companyCultureDescription && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state?.errors?.companyCultureDescription}
                  </p>
                )}
              </div>
              <input type="hidden" name="overview" value={overview} />
              <input
                type="hidden"
                name="companyCultureDescription"
                value={companyCultureDescription}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm" type="submit" disabled={isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
