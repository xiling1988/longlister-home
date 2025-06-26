import {
  CompanyProfileInitialValuesType,
  RecruiterProfileInitialValuesType,
} from '../../zod-schemas/profiles/schemas'

export const defaultCompanyProfileData: CompanyProfileInitialValuesType = {
  companyType: '',
  companyName: '',
  legalName: '',
  tagline: '',
  industry: '',
  orgType: '',
  yearFounded: '',
  companySize: '',
  headquarters: '',
  website: '',
  primaryContactName: '',
  primaryContactPosition: '',
  primaryContactPhone: '',
  overview: ``,
  companyCultureDescription: ``,
  cardHolderName: '',
  stripePaymentMethodId: '',
}

export const defaultRecruiterProfileData: RecruiterProfileInitialValuesType = {
  firstName: '',
  lastName: '',
  industry: '',
  recruitingExperience: '',
  linkedIn: '',
  bio: ``,
  phoneNumber: '',
  city: '',
  country: '',
  website: '',
}
