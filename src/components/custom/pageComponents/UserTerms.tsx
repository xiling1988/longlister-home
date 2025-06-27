import { Footer } from '@/components/salient/Footer'
import { Header } from '@/components/salient/Header'
import { CheckCircleIcon, InfoIcon } from 'lucide-react'

export default function UserTerms() {
  return (
    <>
      <Header />
      <div className="bg-brand-cream px-6 py-32 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <p className="text-base/7 font-semibold text-brand-coral">
            Legal Notice
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Longlister.com Platform Terms
          </h1>
          <p className="mt-6 text-xl/8">
            These terms govern the use of Longlister.com for both clients and
            freelance recruiters. By using the platform, you agree to abide by
            the following conditions and understand that these terms may be
            updated periodically. The agreement is governed by the laws of the
            United Arab Emirates (UAE).
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
              Client Terms
            </h2>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Engage freelance recruiters on a pay-per-CV basis, paying only
                  for CVs you approve for download at the end of the agreed
                  timeframe.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Set the budget, maximum number of CVs, and timeframe for each
                  job you post.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Acknowledge that all submissions come from independent
                  freelance recruiters; Longlister.com acts solely as an
                  intermediary and does not guarantee candidate suitability.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Assume responsibility for all hiring decisions, background
                  checks, and verifying the suitability of candidates.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Understand that payment is processed automatically at the end
                  of the timeframe via your selected payment method.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Refunds are only issued for duplicate, unusable, or invalid
                  CVs; disputes must be raised in writing within 7 days of
                  invoice.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Avoid circumventing the platform by approaching recruiters or
                  candidates directly; doing so may incur fees or penalties.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Confirm that you have authority within your company to approve
                  spending and job postings.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Longlister.com reserves the right to suspend or terminate accounts
              for non-payment, misuse, or breach of terms. Continued use of the
              platform constitutes acceptance of any updates to these terms.
            </p>

            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
              Freelance Recruiter Terms
            </h2>
            <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Provide genuine, accurate, and up-to-date CVs matching the
                  client’s stated role and requirements.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Be financially registered with Longlister.com and provide
                  valid payment details to receive payments.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Understand that payment is only made for CVs approved and
                  downloaded by the client within the set timeframe.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Accept any platform commission or fee deduction that may apply
                  to approved CVs.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Submit only candidates you have legal rights to represent,
                  complying with data protection and confidentiality laws.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Avoid submitting spam, low-quality, or irrelevant CVs.
                  Repeated violations may result in withheld payments and
                  account suspension.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Treat all client and candidate information as confidential and
                  do not use it outside the platform.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Acknowledge that Longlister.com acts as a neutral intermediary
                  and does not guarantee job placements.
                </span>
              </li>
            </ul>
            <p className="mt-8">
              Payments will typically be made within 30 days after client
              approval and payment clearance. Continued use signals acceptance
              of any updated terms.
            </p>

            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
              Job Posting Terms for Clients
            </h2>
            <p className="mt-6">Before posting a job, clients must confirm:</p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You will only be charged for CVs you approve for download at
                  the end of the set timeframe.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You must clearly set the budget, maximum CVs, and timeframe in
                  the job post.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You are responsible for reviewing and approving CVs within the
                  timeframe; failure to act may result in automatic closure
                  without refunds.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You authorize Longlister.com to process payment automatically
                  for approved CVs when the timeframe ends.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Any disputes must be raised within 7 days of invoice.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  Longlister.com provides access only to recruiter-supplied
                  candidates and is not responsible for candidate accuracy,
                  legality, or performance.
                </span>
              </li>
            </ul>

            <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
              CV Upload Confirmation for Recruiters
            </h2>
            <p className="mt-6">
              Before uploading CVs, recruiters must confirm:
            </p>
            <ul role="list" className="mt-6 max-w-xl space-y-8 text-gray-600">
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You are financially registered with Longlister.com and have
                  provided up-to-date payment details.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You understand payment will only be made for CVs approved and
                  downloaded by the client within the set timeframe.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You are submitting genuine, properly vetted candidates whom
                  you have the legal right to represent.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You agree that repeated submission of false, irrelevant, or
                  duplicate CVs may result in suspension and withheld payments.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You accept that Longlister.com may deduct applicable platform
                  fees or commissions from your payouts.
                </span>
              </li>
              <li className="flex gap-x-3">
                <CheckCircleIcon
                  aria-hidden="true"
                  className="mt-1 size-5 flex-none text-brand-coral"
                />
                <span>
                  You recognise that platform terms are periodically updated and
                  that continued use constitutes acceptance.
                </span>
              </li>
            </ul>

            <figure className="border-brand-cotext-brand-coral mt-16 border-l pl-9">
              <blockquote className="font-semibold text-gray-900">
                <p>
                  Longlister.com will maintain a separate Privacy Policy and
                  Cookie Policy detailing how user and candidate data is
                  collected, stored, and processed, including compliance with
                  relevant laws such as GDPR.
                </p>
              </blockquote>
            </figure>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
