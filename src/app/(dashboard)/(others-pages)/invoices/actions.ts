'use server'
import { STRIPE_SECRET_KEY } from '@/common/constants'
import { Invoice } from '@/components/tailAdmin/invoice/InvoiceListTable'
import getMe from '@/context/auth/get-me'
import Stripe from 'stripe'

export interface InvoiceLineItem {
  id: string
  description: string | null
  amount: number
  quantity: number | null
  currency: string
}

export interface InvoiceDetails {
  id: string
  number: string
  customer: {
    name?: string
    email?: string
    address?: Stripe.Address | null
  }
  amount: number
  status: Stripe.Invoice.Status | 'draft'
  created: number
  dueDate?: number | null
  hostedInvoiceUrl: string
  invoicePdfUrl: string
  jobId: string
  jobTitle: string
  cvCount: number
  lineItems: InvoiceLineItem[]
}

export async function getStripeInvoices() {
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  })
  const user = await getMe({ next: { tags: ['user-profile'] } })
  if (user.userType !== 'recruiter') {
    return []
  }

  const stripeCustomerId = await user?.clientProfile?.stripeCustomerId
  if (!stripeCustomerId) {
    return []
  }

  const invoices = await stripe.invoices.list({
    customer: stripeCustomerId,
    limit: 100, // Adjust as needed or paginate
  })

  return invoices.data.map((invoice) => ({
    id: invoice.id!,
    number: invoice.number || '',
    customer: stripeCustomerId,
    amount: invoice.amount_due / 100,
    status: invoice.status || 'draft',
    created: invoice.created,
    hostedInvoiceUrl: invoice.hosted_invoice_url || '',
    invoicePdfUrl: invoice.invoice_pdf || '',
    jobId: invoice.metadata?.jobId || '',
    jobTitle: invoice.metadata?.jobTitle || '',
    cvCount: Number(invoice.metadata?.cvCount) || 0, // ✅ fixed
  }))
}

export async function getStripeInvoiceById(
  id: string,
): Promise<InvoiceDetails | null> {
  const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2025-06-30.basil',
  })
  const user = await getMe({ next: { tags: ['user-profile'] } })

  const stripeCustomerId = user?.clientProfile?.stripeCustomerId
  if (!stripeCustomerId) return null

  try {
    const invoice = await stripe.invoices.retrieve(id, {
      expand: ['customer'],
    })

    if (invoice.customer !== stripeCustomerId) return null

    const lineItems = await stripe.invoices.listLineItems(id)
    const mappedLineItems: InvoiceLineItem[] = lineItems.data.map((item) => ({
      id: item.id,
      description: item.description,
      amount: item.amount / 100,
      quantity: item.quantity,
      currency: item.currency,
    }))

    return {
      id: invoice.id!,
      number: invoice.number || '',
      customer: {
        name: (invoice.customer as Stripe.Customer)?.name || '',
        email: (invoice.customer as Stripe.Customer)?.email || '',
        address: (invoice.customer as Stripe.Customer)?.address || null,
      },
      amount: invoice.amount_due / 100,
      status: invoice.status || 'draft',
      created: invoice.created,
      dueDate: invoice.due_date,
      hostedInvoiceUrl: invoice.hosted_invoice_url || '',
      invoicePdfUrl: invoice.invoice_pdf || '',
      jobId: invoice.metadata?.jobId ?? '',
      jobTitle: invoice.metadata?.jobTitle || '',
      cvCount: Number(invoice.metadata?.cvCount) || 0,
      lineItems: mappedLineItems,
    }
  } catch (error) {
    console.error('Error retrieving invoice:', error)
    return null
  }
}
