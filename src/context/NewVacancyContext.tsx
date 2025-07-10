'use client'

import {
  createContext,
  ReactNode,
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

// Utility for deep equality check (replace JSON.stringify)
const areObjectsEqual = (obj1: any, obj2: any): boolean => {
  // Simple deep equality check (you can use a library like lodash for robustness)
  return JSON.stringify(obj1) === JSON.stringify(obj2) // Replace with lodash.isEqual for better performance
}

const defaultNewVacancyData: NewVacancyInitialValuesType = {
  maxCvs: 10,
  deadline: '14',
  cvPriceBudget: undefined,
  totalBudget: undefined,
  notifyParties: [],
  companyType: 'company',
  companyName: 'Careem',
  legalName: 'Careem Networks FZ LLC',
  companyDescription:
    '<h3>Who we are</h3><p>Careem is a leading technology platform that simplifies everyday life across the Middle East...</p><br>\n<h3>What we do</h3><p>We offer ride-hailing, food and grocery delivery, payments, and more — all in one app...</p><br>\n<h3>Our mission</h3><p>To simplify and improve the lives of people and build an awesome organization...</p><br>\n<h3>Our vision</h3><p>To be the region’s everyday Super App...</p><br>',
  companyCulture:
    '<h3>Our Culture</h3><p>We embrace curiosity, ownership, and impact-driven innovation...</p><br>\n<h3>Our Core Values</h3><p>Be of service, act like owners, champion diversity, and build trust...</p><br>\n<h3>Management Style</h3><p>Collaborative, agile, and mission-led...</p><br>',
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
  jobTitle: 'Visual Designer I',
  jobDescription:
    '<h3>Role Overview</h3>\n<p>Shape the visual identity across Careem’s suite of products. This role spans interface design, visual storytelling, motion, and brand expression.</p><br>\n<h3>Responsibilities</h3>\n<p>Design expressive user interfaces, develop and maintain visual systems (illustration, iconography, typography), and create detailed handoffs for implementation—including motion design when needed.</p><br>\n<h3>Collaboration</h3>\n<p>Work closely with product designers, engineers, and brand teams to ensure visual consistency and innovation across the Careem experience.</p><br>\n<h3>Challenges</h3>\n<p>Balancing fast-paced iteration with long-term visual design excellence, and integrating emerging AI tooling into the creative process.</p><br>',
  nonNegotiables: [
    '3‑5 years of experience in visual or motion design for digital products',
    'Strong portfolio of high‑impact UI/UX visual design and motion thinking',
    'Exposure or curiosity with AI‑assisted design tools',
  ],
  workMode: 'Hybrid',
  baseLocation: 'Dubai, United Arab Emirates',
  hireType: 'Permanent',
  hireTypeDetails: 'Full‑time mid‑senior level position',
  recruitmentTimeline: 3,
  stages: 2,
  assessments: 'Portfolio review and design challenge',
  requiredDocs: 'CV, design portfolio, cover letter',
  interviewMode: 'In Person',
  decisionProcess: 'Portfolio evaluation > Challenge > Final interview',
  currency: 'AED',
  salaryBudget: 24000,
  bonusStructure: 'Annual performance bonus',
  standardBenefits:
    '4 days in office, 1 WFH; unlimited vacation; healthcare benefits and fitness reimbursements',
  salaryReviewCycle: 'Bi-annual',
  trainingOpportunities:
    'Access to design conferences, internal training, mentorship',
  careerProgression: 'Pathway to Senior Designer or Design Lead roles',
  companyPerks:
    'Opportunity to learn from inspiring colleagues; flexible and purpose‑driven culture',
  vacancyTermsAndConditionsAgreed: true,
  vacancyBudgetTermsAndConditionsAgreed: true,
  // ... (your existing default data)
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
  const [newVacancyData, setNewVacancyData] = useState(defaultNewVacancyData)
  const [dataLoaded, setDataLoaded] = useState(false)
  const { user } = useAuth()

  // Memoize writeDataToLocalStorage to ensure stable reference
  const writeDataToLocalStorage = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVacancyData))
  }, [newVacancyData])

  // Read from local storage and initialize data
  const readFromLocalStorage = useCallback(() => {
    const dataString = localStorage.getItem(LOCAL_STORAGE_KEY)
    let newData: NewVacancyInitialValuesType = defaultNewVacancyData

    if (dataString) {
      const validated = vacancyInitialValuesSchema.safeParse(
        JSON.parse(dataString),
      )
      newData = validated.success ? validated.data : defaultNewVacancyData
    }

    if (user?.clientProfile) {
      const userData = {
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
      }
      newData = { ...newData, ...userData }
    }

    // Only update state if data has changed
    setNewVacancyData((prev) => {
      if (areObjectsEqual(prev, newData)) {
        return prev
      }
      return newData
    })
  }, [user]) // Depend only on user

  // Initialize data on mount or when user changes
  useEffect(() => {
    if (user !== undefined) {
      readFromLocalStorage()
      setDataLoaded(true)
    }
  }, [user, readFromLocalStorage])

  // Write to local storage when newVacancyData changes, but only if dataLoaded
  useEffect(() => {
    if (dataLoaded) {
      writeDataToLocalStorage()
    }
  }, [newVacancyData, dataLoaded, writeDataToLocalStorage])

  const updateVacancyData = useCallback(
    (vacancyDetails: Partial<VacancyAgencyData>) => {
      setNewVacancyData((prev) => {
        const updatedData = { ...prev, ...vacancyDetails }
        if (areObjectsEqual(prev, updatedData)) {
          return prev
        }
        return updatedData
      })
    },
    [],
  )

  const resetData = useCallback(() => {
    setNewVacancyData(defaultNewVacancyData)
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }, [])

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

