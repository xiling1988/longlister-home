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
import {
  editPaymentDetailsAction,
  editRecruiterPersonalInfoAction,
} from '@/app/(dashboard)/(others-pages)/profile/actions'
import Image from 'next/image'
import Tooltip from '../../common/Tooltip'
import { InfoIcon } from 'lucide-react'
import Link from 'next/link'
import stripeBadge from '@/images/stripeBadge.png'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  CardElement,
} from '@stripe/react-stripe-js'
import { getStripeDataAction } from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'

export interface RecruiterEditProfileModalProps {
  isOpen: boolean
  closeModal: () => void
  user: User | null
}
const initialState: FormErrors = {}
export default function EditPaymentDetailsModal({
  isOpen,
  closeModal,
  user,
}: RecruiterEditProfileModalProps) {
  const stripe = useStripe()
  const elements = useElements()
  const profile = user?.clientProfile
  const [errors, setErrors] = useState<FormErrors>({})
  const [isPending, setIsPending] = useState(false)
  const [cardHolderName, setCardHolderName] = useState('')
  const [state, formAction] = useActionState(editPaymentDetailsAction, {
    errors: initialState,
  })

  useEffect(() => {
    console.log('GET STRIPE ERRORS OBJECT: ', errors)
  }, [errors])

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    if (!stripe || !elements) {
      console.error('Stripe has not loaded yet.')
      return
    }

    const inputData = new FormData(e.currentTarget)

    const response = await getStripeDataAction(inputData)
    if (response.errors) {
      console.log('error from getStripeDataAction:', response.errors)
      setErrors(response.errors)
      return
    }

    const stripeData = response.stripeData
    const clientSecret = stripeData?.clientSecret

    // ✅ 2. Create SetupIntent
    if (!clientSecret) {
      console.log('Logging error: clientSecret is missing')
      setErrors({
        clientSecret: 'Failed to create SetupIntent. Please try again.',
      })
      return
    }

    // ✅ 3. Get card details from Stripe Element
    const cardElement = elements.getElement(CardNumberElement)
    if (!cardElement) {
      console.log('Logging error: CardElement not found')
      setErrors({ cardElement: 'Card element not found. Please try again.' })
      return
    }

    // ✅ 4. Confirm card setup
    const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: profile?.cardHolderName,
        },
      },
    })
    if (error) {
      console.log('Logging error: ', error)
      setErrors({ stripe: error.message })
      return
    }

    if (setupIntent.status !== 'succeeded') {
      console.log('SetupIntent not succeeded:', setupIntent.status)
      setErrors({
        stripe: 'Card setup incomplete. Please try again.',
      })
      // setLoading(false)
      return
    }

    const paymentMethodId = setupIntent.payment_method

    // ✅ 5. Store the paymentMethodId
    const formData = new FormData()
    formData.append('cardHolderName', cardHolderName || '')
    formData.append('stripePaymentMethodId', paymentMethodId as string)
    formData.append('stripeCustomerId', stripeData.stripeCustomerId || '')

    // ✅ Wrap formAction in startTransition
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (state?.success && !state.errors) {
      setIsPending(false)
      setErrors({})
      setCardHolderName('')
      closeModal()
    }
  }, [state, closeModal])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px]">
      <div className="relative no-scrollbar w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11 dark:bg-gray-900">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Edit Payment Information
          </h4>
          <p className="mb-2 text-sm text-gray-500 lg:mb-2 dark:text-gray-400">
            Update your details to keep your profile up-to-date.
          </p>
          {state?.success && <p>Success! Your changes have been saved.</p>}
        </div>

        <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
          <div className="">
            <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-4 dark:text-white/90">
              <span className="mr-3 inline">
                <Image
                  src={stripeBadge}
                  alt="Powered by Stripe"
                  width={500}
                  height={300}
                  loading="lazy"
                  unoptimized
                  className="inline h-8 w-auto"
                />
              </span>
              <Tooltip
                icon={
                  <InfoIcon
                    size={24}
                    className="cursor-pointer text-brand-coral hover:text-brand-red"
                  />
                }
              >
                {' '}
                <p>
                  You won’t be charged now. We collect your payment details
                  securely via Stripe so you can start posting jobs and
                  unlocking candidate profiles. You’ll only be charged at the
                  end of each vacancy’s deadline based on disclosed candidates.
                  See our{' '}
                  <Link
                    href="/legal/user-terms"
                    target="_blank"
                    className="text-brand-coral underline hover:text-brand-red"
                  >
                    User Terms
                  </Link>{' '}
                  for more info.
                </p>
              </Tooltip>
            </h5>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <form
                onSubmit={handleSave}
                className="col-span-2 mt-6 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:mt-4 sm:p-6 lg:max-w-3xl lg:p-8 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-6 grid grid-cols-4 gap-4">
                  <div className="sm:col-span-4">
                    <Label htmlFor="cardHolderName">
                      Full name (as on card)*
                    </Label>
                    <Input
                      type="text"
                      name="cardHolderName"
                      onChange={(e) => setCardHolderName(e.target.value)}
                      value={cardHolderName}
                      error={
                        !!state.errors?.cardHolderName ||
                        !!errors?.cardHolderName
                      }
                      hint={
                        state.errors?.cardHolderName || errors?.cardHolderName
                      }
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-4">
                    <Label>Card number*</Label>
                    <div className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700">
                      <CardNumberElement
                        options={{ style: { base: { fontSize: '16px' } } }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label>Expiration*</Label>
                    <div className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700">
                      <CardExpiryElement
                        options={{ style: { base: { fontSize: '16px' } } }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Label>CVV*</Label>
                    <div className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700">
                      <CardCvcElement
                        options={{ style: { base: { fontSize: '16px' } } }}
                      />
                    </div>
                  </div>
                </div>
                {errors.stripe && (
                  <div className="mb-4 text-red-500">{errors.stripe}</div>
                )}

                <div className="mt-0 flex items-center gap-3 px-2 lg:justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={closeModal}
                    disabled={isPending}
                  >
                    Close
                  </Button>
                  <Button size="sm" type="submit" disabled={isPending}>
                    {isPending ? 'Updating Stripe...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
