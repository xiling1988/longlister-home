import { InvoiceDetails } from '@/app/(dashboard)/(others-pages)/invoices/actions'
import Button from '../ui/button/Button'
import InvoiceTable from './InvoiceTable'

interface InvoiceDetailsProps {
  invoice: InvoiceDetails | null
}

export default function InvoiceMain({ invoice }: InvoiceDetailsProps) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 className="text-theme-xl font-medium text-gray-800 dark:text-white/90">
          Invoice
        </h3>

        <h4 className="text-base font-medium text-gray-700 dark:text-gray-400">
          {invoice?.number || 'Invoice Number'}
        </h4>
      </div>

      <div className="p-5 xl:p-8">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              From
            </span>

            <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
              Pimjo LLC
            </h5>

            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              1280, Clair Street, <br />
              Massachusetts, New York - 02543
            </p>

            <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Issued On:
            </span>

            <span className="block text-sm text-gray-500 dark:text-gray-400">
              11 March, 2027
            </span>
          </div>

          <div className="h-px w-full bg-gray-200 sm:h-[158px] sm:w-px dark:bg-gray-800"></div>

          <div className="sm:text-right">
            <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">
              To
            </span>

            <h5 className="mb-2 text-base font-semibold text-gray-800 dark:text-white/90">
              Albert Word
            </h5>

            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              355, Shobe Lane <br />
              Colorado, Fort Collins - 80543
            </p>

            <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Due On:
            </span>

            <span className="block text-sm text-gray-500 dark:text-gray-400">
              16 March, 2027
            </span>
          </div>
        </div>

        {/* <!-- Invoice Table Start --> */}
        <InvoiceTable />
        {/* <!-- Invoice Table End --> */}

        <div className="my-6 border-b border-gray-100 pb-6 text-right dark:border-gray-800">
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            Sub Total amount: $3,098
          </p>
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            Vat (10%): $312
          </p>

          <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Total : $3,410
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline">Proceed to payment</Button>

          <Button>
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.99578 4.08398C6.58156 4.08398 6.24578 4.41977 6.24578 4.83398V6.36733H13.7542V5.62451C13.7542 5.42154 13.672 5.22724 13.5262 5.08598L12.7107 4.29545C12.5707 4.15983 12.3835 4.08398 12.1887 4.08398H6.99578ZM15.2542 6.36902V5.62451C15.2542 5.01561 15.0074 4.43271 14.5702 4.00891L13.7547 3.21839C13.3349 2.81151 12.7733 2.58398 12.1887 2.58398H6.99578C5.75314 2.58398 4.74578 3.59134 4.74578 4.83398V6.36902C3.54391 6.41522 2.58374 7.40415 2.58374 8.61733V11.3827C2.58374 12.5959 3.54382 13.5848 4.74561 13.631V15.1665C4.74561 16.4091 5.75297 17.4165 6.99561 17.4165H13.0041C14.2467 17.4165 15.2541 16.4091 15.2541 15.1665V13.6311C16.456 13.585 17.4163 12.596 17.4163 11.3827V8.61733C17.4163 7.40414 16.4561 6.41521 15.2542 6.36902ZM4.74561 11.6217V12.1276C4.37292 12.084 4.08374 11.7671 4.08374 11.3827V8.61733C4.08374 8.20312 4.41953 7.86733 4.83374 7.86733H15.1663C15.5805 7.86733 15.9163 8.20312 15.9163 8.61733V11.3827C15.9163 11.7673 15.6269 12.0842 15.2541 12.1277V11.6217C15.2541 11.2075 14.9183 10.8717 14.5041 10.8717H5.49561C5.08139 10.8717 4.74561 11.2075 4.74561 11.6217ZM6.24561 12.3717V15.1665C6.24561 15.5807 6.58139 15.9165 6.99561 15.9165H13.0041C13.4183 15.9165 13.7541 15.5807 13.7541 15.1665V12.3717H6.24561Z"
                fill=""
              />
            </svg>
            Print
          </Button>
        </div>
      </div>
    </div>
  )
}
