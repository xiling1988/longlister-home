import { get } from 'http'
import React from 'react'
import { getStripeInvoiceById } from '../actions'
import { PageProps } from '../../../../../../.next/types/app/(dashboard)/(others-pages)/vacancies/page'
import InvoiceMain from '@/components/tailAdmin/invoice/InvoiceMain'
import { notFound } from 'next/navigation'

export default async function page({ params }: PageProps) {
  const { id } = await params
  const invoice = await getStripeInvoiceById(id)

  console.log('logging invoice:', invoice)
  return (
    <>
      <InvoiceMain invoice={invoice} />
    </>
  )
}
