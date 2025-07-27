import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import { Modal } from '@/components/tailAdmin/ui/modal'
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react'
import { User } from '@/common/models'
import Button from '@/components/tailAdmin/ui/button/Button'
import { AVATAR_OPTIONS } from '../../profiles/complete-profile/recruiter/RecruiterPersonalDetailsForm'
import { getCompanyLogo, getRecruiterAvatar } from '@/common/util/helpers'
import Avatar from '@/components/tailAdmin/ui/avatar/Avatar'
import { FormErrors } from '@/common/util/errors'
import {
  editCompanyInfoAction,
  editRecruiterPersonalInfoAction,
} from '@/app/(dashboard)/(others-pages)/profile/actions'
import FileInput from '@/components/tailAdmin/form/input/FileInput'
import Image from 'next/image'
import { XIcon } from 'lucide-react'

export interface RecruiterEditProfileModalProps {
  isOpen: boolean
  closeModal: () => void
  user: User | null
}
const initialState: FormErrors = {}
export default function EditCompanyInfoModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const profile = user?.clientProfile

  const inputRef = useRef<HTMLInputElement | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [state, formAction, isPending] = useActionState(editCompanyInfoAction, {
    errors: initialState,
  })

  console.log('logging file: ', logoFile)

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (logoFile) {
      formData.append('logo', logoFile)
    }
    
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
    if (state?.success && !state?.errors) {
      closeModal()
    }
  }, [state, closeModal])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
      <div className="relative no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Company Information
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
                Company Details
              </h5>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <Label>Company Name</Label>
                  <Input
                    name="companyName"
                    defaultValue={profile?.companyName}
                    placeholder="e.g. Longlister Inc."
                    // onChange={handleChange}
                    required
                    error={!!state.errors?.companyName}
                    hint={state.errors?.companyName}
                  />
                </div>

                <div>
                  <Label>Legal Name (Optional)</Label>
                  <Input
                    name="legalName"
                    defaultValue={profile?.legalName}
                    placeholder="e.g. Longlister Technologies FZ-LLC"
                    // onChange={handleChange}
                    error={!!state.errors?.legalName}
                    hint={state.errors?.legalName}
                  />
                </div>

                <div>
                  <Label>Industry</Label>
                  <Input
                    name="industry"
                    defaultValue={profile?.industry}
                    placeholder="e.g. Recruitment"
                    // onChange={handleChange}
                    required
                    error={!!state.errors?.industry}
                    hint={state.errors?.industry}
                  />
                </div>

                <div>
                  <Label>Organization Type</Label>
                  <Input
                    name="orgType"
                    defaultValue={profile?.orgType}
                    placeholder="e.g. Private"
                    // onChange={handleChange}
                    required
                    error={!!state.errors?.orgType}
                    hint={state.errors?.orgType}
                  />
                </div>

                <div>
                  <Label>Year Founded (Optional)</Label>
                  <Input
                    name="yearFounded"
                    defaultValue={profile?.yearFounded}
                    placeholder="e.g. 2022"
                    // onChange={handleChange}
                    error={!!state.errors?.yearFounded}
                    hint={state.errors?.yearFounded}
                  />
                </div>

                <div>
                  <Label>Company Size</Label>
                  <Input
                    name="companySize"
                    defaultValue={profile?.companySize}
                    placeholder="e.g. 11-50 employees"
                    // onChange={handleChange}
                    required
                    error={!!state.errors?.companySize}
                    hint={state.errors?.companySize}
                  />
                </div>

                <div>
                  <Label>Headquarters</Label>
                  <Input
                    name="headquarters"
                    defaultValue={profile?.headquarters}
                    placeholder="e.g. Dubai, UAE"
                    // onChange={handleChange}
                    required
                    error={!!state.errors?.headquarters}
                    hint={state.errors?.headquarters}
                  />
                </div>
                <div className="col-span-2 items-center">
                  <Label>Upload file</Label>
                  <div className="flex w-full items-center gap-3">
                    <Image
                      src={getCompanyLogo(user?.id || '')}
                      height={100}
                      width={100}
                      unoptimized
                      alt="currentLogo"
                      className="h-10 w-10 rounded"
                    />
                    <div className="flex-1">
                      {' '}
                      <FileInput
                        ref={inputRef}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                          const file =
                            event.target.files && event.target.files[0]
                              ? event.target.files[0]
                              : null
                          setLogoFile(file)
                        }}
                        className="custom-class"
                        icon={
                          <button
                            onClick={() => {
                              setLogoFile(null)
                              if (inputRef.current) {
                                inputRef.current.value = ''
                              }
                            }}
                          >
                            <XIcon className="mt-2 fill-gray-500 dark:fill-gray-400" />
                          </button>
                        }
                      />
                    </div>
                  </div>
                  <input type="hidden" name="logo" />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input
                    name="website"
                    defaultValue={profile?.website}
                    placeholder="e.g. https://yourcompany.com"
                    // onChange={handleChange}
                    error={!!state.errors?.website}
                    hint={state.errors?.website}
                  />
                </div>

                <div>
                  <Label>Tagline (Optional)</Label>
                  <Input
                    name="tagline"
                    defaultValue={profile?.tagline}
                    placeholder="e.g. Talent that delivers"
                    // onChange={handleChange}
                    error={!!state.errors?.tagline}
                    hint={state.errors?.tagline}
                  />
                </div>
                <div>
                  <Label>Primary Contact Name</Label>
                  <Input
                    name="primaryContactName"
                    defaultValue={profile?.primaryContactName}
                    placeholder="e.g. John Doe"
                    // onChange={handleChange}
                    error={!!state.errors?.primaryContactName}
                    hint={state.errors?.primaryContactName}
                  />
                </div>
                <div>
                  <Label>Primary Contact Position</Label>
                  <Input
                    name="primaryContactPosition"
                    defaultValue={profile?.primaryContactPosition}
                    placeholder="e.g. HR Manager"
                    // onChange={handleChange}
                    error={!!state.errors?.primaryContactPosition}
                    hint={state.errors?.primaryContactPosition}
                  />
                </div>
                <div>
                  <Label>Primary Contact Phone Number</Label>
                  <Input
                    name="primaryContactPhone"
                    defaultValue={profile?.primaryContactPhone}
                    placeholder="e.g. HR Manager"
                    // onChange={handleChange}
                    error={!!state.errors?.primaryContactPhone}
                    hint={state.errors?.primaryContactPhone}
                  />
                </div>
                <div className="col-span-2 h-1 rounded-2xl bg-transparent"></div>
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
