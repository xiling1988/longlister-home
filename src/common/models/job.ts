import { CandidateOnJob } from './candidate'
import { RecruiterOnJob } from './recruiter-on-job'

export interface Job {
  id: string | undefined
  createdAt: string | undefined
  userType: string | undefined
  clientId: string

  companyType: string | undefined
  companyDescription: string | undefined
  companyCulture: string | undefined
  logo: string | undefined

  jobTitle: string | undefined
  jobDescription: string | undefined
  nonNegotiables: string[] | undefined
  workMode: 'Remote' | 'Hybrid' | 'On-site' | undefined
  baseLocation: string | undefined
  hireType: 'Permanent' | 'Contract' | 'Part-time' | undefined
  hireTypeDetails: string | undefined

  notifyParties:
    | {
        name: string
        email: string
      }[]
    | undefined

  companyName: string | undefined
  legalName: string | undefined
  tagline: string | undefined
  orgType: string | undefined
  yearFounded: string | undefined
  companySize: string | undefined
  headquarters: string | undefined
  website: string | undefined
  primaryContactName: string | undefined
  primaryContactPosition: string | undefined
  primaryContactPhone: string | undefined

  industry: string | undefined
  status: string | undefined

  salaryBudget: number
  bonusStructure?: string
  standardBenefits?: string
  salaryReviewCycle?: string
  trainingOpportunities?: string
  careerProgression?: string
  companyPerks?: string

  recruitmentTimeline: number
  stages?: number
  stakeholders?: string
  assessments?: string
  requiredDocs?: string
  interviewMode?: string
  decisionProcess?: string

  maxCvs: number
  deadline: string | undefined
  candidates: CandidateOnJob[]
  cvPriceBudget: number
  totalBudget: number
  currentTotal: number

  recruiters: RecruiterOnJob[]
}
