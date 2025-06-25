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
  
`,
  companyCulture: `
  
`,
  jobTitle: '',
  jobDescription: `
  
`,
  nonNegotiables: [],
  recruitmentTimeline: undefined,
  stages: undefined,
  stakeholders: '',
  assessments: '',
  requiredDocs: '',
  interviewMode: undefined,
  decisionProcess: '',
  // candidateTips: '',
  salaryBudget: undefined,
  maxCvs: 1,
  deadline: '7',
  cvPriceBudget: undefined,
  // salaryNegotiable: true,
  bonusStructure: '',
  standardBenefits: '',
  salaryReviewCycle: '',
  trainingOpportunities: '',
  careerProgression: '',
  companyPerks: '',
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
