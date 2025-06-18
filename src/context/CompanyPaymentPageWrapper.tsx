import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_PUBLISHABLE_KEY } from '@/common/constants'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

export default function CompanyPaymentPageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
