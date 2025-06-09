export interface ClientProfile {
  id: string
  userId: string
  firstName?: string
  lastName?: string
  phone?: string

  companyType?: string
  companyName?: string
  legalName?: string
  logo?: string
  tagline?: string
  industry?: string
  orgType?: string
  yearFounded?: string
  companySize?: string
  headquarters?: string
  website?: string

  primaryContactName?: string
  primaryContactPosition?: string
  primaryContactPhone?: string

  overview?: string
  companyCultureDescription?: string

  // ✅ Stripe fields
  cardHolderName?: string
  stripeCustomerId?: string
  stripePaymentMethodId?: string
}
