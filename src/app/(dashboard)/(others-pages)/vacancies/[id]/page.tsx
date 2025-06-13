import ClientVacancyDetailPage from '@/components/custom/vacancies/ClientVacancyPage'
import React from 'react'
const vacancy = {
  id: '9a8fdc5b-b98b-4678-9903-5e150ef62723',
  createdAt: '2025-06-13T12:35:35.222Z',
  updatedAt: '2025-06-13T12:35:35.222Z',
  status: 'ACTIVE',
  maxCvs: 1,
  deadline: '2025-06-20T12:35:35.121Z',
  cvPriceBudget: 1000,
  totalBudget: 1000,
  currentTotal: 0,
  notifyParties: [
    {
      name: 'will',
      email: 'will@vssrt.com',
    },
  ],
  clientId: '0fb6e83d-9995-44f2-b28c-69b17dd06a55',
  companyType: 'company',
  companyName: 'Superhans Solutions',
  legalName: 'SuperHans LLC',
  companyDescription: '<h3>Who we are</h3><p>Introduce your company...</p>',
  companyCulture: `
    <h3>Our Culture</h3><p>Describe your corporate culture...</p><br>
    <h3>Our Core Values</h3><p>What does your company value the most...</p><br>
    <h3>Management Style</h3><p>Tell us about your atmosphere and relationships...</p><br>
  `,
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
  jobTitle: 'Vamos?',
  jobDescription: `
    <h3>Our Culture</h3><p>Describe your corporate culture...</p><br>
    <h3>Our Core Values</h3><p>What does your company value the most...</p><br>
    <h3>Management Style</h3><p>Tell us about your atmosphere and relationships...</p><br>
  `,
  nonNegotiables: ['Gotta be a baws', 'doen'],
  recruitmentTimeline: 2,
  stages: 2,
  assessments: 'A few coding problems',
  requiredDocs: 'Just your id',
  interviewMode: 'Remote',
  decisionProcess: 'I take the decisions',
  salaryMin: 100000,
  salaryMax: 1200000,
  bonusStructure: 'Bonus is yours',
  standardBenefits: 'aall the perks',
  additionalBenefits: 'Alll of the above',
  salaryReviewCycle: 'Bi-Annually',
  trainingOpportunities: 'Udemy for you for free',
  careerProgression: 'I said it twice',
  companyPerks: 'All of them my man',
  vacancyTermsAndConditionsAgreed: false,
  vacancyBudgetTermsAndConditionsAgreed: false,
  candidates: [],
  logo: '', // Add a default or actual logo URL here
  niceToHaveSkills: [], // Add an array of skills or leave empty if none
  recruiters: [], // Add an array of recruiters or leave empty if none
}
function page() {
  return <ClientVacancyDetailPage vacancy={vacancy} />
}

export default page
