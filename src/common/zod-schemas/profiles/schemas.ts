import { stripHtml } from '@/common/util/helpers'
import { z } from 'zod'

//////////////////////////// Recruiter Profile Schemas ////////////////////////////

export const recruiterProfileSchema = z.object({
  recruitingExperience: z.string().min(1, 'Recruiting experience is required'),

  industry: z.string().min(1, 'Industry is required'),

  bio: z.string().refine((html) => stripHtml(html).length > 100, {
    message: 'Recruiter Bio description must be at least 100 characters',
  }),
})

export const recruiterPersonalDetailsSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),

  phoneNumber: z
    .string()
    .min(6, 'Phone number must be at least 6 digits')
    .regex(/^\d+$/, 'Phone number must contain only numbers'),

  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),

  linkedIn: z.string().url('Must be a valid LinkedIn profile URL').optional(),

  website: z.string().url('Must be a valid URL').optional(),
  avatar: z.string().optional(),
})

export const recruiterProfileInitialValuesSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  industry: z.string().optional(),
  recruitingExperience: z.string().optional(),
  linkedIn: z.string().optional(),
  bio: z.string().optional(),
  phoneNumber: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  website: z.string().url().optional(),
  avatar: z.string().optional(),
})

export const recruiterCompleteProfileSchema = z.object({
  ...recruiterPersonalDetailsSchema.shape,
  ...recruiterProfileSchema.shape,
})

export type RecruiterProfileData = z.infer<
  typeof recruiterCompleteProfileSchema
>
export type RecruiterProfileInitialValuesType = z.infer<
  typeof recruiterProfileInitialValuesSchema
>

// //////////////////////////// Client Profile Schemas ////////////////////////////

export const companyDetailsSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  legalName: z.string().optional(),

  // logo: z
  //   .instanceof(File, { message: 'Logo image file must be uploaded' })
  //   .refine(
  //     (file) => file.size <= 5 * 1024 * 1024,
  //     'Logo must be less than 5MB',
  //   )
  //   .refine(
  //     (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
  //     'Logo must be a valid image file (JPEG, JPG, or PNG)',
  //   ),

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

  // Contact Information
  primaryContactName: z.string().min(2, 'Primary contact name is required'),
  primaryContactPosition: z.string().min(2, 'Position is required'),
  primaryContactPhone: z
    .string()
    .min(6, 'Primary contact phone number is required'),
})

// ✅ Helper function to remove HTML tags for validation

export const companyProfileSchema = z.object({
  overview: z.string().refine((html) => stripHtml(html).length > 100, {
    message: 'Company overview must be at least 10 characters',
  }),

  companyCultureDescription: z
    .string()
    .refine((html) => stripHtml(html).length > 100, {
      message: 'Company culture description must be at least 10 characters',
    }),
})

export const cardHolderNameSchema = z.object({
  cardHolderName: z
    .string()
    .min(2, 'Cardholder name must be at least 2 characters'),
})
export const companyPaymentMethodSchema = z.object({
  cardHolderName: z
    .string()
    .min(2, 'Cardholder name must be at least 2 characters'),

  stripePaymentMethodId: z.string().min(1, 'Payment method is missing'),
  stripeCustomerId: z.string().optional(),
})

// The companyProfileInitialValues includes all the individual fields from the three schemas above but as  zod optional fields:
export const CompanyProfileInitialValuesSchema = z.object({
  companyType: z.string().optional(),
  companyName: z.string().optional(),
  legalName: z.string().optional(),
  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024, // Skip check if file is undefined
      { message: 'Logo must be less than 5MB' },
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png'].includes(file.type), // Skip check if file is undefined
      { message: 'Logo must be a JPG or PNG image' },
    ),
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
  overview: z.string().optional(),
  companyCultureDescription: z.string().optional(),
  cardHolderName: z.string().optional(),
  stripePaymentMethodId: z.string().optional(),
})

export const userCredentialsSchema = z.object({
  email: z.string().email('Must be a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const completeCompanyProfileSchema = z.object({
  ...companyDetailsSchema.shape,
  ...companyProfileSchema.shape,
  ...companyPaymentMethodSchema.shape,
})
export const completeAgencyProfileSchema = z.object({
  ...companyDetailsSchema.shape,
  ...companyPaymentMethodSchema.shape,
})

export type CompanyProfileData = z.infer<typeof completeCompanyProfileSchema>
export type AgencyProfileData = z.infer<typeof completeAgencyProfileSchema>
export type CompanyProfileInitialValuesType = z.infer<
  typeof CompanyProfileInitialValuesSchema
>
