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
import { editRecruiterProfileAction } from '@/app/(dashboard)/(others-pages)/profile/actions'
import { initialState } from '@/common/util/errors'
function EditRecruiterProfileModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const [bio, setBio] = useState(user?.recruiterProfile?.bio || '')
  const [selectedExperience, setSelectedExperience] = useState<
    string | undefined
  >(user?.recruiterProfile?.recruitingExperience || undefined)
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(
    user?.recruiterProfile?.industry || undefined,
  )
  const profile = user?.recruiterProfile
  const [state, formAction, isPending] = useActionState(
    editRecruiterProfileAction,
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
            Recruiter Profile
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

              <div className="mb-6">
                <Label className="mt-2">Experience</Label>
                <Select
                  options={experienceOptions}
                  name="recruitingExperience"
                  required
                  defaultValue={selectedExperience}
                  onChange={(value) => setSelectedExperience(value)}
                  error={!!state?.errors?.recruitingExperience}
                  hint={state?.errors?.recruitingExperience}
                />
              </div>

              <div className="my-6">
                <Label>Industry Specialization</Label>
                <Select
                  options={industryOptions}
                  name="industry"
                  required
                  defaultValue={selectedIndustry}
                  onChange={(value) => setSelectedIndustry(value)}
                  error={!!state?.errors?.industry}
                  hint={state?.errors?.industry}
                />
              </div>
              <RichTextEditor
                title="Recruiter Bio"
                initialValue={bio}
                value={bio}
                onChange={(html) => setBio(html)}
              />
              {state?.errors?.bio && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {state?.errors?.bio}
                </p>
              )}
              <input type="hidden" name="bio" value={bio} />
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

export default EditRecruiterProfileModal
