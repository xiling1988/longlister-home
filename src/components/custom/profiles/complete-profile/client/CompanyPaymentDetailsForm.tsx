import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  CardElement,
} from '@stripe/react-stripe-js'
import { FormEvent, startTransition, useEffect, useState } from 'react'

import { useProfileCompletionContext } from '@/context/ProfileCompletionContext'
import { useActionState } from 'react'
import {
  companyPaymentDetailsAction,
  createSetupIntentAction,
  createStripeCustomerAction,
  getStripeDataAction,
} from '@/app/(dashboard)/(others-pages)/profile/complete-profile/actions'
import { FormErrors } from '@/common/util/errors'
import Label from '@/components/tailAdmin/form/Label'
import Input from '@/components/tailAdmin/form/input/InputField'
import Button from '@/components/tailAdmin/ui/button/Button'
import { CompanyProfileInitialValuesType } from '@/common/zod-schemas/profiles/schemas'

const initialState: FormErrors = {}

export default function CompanyPaymentDetails({
  activeStep,
  setActiveStep,
  steps,
  setSuccess,
}: any) {
  const stripe = useStripe()
  const elements = useElements()
  const { profileData, updateProfileData } = useProfileCompletionContext()
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, formAction] = useActionState(companyPaymentDetailsAction, {
    errors: initialState,
  })

  useEffect(() => {
    console.log('GET STRIPE ERRORS OBJECT: ', errors)
  }, [errors, setActiveStep])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      console.error('Stripe has not loaded yet.')
      return
    }

    const inputData = new FormData()
    inputData.append(
      'cardHolderName',
      (profileData as CompanyProfileInitialValuesType).cardHolderName || '',
    )

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
          name: (profileData as CompanyProfileInitialValuesType).cardHolderName,
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

    updateProfileData({
      stripePaymentMethodId: paymentMethodId,
    } as Partial<CompanyProfileInitialValuesType>)

    // ✅ 5. Store the paymentMethodId
    const formData = new FormData()
    formData.append(
      'cardHolderName',
      (profileData as CompanyProfileInitialValuesType).cardHolderName || '',
    )
    formData.append(
      'stripePaymentMethodId',
      setupIntent.payment_method as string,
    )

    // ✅ Wrap formAction in startTransition
    startTransition(() => {
      formAction(formData)
    })
  }

  useEffect(() => {
    if (!state.errors && state.success) {
      setActiveStep((s: number) => s + 1)
    } else if (state.errors) {
      setErrors((prev) => ({ ...prev, ...state.errors }))
    }
  }, [state, setActiveStep])

  return (
    <section className="bg-white py-8 antialiased md:py-2 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Payment
          </h2>
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 lg:max-w-xl lg:p-8 dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <Label htmlFor="cardHolderName">Full name (as on card)*</Label>
                <Input
                  type="text"
                  name="cardHolderName"
                  onChange={(e) =>
                    updateProfileData({ cardHolderName: e.target.value })
                  }
                  defaultValue={
                    (profileData as CompanyProfileInitialValuesType)
                      .cardHolderName || ''
                  }
                  error={
                    !!state.errors?.cardHolderName || !!errors?.cardHolderName
                  }
                  hint={state.errors?.cardHolderName || errors?.cardHolderName}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Label>Card number*</Label>
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700">
                  <CardNumberElement
                    options={{ style: { base: { fontSize: '16px' } } }}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label>Expiration*</Label>
                <div className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 dark:border-gray-600 dark:bg-gray-700">
                  <CardExpiryElement
                    options={{ style: { base: { fontSize: '16px' } } }}
                  />
                </div>
              </div>
              <div className="col-span-1">
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

            <Button type="submit" className="w-full">
              Save and Continue
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