// 'use client'

// import {
//   createContext,
//   ReactNode,
//   use,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'

// import {
//   NewVacancyInitialValuesType,
//   VacancyAgencyData,
//   vacancyInitialValuesSchema,
// } from '@/common/zod-schemas/jobs/schemas'
// import { useAuth } from './auth/auth-context'
// import { CompanyType } from '@/common/models'

// const defaultNewVacancyData: NewVacancyInitialValuesType = {
// maxCvs: 10,
// deadline: '2025-07-29T23:59:59.000Z',
// cvPriceBudget: undefined,
// totalBudget: undefined,
// notifyParties: [],
// companyType: 'company',
// companyName: 'Careem',
// legalName: 'Careem Networks FZ LLC',
// companyDescription:
//   '<h3>Who we are</h3><p>Careem is a leading technology platform that simplifies everyday life across the Middle East...</p><br>\n<h3>What we do</h3><p>We offer ride-hailing, food and grocery delivery, payments, and more — all in one app...</p><br>\n<h3>Our mission</h3><p>To simplify and improve the lives of people and build an awesome organization...</p><br>\n<h3>Our vision</h3><p>To be the region’s everyday Super App...</p><br>',
// companyCulture:
//   '<h3>Our Culture</h3><p>We embrace curiosity, ownership, and impact-driven innovation...</p><br>\n<h3>Our Core Values</h3><p>Be of service, act like owners, champion diversity, and build trust...</p><br>\n<h3>Management Style</h3><p>Collaborative, agile, and mission-led...</p><br>',
// tagline: 'The Everything App',
// industry: 'Technology / Mobility',
// orgType: 'Private',
// yearFounded: '2012',
// companySize: '5,001–10,000',
// headquarters: 'Dubai, UAE',
// website: 'https://www.careem.com',
// primaryContactName: 'Mudassir Sheikha',
// primaryContactPosition: 'CEO & Co-founder',
// primaryContactPhone: '0000000000',
// jobTitle: 'Visual Designer I',
// jobDescription:
//   '<h3>Role Overview</h3>\n<p>Shape the visual identity across Careem’s suite of products. This role spans interface design, visual storytelling, motion, and brand expression.</p><br>\n<h3>Responsibilities</h3>\n<p>Design expressive user interfaces, develop and maintain visual systems (illustration, iconography, typography), and create detailed handoffs for implementation—including motion design when needed.</p><br>\n<h3>Collaboration</h3>\n<p>Work closely with product designers, engineers, and brand teams to ensure visual consistency and innovation across the Careem experience.</p><br>\n<h3>Challenges</h3>\n<p>Balancing fast-paced iteration with long-term visual design excellence, and integrating emerging AI tooling into the creative process.</p><br>',
// nonNegotiables: [
//   '3‑5 years of experience in visual or motion design for digital products',
//   'Strong portfolio of high‑impact UI/UX visual design and motion thinking',
//   'Exposure or curiosity with AI‑assisted design tools',
// ],
// workMode: 'Hybrid',
// baseLocation: 'Dubai, United Arab Emirates',
// hireType: 'Permanent',
// hireTypeDetails: 'Full‑time mid‑senior level position',
// recruitmentTimeline: 3,
// stages: 2,
// assessments: 'Portfolio review and design challenge',
// requiredDocs: 'CV, design portfolio, cover letter',
// interviewMode: 'In Person',
// decisionProcess: 'Portfolio evaluation > Challenge > Final interview',
// currency: 'AED',
// salaryBudget: 24000,
// bonusStructure: 'Annual performance bonus',
// standardBenefits:
//   '4 days in office, 1 WFH; unlimited vacation; healthcare benefits and fitness reimbursements',
// salaryReviewCycle: 'Bi-annual',
// trainingOpportunities:
//   'Access to design conferences, internal training, mentorship',
// careerProgression: 'Pathway to Senior Designer or Design Lead roles',
// companyPerks:
//   'Opportunity to learn from inspiring colleagues; flexible and purpose‑driven culture',
// vacancyTermsAndConditionsAgreed: true,
// vacancyBudgetTermsAndConditionsAgreed: true,
// }

