import {
  CompanyProfileInitialValuesType,
  RecruiterProfileInitialValuesType,
} from '../../zod-schemas/profiles/schemas'

export const defaultCompanyProfileData: CompanyProfileInitialValuesType = {
  companyType: 'company',
  companyName: 'Pottwal Solutions',
  legalName: 'PottwalSolutions',
  tagline: 'breeeeh',
  industry: 'Healthcare',
  orgType: 'Private',
  yearFounded: '2003',
  companySize: '51-200',
  headquarters: 'Dubai',
  website: 'https://meliusconsulting.me/rockstars-by-melius/',
  primaryContactName: 'Hans Schilling',
  primaryContactPosition: 'HR Manager',
  primaryContactPhone: '0526254042',
  overview: `
  <h3>Who we are</h3><p>Introduce your company...</p><br>
  <h3>What we do</h3><p>Describe your products/services...</p><br>
  <h3>Our mission</h3><p>State your company's mission...</p><br>
  <h3>Our vision</h3><p>Describe your long-term goals...</p><br>
`,
  companyCultureDescription: `
  <h3>Our Culture</h3><p>Describe your corporate culture...</p><br>
  <h3>Our Core Values</h3><p>What does your company value the most...</p><br>
  <h3>Management Style</h3><p>Tell us about your atmosphere and relationships...</p><br>
`,

  cardHolderName: 'Super Hans',
  stripePaymentMethodId: '',
}

export const defaultRecruiterProfileData: RecruiterProfileInitialValuesType = {
  firstName: '',
  lastName: '',
  industry: '',
  recruitingExperience: '',
  linkedIn: '',
  bio: `
  <h3>About Me</h3><p>Introduce yourself...</p><br>
  <h3>My Expertise</h3><p>Describe your recruiting style...</p><br>
  <h3>Experience & Projects</h3><p>Tell us about your recruiting history...</p><br>
`,
  phoneNumber: '',
  city: '',
  country: '',
  cardNumber: '4242424242424242',
  expiryDate: '12/28',
  cvc: '234',
  cardHolderName: 'Super Hans',
  website: '',
}
