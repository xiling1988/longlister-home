import * as z from 'zod'

export const vacancyCompanyInfoSchema = z.object({
  companyType: z.enum(['company', 'agency']),
  companyName: z.string().min(1, 'Company name is required'),
  legalName: z.string().optional(),
  companyDescription: z
    .string()
    .min(10, 'Description must be at least 10 characters'),
  companyCulture: z.string().optional(),
  tagline: z
    .string()
    .max(100, 'Tagline must be at most 100 characters')
    .optional(),
  industry: z.string().min(1, 'Industry is required'),
  orgType: z.string().min(1, 'Company type is required'),
  yearFounded: z
    .string()
    .regex(/^(19|20)\d{2}$/, 'Please enter a valid year (e.g., 1999, 2023)')
    .optional(),
  companySize: z.string().min(1, 'Company size is required'),
  headquarters: z.string().min(3, 'Headquarters location is required'),
  website: z.string().url('Must be a valid company website URL').optional(),
  primaryContactName: z.string().min(2, 'Primary contact name is required'),
  primaryContactPosition: z.string().min(2, 'Position is required'),
  primaryContactPhone: z
    .string()
    .min(6, 'Primary contact phone number is required'),
})

export const vacancyRoleResponsibilitiesSchema = z.object({
  jobTitle: z.string().min(3, 'Job title is required'),
  jobDescription: z.string().min(1, 'Job Responsibilities are required'),
  nonNegotiables: z
    .union([
      z.array(z.string()).min(3, { message: 'At least 3 items are required' }),
      z
        .string()
        .transform((val) => {
          try {
            const parsed = JSON.parse(val)
            if (
              Array.isArray(parsed) &&
              parsed.every((item) => typeof item === 'string')
            ) {
              return parsed
            }
          } catch (error) {
            // If parsing fails, return an empty array
          }
          return []
        })
        .pipe(
          z.array(z.string()).min(3, {
            message: 'At least 3 Non Negotiables are required',
          }),
        ),
    ])
    .default([]), // Ensures it's always an array, even if missing
})

export const vacancyRemunerationSchema = z.object({
  salaryBudget: z
    .number()
    .min(0, 'Salary budget must be higher than 0')
    .optional(),
  // salaryNegotiable: z.coerce.boolean(),
  bonusStructure: z.string().optional(),
  standardBenefits: z.string().optional(),
  salaryReviewCycle: z.string().optional(),
  trainingOpportunities: z.string().optional(),
  careerProgression: z.string().optional(),
  companyPerks: z.string().optional(),
})

export const vacancyRecruitmentProcessSchema = z.object({
  recruitmentTimeline: z.coerce
    .number()
    .min(1, 'Recruitment timeline is required'),
  stages: z.coerce.number().min(1, 'At least one stage is required'),
  assessments: z.string().optional(),
  requiredDocs: z.string().optional(),
  interviewMode: z.enum(['In Person', 'Online', 'Phone']),
  decisionProcess: z.string().optional(),
  notifyParties: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, 'Name is required for each notification recipient'),
        email: z.string().email('Must be a valid email address'),
      }),
    )
    .optional()
    .default([]),
})

export const vacancyBudgetSchema = z.object({
  maxCvs: z.coerce.number().min(1, 'At least one CV is required'),
  deadline: z.string().min(1, 'Deadline target is required'),
  totalBudget: z.number().optional(),
  cvPriceBudget: z.number().optional(),
})

export const vacancyInitialValuesSchema = z.object({
  companyType: z.string().optional(),
  companyName: z.string().optional(),
  legalName: z.string().optional(),
  tagline: z.string().optional(),
  industry: z.string().optional(),
  orgType: z.string().optional(),
  yearFounded: z.string().optional(),
  companySize: z.string().optional(),
  headquarters: z.string().optional(),
  website: z.string().optional(),
  primaryContactName: z.string().optional(),
  primaryContactPosition: z.string().optional(),
  primaryContactPhone: z.string().optional(),
  companyDescription: z.string().optional(),
  companyCulture: z.string().optional(),

  notifyParties: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Must be a valid email address'),
      }),
    )
    .optional()
    .default([]),

  jobTitle: z.string().optional(),
  jobDescription: z.string().optional(),
  workMode: z.enum(['Remote', 'Hybrid', 'On-site']).optional(),
  baseLocation: z.string().optional(),
  hireType: z.enum(['Permanent', 'Contract', 'Part-time']).optional(),
  hireTypeDetails: z.string().optional(),
  initialGoals: z.string().optional(),
  reportingTo: z.string().optional(),
  teamCollaboration: z.string().optional(),
  toolsUsed: z.string().optional(),
  growthOpportunities: z.string().optional(),
  challenges: z.string().optional(),
  successMetrics: z.string().optional(),
  requiredSkills: z.string().optional(),
  // Array of strings for niceToHaveSkills:
  nonNegotiables: z.array(z.string()).optional(),

  // niceToHaveSkills: z.string().optional(),

  recruitmentTimeline: z.number().optional(),
  stages: z.number().optional(),
  stakeholders: z.string().optional(),
  assessments: z.string().optional(),
  requiredDocs: z.string().optional(),
  interviewMode: z.enum(['In Person', 'Online', 'Phone']).optional(),
  decisionProcess: z.string().optional(),
  candidateTips: z.string().optional(),
  currency: z.string().optional(),
  salaryBudget: z
    .number()
    .min(0, 'Salary budget must be higher than 0')
    .optional(),
  salaryNegotiable: z.boolean().optional(),
  bonusStructure: z.string().optional(),
  standardBenefits: z.string().optional(),
  salaryReviewCycle: z.string().optional(),
  trainingOpportunities: z.string().optional(),
  careerProgression: z.string().optional(),
  companyPerks: z.string().optional(),

  maxCvs: z.number().optional(),
  deadline: z.string().optional(),
  totalBudget: z.number().optional(),
  cvPriceBudget: z.number().optional(),

  vacancyTermsAndConditionsAgreed: z.boolean().optional(),
  vacancyBudgetTermsAndConditionsAgreed: z.boolean().optional(),
})

export const vacancyAgencySchema = z.object({
  ...vacancyBudgetSchema.shape,
  ...vacancyCompanyInfoSchema.shape,
  ...vacancyRoleResponsibilitiesSchema.shape,
  ...vacancyRecruitmentProcessSchema.shape,
  ...vacancyRemunerationSchema.shape,
  companyType: z.enum(['company', 'agency']),
})
export const vacancyCompanySchema = z.object({
  ...vacancyBudgetSchema.shape,
  // ...vacancyCompanyInfoSchema.shape,     // Removed as direct companies already have this data
  ...vacancyRoleResponsibilitiesSchema.shape,
  ...vacancyRecruitmentProcessSchema.shape,
  ...vacancyRemunerationSchema.shape,
  companyType: z.enum(['company', 'agency']),
  vacancyTermsAndConditionsAgreed: z.boolean().refine((val) => val === true, {
    message: 'Terms and conditions must be agreed',
  }),
  vacancyBudgetTermsAndConditionsAgreed: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Budget terms and conditions must be agreed',
    }),
})

export type NewVacancyInitialValuesType = z.infer<
  typeof vacancyInitialValuesSchema
>
export type VacancyAgencyData = z.infer<typeof vacancyAgencySchema>
export type VacancyCompanyData = z.infer<typeof vacancyCompanySchema>
