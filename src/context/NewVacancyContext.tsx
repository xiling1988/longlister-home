'use client'

import {
  createContext,
  ReactNode,
  use,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  NewVacancyInitialValuesType,
  VacancyAgencyData,
  vacancyInitialValuesSchema,
} from '@/common/zod-schemas/jobs/schemas'
import { useAuth } from './auth/auth-context'
import { CompanyType } from '@/common/models'

const defaultNewVacancyData: NewVacancyInitialValuesType = {
  companyType: undefined,
  companyName: '',
  legalName: '',
  // logo: undefined,
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
  companyDescription: `
  <h3>Who we are</h3><p>Introduce your company...</p><br>
  <h3>What we do</h3><p>Describe your products/services...</p><br>
  <h3>Our mission</h3><p>State your company's mission...</p><br>
  <h3>Our vision</h3><p>Describe your long-term goals...</p><br>
`,
  companyCulture: `
  <h3>Our Culture</h3><p>Describe your corporate culture...</p><br>
  <h3>Our Core Values</h3><p>What does your company value the most...</p><br>
  <h3>Management Style</h3><p>Tell us about your atmosphere and relationships...</p><br>
`,
  jobTitle: 'Bimbaa',
  jobDescription: `
  <h3>Our Culture</h3><p>Describe your corporate culture...</p><br>
  <h3>Our Core Values</h3><p>What does your company value the most...</p><br>
  <h3>Management Style</h3><p>Tell us about your atmosphere and relationships...</p><br>
`,
  // initialGoals: '',
  // reportingTo: 'Will Carter',
  // teamCollaboration: 'Weekly meetings and updates',
  // toolsUsed: 'Your brains and chatGPT',
  // growthOpportunities: 'I said promote yourself',
  // challenges: 'Knowing what to do since your so productive',
  // successMetrics: 'Do you think youre doing a good job?',
  // requiredSkills: 'You better bring skills',
  nonNegotiables: ['That is also important'],
  recruitmentTimeline: 2,
  stages: 2,
  stakeholders: 'At the cafe',
  assessments: 'A few coding problems',
  requiredDocs: 'Just your id',
  interviewMode: 'In-Person',
  decisionProcess: 'I take the decisions',
  // candidateTips: 'Just be yourself',
  salaryMin: 100000,
  salaryMax: 1200000,
  maxCvs: 1,
  deadline: '7',
  cvPriceBudget: 1000,
  // salaryNegotiable: true,
  bonusStructure: 'Bonus is yours',
  standardBenefits: 'aall the perks',
  additionalBenefits: 'Alll of the above',
  salaryReviewCycle: 'Annually',
  trainingOpportunities: 'Udemy for you for free',
  careerProgression: 'I said it twice',
  companyPerks: 'All of them my man',
  notifyParties: [],
  vacancyTermsAndConditionsAgreed: false,
  vacancyBudgetTermsAndConditionsAgreed: false,
}

type NewVacancyDataContextType = {
  newVacancyData: NewVacancyInitialValuesType
  updateVacancyData: (vacancyDetails: Partial<VacancyAgencyData>) => void
  dataLoaded: boolean
  resetData: () => void
}

const LOCAL_STORAGE_KEY = 'multi-step-form-createNewVacancy'

export const NewVacancyContext =
  createContext<NewVacancyDataContextType | null>(null)

export const NewVacancyDataProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [newVacancyData, setNewVacancyData] =
    useState<NewVacancyInitialValuesType>(defaultNewVacancyData)
  const [dataLoaded, setDataLoaded] = useState(false)
  const { user } = useAuth()

  const writeDataToLocalStorage = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVacancyData))
  }, [newVacancyData])

  useEffect(() => {
    if (dataLoaded) {
      writeDataToLocalStorage()
    }
  }, [newVacancyData, dataLoaded, writeDataToLocalStorage])

  useEffect(() => {
    if (user?.clientProfile) {
      updateVacancyData({
        companyType: user.clientProfile.companyType as CompanyType,
        companyName: user.clientProfile.companyName,
        legalName: user.clientProfile.legalName,
        companyDescription: user.clientProfile.overview,
        companyCulture: user.clientProfile.companyCultureDescription,
        tagline: user.clientProfile.tagline,
        industry: user.clientProfile.industry,
        orgType: user.clientProfile.orgType,
        yearFounded: user.clientProfile.yearFounded,
        companySize: user.clientProfile.companySize,
        headquarters: user.clientProfile.headquarters,
        website: user.clientProfile.website,
        primaryContactName: user.clientProfile.primaryContactName,
        primaryContactPosition: user.clientProfile.primaryContactPosition,
        primaryContactPhone: user.clientProfile.primaryContactPhone,
      })
    }
  }, [user, dataLoaded])

  useEffect(() => {
    readFromLocalStorage()
    setDataLoaded(true)
  }, [])

  const readFromLocalStorage = () => {
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!dataString) {
      return setNewVacancyData(defaultNewVacancyData)
    }
    const validated = vacancyInitialValuesSchema.safeParse(
      JSON.parse(dataString),
    )
    console.log(validated)
    if (validated.success) {
      setNewVacancyData(validated.data)
    } else {
      setNewVacancyData(defaultNewVacancyData)
    }
  }

  const updateVacancyData = (vacancyDetails: Partial<VacancyAgencyData>) => {
    setNewVacancyData((prev) => ({ ...prev, ...vacancyDetails }))
  }

  const resetData = () => {
    setNewVacancyData(defaultNewVacancyData)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  return (
    <NewVacancyContext.Provider
      value={{
        newVacancyData,
        updateVacancyData,
        resetData,
        dataLoaded,
      }}
    >
      {children}
    </NewVacancyContext.Provider>
  )
}

export function useNewVacancyContext() {
  const context = useContext(NewVacancyContext)
  if (!context) {
    throw new Error(
      'useNewVacancyContext must be used within a NewVacancyProvider',
    )
  }
  return context
}
