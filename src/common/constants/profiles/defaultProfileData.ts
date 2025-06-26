import {
  CompanyProfileInitialValuesType,
  RecruiterProfileInitialValuesType,
} from '../../zod-schemas/profiles/schemas'

export const defaultCompanyProfileData: CompanyProfileInitialValuesType = {
  companyType: 'company',
  companyName: 'Careem',
  legalName: 'Careem Networks FZ LLC',
  // logo: null,
  tagline: 'The Everything App',
  industry: 'Technology / Mobility',
  orgType: 'Private',
  yearFounded: '2012',
  companySize: '5,001–10,000',
  headquarters: 'Dubai, UAE',
  website: 'https://www.careem.com',
  primaryContactName: 'Mudassir Sheikha',
  primaryContactPosition: 'CEO & Co-founder',
  primaryContactPhone: '0000000000',
  overview:
    '\n    <h3>Who we are</h3><p>Careem is a leading technology platform that simplifies everyday life across the Middle East...</p><br>\n    <h3>What we do</h3><p>We offer ride-hailing, food and grocery delivery, payments, and more — all in one app...</p><br>\n    <h3>Our mission</h3><p>To simplify and improve the lives of people and build an awesome organization...</p><br>\n    <h3>Our vision</h3><p>To be the region’s everyday Super App...</p><br>',
  companyCultureDescription:
    '\n    <h3>Our Culture</h3><p>We embrace curiosity, ownership, and impact-driven innovation...</p><br>\n    <h3>Our Core Values</h3><p>Be of service, act like owners, champion diversity, and build trust...</p><br>\n    <h3>Management Style</h3><p>Collaborative, agile, and mission-led...</p><br>',
  cardHolderName: 'Mudassir Sheikha',
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
