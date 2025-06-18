import CompanyDetails from '@/components/custom/profiles/complete-profile/client/CompanyDetailsForm'
import CompanyPaymentDetails from '@/components/custom/profiles/complete-profile/client/CompanyPaymentDetailsForm'
import CompanyProfileAndCulture from '@/components/custom/profiles/complete-profile/client/CompanyProfileAndCultureForm'
import CompanyProfileReview from '@/components/custom/profiles/complete-profile/client/CompanyProfileReviewForm'
import PaymentStepWithWrapper from '@/components/custom/profiles/complete-profile/client/PaymentStepWithWrapper'
import { StepComponentProps } from '@/components/custom/profiles/complete-profile/CompleteProfileFormLayout'
import RecruiterPersonalDetails from '@/components/custom/profiles/complete-profile/recruiter/RecruiterPersonalDetailsForm'
import RecruiterProfile from '@/components/custom/profiles/complete-profile/recruiter/RecruiterProfileForm'
import RecruiterProfileReview from '@/components/custom/profiles/complete-profile/recruiter/RecruiterProfileReviewForm'
import VacancyRoleResponsibilitiesForm from '@/components/custom/vacancies/create-vacancy/VacancyRoleResponsibilitiesForm'
import { DollarLineIcon } from '@/icons'
import { CalendarSearchIcon, InfoIcon } from 'lucide-react'

export const RECRUITER_PROFILE_STEPS = [
  {
    title: 'Personal Information',
    component: RecruiterPersonalDetails,
    icon: InfoIcon,
  },
  {
    title: 'Recruiter Profile',
    component: RecruiterProfile,
    icon: DollarLineIcon,
  },
  {
    title: 'Profile Review',
    component: RecruiterProfileReview,
    icon: CalendarSearchIcon,
  },
]

export const CLIENT_PROFILE_STEPS = [
  {
    title: 'Company Details',
    component: CompanyDetails,
    icon: InfoIcon,
  },
  {
    title: 'Company Profile & Culture',
    component: CompanyProfileAndCulture,
    icon: DollarLineIcon,
  },
  {
    title: 'Payment Details',
    component: PaymentStepWithWrapper,
    icon: CalendarSearchIcon,
  },
  {
    title: 'Profile Review',
    component: CompanyProfileReview,
    icon: CalendarSearchIcon,
  },
]
