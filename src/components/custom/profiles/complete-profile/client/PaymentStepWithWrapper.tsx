'use client'

import CompanyPaymentPageWrapper from '@/context/CompanyPaymentPageWrapper'
import React from 'react'
import CompanyPaymentDetails from './CompanyPaymentDetailsForm'
import { Step, StepComponentProps } from '../CompleteProfileFormLayout'

function PaymentStepWithWrapper({ ...props }: StepComponentProps) {
  return (
    <CompanyPaymentPageWrapper>
      <CompanyPaymentDetails {...props} />
    </CompanyPaymentPageWrapper>
  )
}

export default PaymentStepWithWrapper