// type NewVacancyDataContextType = {
//   newVacancyData: NewVacancyInitialValuesType
//   updateVacancyData: (vacancyDetails: Partial<VacancyAgencyData>) => void
//   dataLoaded: boolean
//   resetData: () => void
// }

// const LOCAL_STORAGE_KEY = 'multi-step-form-createNewVacancy'

// export const NewVacancyContext =
//   createContext<NewVacancyDataContextType | null>(null)

// export const NewVacancyDataProvider = ({
//   children,
// }: {
//   children: ReactNode
// }) => {
//   const [newVacancyData, setNewVacancyData] =
//     useState<NewVacancyInitialValuesType>(defaultNewVacancyData)
//   const [dataLoaded, setDataLoaded] = useState(false)
//   const { user } = useAuth()

//   const writeDataToLocalStorage = useCallback(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newVacancyData))
//   }, [newVacancyData])

//   useEffect(() => {
//     if (dataLoaded) {
//       writeDataToLocalStorage()
//     }
//   }, [newVacancyData, dataLoaded, writeDataToLocalStorage])

//   // useEffect(() => {
//   //   if (!user?.clientProfile || !dataLoaded) return

//   //   const newValues = {
//   //     companyType: user.clientProfile.companyType as CompanyType,
//   //     companyName: user.clientProfile.companyName,
//   //     legalName: user.clientProfile.legalName,
//   //     companyDescription: user.clientProfile.overview,
//   //     companyCulture: user.clientProfile.companyCultureDescription,
//   //     tagline: user.clientProfile.tagline,
//   //     industry: user.clientProfile.industry,
//   //     orgType: user.clientProfile.orgType,
//   //     yearFounded: user.clientProfile.yearFounded,
//   //     companySize: user.clientProfile.companySize,
//   //     headquarters: user.clientProfile.headquarters,
//   //     website: user.clientProfile.website,
//   //     primaryContactName: user.clientProfile.primaryContactName,
//   //     primaryContactPosition: user.clientProfile.primaryContactPosition,
//   //     primaryContactPhone: user.clientProfile.primaryContactPhone,
//   //   }

//   //   const isSame = Object.entries(newValues).every(
//   //     ([key, value]) =>
//   //       newVacancyData[key as keyof typeof newVacancyData] === value,
//   //   )

//   //   if (!isSame) {
//   //     updateVacancyData(newValues)
//   //   }
//   // }, [user, dataLoaded])

//   useEffect(() => {
//     if (user !== undefined) {
//       readFromLocalStorage()
//       setDataLoaded(true)
//     }
//   }, [user])

//   const readFromLocalStorage = () => {
//     const dataString = localStorage.getItem(LOCAL_STORAGE_KEY)
//     let newData

//     if (!dataString) {
//       newData = defaultNewVacancyData
//     } else {
//       const validated = vacancyInitialValuesSchema.safeParse(
//         JSON.parse(dataString),
//       )
//       newData = validated.success ? validated.data : defaultNewVacancyData
//     }

//     if (user?.clientProfile) {
//       const userData = {
//         companyType: user.clientProfile.companyType as CompanyType,
//         companyName: user.clientProfile.companyName,
//         legalName: user.clientProfile.legalName,
//         companyDescription: user.clientProfile.overview,
//         companyCulture: user.clientProfile.companyCultureDescription,
//         tagline: user.clientProfile.tagline,
//         industry: user.clientProfile.industry,
//         orgType: user.clientProfile.orgType,
//         yearFounded: user.clientProfile.yearFounded,
//         companySize: user.clientProfile.companySize,
//         headquarters: user.clientProfile.headquarters,
//         website: user.clientProfile.website,
//         primaryContactName: user.clientProfile.primaryContactName,
//         primaryContactPosition: user.clientProfile.primaryContactPosition,
//         primaryContactPhone: user.clientProfile.primaryContactPhone,
//       }

//       newData = { ...newData, ...userData }
//     }

//     setNewVacancyData((prev) => {
//       const isSame = JSON.stringify(prev) === JSON.stringify(newData)
//       return isSame ? prev : newData
//     })
//   }

//   const updateVacancyData = (vacancyDetails: Partial<VacancyAgencyData>) => {
//     setNewVacancyData((prev) => ({ ...prev, ...vacancyDetails }))
//   }

//   const resetData = () => {
//     setNewVacancyData(defaultNewVacancyData)
//     localStorage.removeItem(LOCAL_STORAGE_KEY)
//   }

//   return (
//     <NewVacancyContext.Provider
//       value={{
//         newVacancyData,
//         updateVacancyData,
//         resetData,
//         dataLoaded,
//       }}
//     >
//       {children}
//     </NewVacancyContext.Provider>
//   )
// }

// export function useNewVacancyContext() {
//   const context = useContext(NewVacancyContext)
//   if (!context) {
//     throw new Error(
//       'useNewVacancyContext must be used within a NewVacancyProvider',
//     )
//   }
//   return context
// }
