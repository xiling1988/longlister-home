import Input from '@/components/tailAdmin/form/input/InputField'
import Label from '@/components/tailAdmin/form/Label'
import { Modal } from '@/components/tailAdmin/ui/modal'
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react'
import { User } from '@/common/models'
import Button from '@/components/tailAdmin/ui/button/Button'
import { EyeCloseIcon, EyeIcon } from '@/icons'
import {
  editUserEmailAction,
  editUserPasswordAction,
} from '@/app/(dashboard)/(others-pages)/profile/actions'
import { initialState } from '@/common/util/errors'
import Checkbox from '@/components/tailAdmin/form/input/Checkbox'
import { email, set } from 'zod/v4'
import Alert from '@/components/tailAdmin/ui/alert/Alert'

export interface RecruiterEditProfileModalProps {
  isOpen: boolean
  closeModal: () => void
  user: User | null
  state?: any
}

function EditUserAccountModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [emailAlert, setEmailAlert] = useState(false)
  const [passwordAlert, setPasswordAlert] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  const [stateEmail, formActionEmail, isPendingEmail] = useActionState(
    editUserEmailAction,
    {
      errors: initialState,
    },
  )
  const [statePassword, formActionPassword, isPendingPassword] = useActionState(
    editUserPasswordAction,
    {
      errors: initialState,
    },
  )

  const handleSaveEmailEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    console.log(
      'log submitted formData:',
      Object.fromEntries(formData.entries()),
    )
    startTransition(() => {
      formActionEmail(formData)
    })
  }

  useEffect(() => {
    if (stateEmail.success && !stateEmail.errors) {
      setEmail('') // Reset email field after successful submission
      setIsChecked(false) // Reset checkbox after successful submission
    }
    if (statePassword.success && !statePassword.errors) {
      setCurrentPassword('') // Reset current password field after successful submission
      setNewPassword('') // Reset new password field after successful submission
      setConfirmNewPassword('') // Reset confirm new password field after successful submission
    }
  }, [stateEmail, statePassword])

  const handleSavePasswordEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      formActionPassword(formData)
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[1000px]">
      <div className="relative no-scrollbar w-full max-w-[1000px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit User Account
          </h4>
          <p className="mb-6 text-sm text-gray-500 lg:mb-7 dark:text-gray-400">
            Update your details to keep your profile up-to-date.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="custom-scrollbar h-96 overflow-y-auto px-2 pb-3">
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Change User Account Email
                </h5>
                {stateEmail?.errors?.api && (
                  <Alert
                    variant="error"
                    className="mb-4"
                    title="API Error"
                    message={stateEmail.errors?.api?.message}
                  />
                )}
                {stateEmail?.success && (
                  <Alert
                    variant="success"
                    className="mb-4"
                    title="Success"
                    message="Your email has been updated successfully."
                  />
                )}
                <form onSubmit={handleSaveEmailEdit}>
                  <div>
                    <Label>
                      Email (Current:{' '}
                      <span className="font-bold">{user?.email}</span>)
                    </Label>
                    <Input
                      name="email"
                      placeholder="e.g. hans@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      error={!!stateEmail?.errors?.email}
                      hint={stateEmail?.errors?.email}
                    />
                  </div>
                  <div className="mt-2 flex max-w-xl items-center gap-3 align-middle">
                    <Checkbox
                      checked={isChecked}
                      onChange={setIsChecked}
                      name="confirmChangeEmail"
                    />
                    <span className="block text-theme-sm font-normal text-gray-700 dark:text-gray-400">
                      By checking this box, you confirm that you want to change
                      your email address. After saving, you will use the new
                      email address to log in.
                    </span>

                    <p className="block text-theme-sm font-normal text-brand-red dark:text-gray-400">
                      {stateEmail?.errors?.confirmChangeEmail}
                    </p>
                  </div>
                  <div className="mt-9 flex items-center gap-3 px-2 lg:justify-start">
                    <Button
                      size="sm"
                      type="submit"
                      disabled={!email || !isChecked || isPendingEmail}
                    >
                      Change Email
                    </Button>
                  </div>
                </form>
              </div>

              <div className="flex-1">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6 dark:text-white/90">
                  Change User Password
                </h5>
                {statePassword?.errors?.api && (
                  <Alert
                    variant="error"
                    className="mb-4"
                    title="API Error"
                    message={statePassword.errors?.api?.message}
                  />
                )}
                {statePassword?.success && (
                  <Alert
                    variant="success"
                    className="mb-4"
                    title="Success"
                    message="Your password has been updated successfully."
                  />
                )}
                <form action="" onSubmit={handleSavePasswordEdit}>
                  <div>
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        required
                        error={!!statePassword?.errors?.currentPassword}
                        hint={
                          statePassword?.errors?.currentPassword &&
                          statePassword?.errors?.currentPassword
                        }
                        placeholder="Password"
                        className={`bg-white ${statePassword?.errors?.currentPassword ? 'translate-y-1/2' : ''}`}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setShowPassword(!showPassword)
                        }}
                        className={`absolute top-1/2 right-4 z-30 ${statePassword.errors?.currentPassword ? '' : '-translate-y-1/2'} cursor-pointer`}
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-brand-red">
                      {statePassword?.errors?.password &&
                        statePassword?.errors?.password}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between gap-2">
                    <div className="flex-1">
                      <Label>New Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="newPassword"
                          required
                          success={
                            !!newPassword && newPassword === confirmNewPassword
                          }
                          error={!!statePassword?.errors?.newPassword}
                          hint={
                            statePassword?.errors?.newPassword &&
                            statePassword?.errors?.newPassword
                          }
                          placeholder="Password"
                          className={`bg-white ${statePassword?.errors?.newPassword ? 'translate-y-1/2' : ''}`}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <p className="text-sm text-brand-red">
                        {statePassword?.errors?.newPassword &&
                          statePassword?.errors?.newPassword}
                      </p>
                    </div>
                    <div className="flex-1">
                      <Label>Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmNewPassword"
                          required
                          error={!!statePassword?.errors?.confirmNewPassword}
                          hint={
                            statePassword?.errors?.confirmNewPassword &&
                            statePassword?.errors?.confirmNewPassword
                          }
                          success={
                            !!newPassword && newPassword === confirmNewPassword
                          }
                          placeholder="Password"
                          className={`bg-white ${statePassword?.errors?.confirmNewPassword ? 'translate-y-1/2' : ''}`}
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </div>
                      <p className="text-sm text-brand-red">
                        {statePassword?.errors?.confirmNewPassword &&
                          statePassword?.errors?.confirmNewPassword}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-3 px-2 lg:justify-start">
                    <Button
                      size="sm"
                      type="submit"
                      disabled={
                        !currentPassword ||
                        !newPassword ||
                        !confirmNewPassword ||
                        isPendingPassword
                      }
                    >
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-16 flex items-center gap-3 px-2 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EditUserAccountModal
