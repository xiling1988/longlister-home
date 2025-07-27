import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import { Modal } from '@/components/tailAdmin/ui/modal'
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'
import { User } from '@/common/models'
import Button from '@/components/tailAdmin/ui/button/Button'
import { AVATAR_OPTIONS } from '../../profiles/complete-profile/recruiter/RecruiterPersonalDetailsForm'
import { getRecruiterAvatar } from '@/common/util/helpers'
import Avatar from '@/components/tailAdmin/ui/avatar/Avatar'
import { FormErrors } from '@/common/util/errors'
import { editRecruiterPersonalInfoAction } from '@/app/(dashboard)/(others-pages)/profile/actions'

export interface RecruiterEditProfileModalProps {
  isOpen: boolean
  closeModal: () => void
  user: User | null
}
const initialState: FormErrors = {}
function RecruiterEditPersonalInfoModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.recruiterProfile?.avatar || '',
  )
  const profile = user?.recruiterProfile
  const [state, formAction, isPending] = useActionState(
    editRecruiterPersonalInfoAction,
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
    if (state?.success && !state.errors) {
      closeModal()
    }
  }, [state, closeModal])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
      <div className="relative no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Account Information
          </h4>
          <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
            Update your details to keep your profile up-to-date.
          </p>
          {state?.success && <p>Success! Your changes have been saved.</p>}
        </div>
        <form onSubmit={handleSave} className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="">
              <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                Personal Information
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>First Name</Label>
                  <Input
                    name="firstName"
                    placeholder="e.g. Hans"
                    defaultValue={profile?.firstName}
                    // onChange={handleChange}
                    required
                    error={!!state?.errors?.firstName}
                    hint={state?.errors?.firstName}
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    name="lastName"
                    placeholder="e.g. Schilling"
                    defaultValue={profile?.lastName}
                    // onChange={handleChange}
                    required
                    error={!!state?.errors?.lastName}
                    hint={state?.errors?.lastName}
                  />
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <Input
                    name="phoneNumber"
                    placeholder="e.g. 0501234567"
                    defaultValue={profile?.phoneNumber}
                    // onChange={handleChange}
                    required
                    error={!!state?.errors?.phoneNumber}
                    hint={state?.errors?.phoneNumber}
                  />
                </div>

                <div>
                  <Label>City</Label>
                  <Input
                    name="city"
                    placeholder="e.g. Dubai"
                    defaultValue={profile?.city}
                    // onChange={handleChange}
                    required
                    error={!!state?.errors?.city}
                    hint={state?.errors?.city}
                  />
                </div>

                <div>
                  <Label>Country</Label>
                  <Input
                    name="country"
                    placeholder="e.g. UAE"
                    defaultValue={profile?.country}
                    // onChange={handleChange}
                    required
                    error={!!state?.errors?.country}
                    hint={state?.errors?.country}
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    name="website"
                    placeholder="https://your-portfolio.com"
                    defaultValue={profile?.website}
                    // onChange={handleChange}
                    error={!!state?.errors?.website}
                    hint={state?.errors?.website}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Label>Select Avatar</Label>
                <div className="mt-2 flex flex-wrap gap-4">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <div
                      key={avatar}
                      className={`cursor-pointer rounded-full border-2 p-1 ${
                        selectedAvatar === avatar
                          ? 'border-brand-red'
                          : 'border-transparent'
                      }`}
                      onClick={() => setSelectedAvatar(avatar)}
                    >
                      <Avatar
                        src={getRecruiterAvatar(avatar)}
                        alt="Avatar"
                        // className="h-16 w-16"
                      />
                    </div>
                  ))}
                </div>
                <input type="hidden" name="avatar" value={selectedAvatar} />
              </div>
              <div>
                <h5 className="mt-5 text-lg font-medium text-gray-800 lg:mb-3 dark:text-white/90">
                  Social Links
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-2">
                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      name="linkedIn"
                      defaultValue={profile?.linkedIn}
                      error={!!state?.errors?.linkedIn}
                      hint={state?.errors?.linkedIn}
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 px-2 lg:justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={closeModal}
              disabled={isPending}
            >
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

export default RecruiterEditPersonalInfoModal
