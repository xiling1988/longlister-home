import PageBreadcrumb from '@/components/tailAdmin/common/PageBreadCrumb'
import InvoiceListTable from '@/components/tailAdmin/invoice/InvoiceListTable'
import InvoiceMetrics from '@/components/tailAdmin/invoice/InvoiceMetrics'
import { Metadata } from 'next'
import React from 'react'
import { getStripeInvoices } from './actions'

export const metadata: Metadata = {
  title:
    'Next.js E-commerce  Invoices | TailAdmin - Next.js Dashboard Template',
  description:
    'This is Next.js E-commerce  Invoices TailAdmin Dashboard Template',
}

export default async function InvoicesPage() {
  const invoices = await getStripeInvoices()
  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">No Invoices Found</h1>
        <p className="text-gray-500">You have no invoices at this time.</p>
      </div>
    )
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Invoices" />
      <InvoiceMetrics />
      <InvoiceListTable invoices={invoices} />
    </div>
  )
}
