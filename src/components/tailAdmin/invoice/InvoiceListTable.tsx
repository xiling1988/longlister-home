'use client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import TableDropdown from '../common/TableDropdown'

export interface Invoice {
  id: string
  number: string
  amount: number
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'
  created: number
  hostedInvoiceUrl: string
  invoicePdfUrl: string
  customer: string

  // Optional Stripe metadata fields
  jobId?: string
  jobTitle?: string
  cvCount?: number
}

interface SortState {
  sortBy: 'customer' | 'creationDate' | 'dueDate' | 'total'
  sortDirection: 'asc' | 'desc'
}

// const initialInvoices: Invoice[] = [
//   {
//     id: 1,
//     number: '#323534',
//     customer: 'Lindsey Curtis',
//     creationDate: 'August 7, 2028',
//     dueDate: 'February 28, 2028',
//     total: 999,
//     status: 'Paid',
//   },
//   {
//     id: 2,
//     number: '#323535',
//     customer: 'John Doe',
//     creationDate: 'July 1, 2028',
//     dueDate: 'January 1, 2029',
//     total: 1200,
//     status: 'Unpaid',
//   },
//   {
//     id: 3,
//     number: '#323536',
//     customer: 'Jane Smith',
//     creationDate: 'June 15, 2028',
//     dueDate: 'December 15, 2028',
//     total: 850,
//     status: 'Draft',
//   },
//   {
//     id: 4,
//     number: '#323537',
//     customer: 'Michael Brown',
//     creationDate: 'May 10, 2028',
//     dueDate: 'November 10, 2028',
//     total: 1500,
//     status: 'Paid',
//   },
//   {
//     id: 5,
//     number: '#323538',
//     customer: 'Emily Davis',
//     creationDate: 'April 5, 2028',
//     dueDate: 'October 5, 2028',
//     total: 700,
//     status: 'Unpaid',
//   },
//   {
//     id: 6,
//     number: '#323539',
//     customer: 'Chris Wilson',
//     creationDate: 'March 1, 2028',
//     dueDate: 'September 1, 2028',
//     total: 1100,
//     status: 'Paid',
//   },
//   {
//     id: 7,
//     number: '#323540',
//     customer: 'Jessica Lee',
//     creationDate: 'February 20, 2028',
//     dueDate: 'August 20, 2028',
//     total: 950,
//     status: 'Draft',
//   },
//   {
//     id: 8,
//     number: '#323541',
//     customer: 'David Kim',
//     creationDate: 'January 15, 2028',
//     dueDate: 'July 15, 2028',
//     total: 1300,
//     status: 'Paid',
//   },
//   {
//     id: 9,
//     number: '#323542',
//     customer: 'Sarah Clark',
//     creationDate: 'December 10, 2027',
//     dueDate: 'June 10, 2028',
//     total: 800,
//     status: 'Unpaid',
//   },
//   {
//     id: 10,
//     number: '#323543',
//     customer: 'Matthew Lewis',
//     creationDate: 'November 5, 2027',
//     dueDate: 'May 5, 2028',
//     total: 1400,
//     status: 'Paid',
//   },
//   {
//     id: 11,
//     number: '#323544',
//     customer: 'Olivia Walker',
//     creationDate: 'October 1, 2027',
//     dueDate: 'April 1, 2028',
//     total: 1200,
//     status: 'Draft',
//   },
//   {
//     id: 12,
//     number: '#323545',
//     customer: 'Daniel Hall',
//     creationDate: 'September 20, 2027',
//     dueDate: 'March 20, 2028',
//     total: 1000,
//     status: 'Paid',
//   },
//   {
//     id: 13,
//     number: '#323546',
//     customer: 'Sophia Allen',
//     creationDate: 'August 15, 2027',
//     dueDate: 'February 15, 2028',
//     total: 900,
//     status: 'Unpaid',
//   },
//   {
//     id: 14,
//     number: '#323547',
//     customer: 'James Young',
//     creationDate: 'July 10, 2027',
//     dueDate: 'January 10, 2028',
//     total: 1600,
//     status: 'Paid',
//   },
//   {
//     id: 15,
//     number: '#323548',
//     customer: 'Ava Hernandez',
//     creationDate: 'June 5, 2027',
//     dueDate: 'December 5, 2027',
//     total: 1050,
//     status: 'Draft',
//   },
//   {
//     id: 16,
//     number: '#323549',
//     customer: 'William King',
//     creationDate: 'May 1, 2027',
//     dueDate: 'November 1, 2027',
//     total: 1150,
//     status: 'Paid',
//   },
//   {
//     id: 17,
//     number: '#323550',
//     customer: 'Mia Wright',
//     creationDate: 'April 20, 2027',
//     dueDate: 'October 20, 2027',
//     total: 980,
//     status: 'Unpaid',
//   },
//   {
//     id: 18,
//     number: '#323551',
//     customer: 'Benjamin Lopez',
//     creationDate: 'March 15, 2027',
//     dueDate: 'September 15, 2027',
//     total: 1250,
//     status: 'Paid',
//   },
//   {
//     id: 19,
//     number: '#323552',
//     customer: 'Charlotte Hill',
//     creationDate: 'February 10, 2027',
//     dueDate: 'August 10, 2027',
//     total: 890,
//     status: 'Draft',
//   },
//   {
//     id: 20,
//     number: '#323553',
//     customer: 'Elijah Scott',
//     creationDate: 'January 5, 2027',
//     dueDate: 'July 5, 2027',
//     total: 1350,
//     status: 'Paid',
//   },
//   {
//     id: 21,
//     number: '#323554',
//     customer: 'Amelia Green',
//     creationDate: 'December 1, 2026',
//     dueDate: 'June 1, 2027',
//     total: 1020,
//     status: 'Unpaid',
//   },
//   {
//     id: 22,
//     number: '#323555',
//     customer: 'Lucas Adams',
//     creationDate: 'November 20, 2026',
//     dueDate: 'May 20, 2027',
//     total: 1120,
//     status: 'Paid',
//   },
//   {
//     id: 23,
//     number: '#323556',
//     customer: 'Harper Nelson',
//     creationDate: 'October 15, 2026',
//     dueDate: 'April 15, 2027',
//     total: 970,
//     status: 'Draft',
//   },
//   {
//     id: 24,
//     number: '#323557',
//     customer: 'Henry Carter',
//     creationDate: 'September 10, 2026',
//     dueDate: 'March 10, 2027',
//     total: 1280,
//     status: 'Paid',
//   },
//   {
//     id: 25,
//     number: '#323558',
//     customer: 'Evelyn Mitchell',
//     creationDate: 'August 5, 2026',
//     dueDate: 'February 5, 2027',
//     total: 1080,
//     status: 'Unpaid',
//   },
// ]

const FilterDropdown: React.FC<{
  showFilter: boolean
  setShowFilter: (show: boolean) => void
}> = ({ showFilter, setShowFilter }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowFilter(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [setShowFilter])

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs sm:w-auto sm:min-w-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
        onClick={() => setShowFilter(!showFilter)}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M14.6537 5.90414C14.6537 4.48433 13.5027 3.33331 12.0829 3.33331C10.6631 3.33331 9.51206 4.48433 9.51204 5.90415M14.6537 5.90414C14.6537 7.32398 13.5027 8.47498 12.0829 8.47498C10.663 8.47498 9.51204 7.32398 9.51204 5.90415M14.6537 5.90414L17.7087 5.90411M9.51204 5.90415L2.29199 5.90411M5.34694 14.0958C5.34694 12.676 6.49794 11.525 7.91777 11.525C9.33761 11.525 10.4886 12.676 10.4886 14.0958M5.34694 14.0958C5.34694 15.5156 6.49794 16.6666 7.91778 16.6666C9.33761 16.6666 10.4886 15.5156 10.4886 14.0958M5.34694 14.0958L2.29199 14.0958M10.4886 14.0958L17.7087 14.0958"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Filter
      </button>
      {showFilter && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-5">
            <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <input
              type="text"
              className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Search category..."
            />
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
              Customer
            </label>
            <input
              type="text"
              className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
              placeholder="Search customer..."
            />
          </div>
          <button className="h-10 w-full rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600">
            Apply
          </button>
        </div>
      )}
    </div>
  )
}

interface InvoiceListTableProps {
  invoices: Invoice[]
}

const InvoiceListTable: React.FC<InvoiceListTableProps> = ({ invoices }) => {
  const [selected, setSelected] = useState<number[]>([])
  const [sort, setSort] = useState<SortState>({
    sortBy: 'customer',
    sortDirection: 'asc',
  })
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterStatus, setFilterStatus] = useState<
    'All' | 'Unpaid' | 'Draft' | 'Paid'
  >('All')
  const [search, setSearch] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const itemsPerPage: number = 10

  const filteredInvoices: Invoice[] = useMemo(() => {
    const statusMap: Record<string, Invoice['status']> = {
      Unpaid: 'open',
      Draft: 'draft',
      Paid: 'paid',
    }
    return filterStatus === 'All'
      ? invoices
      : invoices.filter((invoice) => invoice.status === statusMap[filterStatus])
  }, [invoices, filterStatus])

  const searchedInvoices: Invoice[] = React.useMemo(() => {
    return filteredInvoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(search.toLowerCase()),
    )
  }, [filteredInvoices, search])

  const sortedInvoices: Invoice[] = React.useMemo(() => {
    return [...searchedInvoices].sort((a, b) => {
      let valA: string | number
      let valB: string | number

      switch (sort.sortBy) {
        case 'customer':
          valA = a.customer
          valB = b.customer
          break
        case 'creationDate':
          valA = (a as any).creationDate ?? ''
          valB = (b as any).creationDate ?? ''
          break
        case 'dueDate':
          valA = (a as any).dueDate ?? ''
          valB = (b as any).dueDate ?? ''
          break
        case 'total':
          valA = (a as any).total ?? 0
          valB = (b as any).total ?? 0
          break
        default:
          valA = ''
          valB = ''
      }

      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()

      if (valA < valB) return sort.sortDirection === 'asc' ? -1 : 1
      if (valA > valB) return sort.sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [searchedInvoices, sort])

  const paginatedInvoices: Invoice[] = sortedInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const totalPages: number =
    Math.ceil(sortedInvoices.length / itemsPerPage) || 1
  const startEntry: number =
    sortedInvoices.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endEntry: number = Math.min(
    currentPage * itemsPerPage,
    sortedInvoices.length,
  )

  const visiblePages: number[] = React.useMemo(() => {
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [currentPage, totalPages])

  const toggleSelectAll = (): void => {
    if (
      paginatedInvoices.length > 0 &&
      paginatedInvoices.every((i) => selected.includes(Number(+i.id)))
    ) {
      setSelected([])
    } else {
      setSelected(paginatedInvoices.map((i) => Number(+i.id)))
    }
  }

  const toggleRow = (id: number): void => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const sortBy = (
    field: 'customer' | 'creationDate' | 'dueDate' | 'total',
  ): void => {
    setSort((prev) => ({
      sortBy: field,
      sortDirection:
        prev.sortBy === field && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }))
    setCurrentPage(1)
  }

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  const nextPage = (): void => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const previousPage = (): void => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Invoices
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your most recent invoices list
          </p>
        </div>
        <div className="flex gap-3.5">
          <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
            <button
              onClick={() => {
                setFilterStatus('All')
                setCurrentPage(1)
              }}
              className={`h-10 rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${
                filterStatus === 'All'
                  ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              All Invoices
            </button>
            <button
              onClick={() => {
                setFilterStatus('Unpaid')
                setCurrentPage(1)
              }}
              className={`h-10 rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${
                filterStatus === 'Unpaid'
                  ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Unpaid
            </button>
            <button
              onClick={() => {
                setFilterStatus('Draft')
                setCurrentPage(1)
              }}
              className={`h-10 rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-900 dark:hover:text-white ${
                filterStatus === 'Draft'
                  ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Draft
            </button>
          </div>
          <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
            <div className="relative">
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
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
                    d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
              />
            </div>
            <FilterDropdown
              showFilter={showFilter}
              setShowFilter={setShowFilter}
            />
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 shadow-theme-xs sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M16.6671 13.3333V15.4166C16.6671 16.1069 16.1074 16.6666 15.4171 16.6666H4.58301C3.89265 16.6666 3.33301 16.1069 3.33301 15.4166V13.3333M10.0013 3.33325L10.0013 13.3333M6.14553 7.18708L9.99958 3.33549L13.8539 7.18708"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="custom-scrollbar overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
              <th className="p-4 whitespace-nowrap">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                      <span className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={
                            paginatedInvoices.length > 0 &&
                            paginatedInvoices.every((i) =>
                              selected.includes(+i.id),
                            )
                          }
                          onChange={toggleSelectAll}
                        />
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                            paginatedInvoices.length > 0 &&
                            paginatedInvoices.every((i) =>
                              selected.includes(+i.id),
                            )
                              ? 'border-brand-500 bg-brand-500'
                              : 'border-gray-300 bg-transparent dark:border-gray-700'
                          }`}
                        >
                          <span
                            className={
                              paginatedInvoices.length > 0 &&
                              paginatedInvoices.every((i) =>
                                selected.includes(+i.id),
                              )
                                ? ''
                                : 'opacity-0'
                            }
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="1.6666"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </label>
                    <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                      Invoice Number
                    </p>
                  </div>
                </div>
              </th>
              {/* <th
                className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400"
                onClick={() => sortBy('customer')}
              >
                <div className="flex items-center gap-3">
                  <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                    Customer
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.sortBy === 'customer' &&
                        sort.sortDirection === 'asc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.sortBy === 'customer' &&
                        sort.sortDirection === 'desc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </th> */}
              <th
                className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400"
                onClick={() => sortBy('creationDate')}
              >
                <div className="flex items-center gap-3">
                  <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                    Creation Date
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.sortBy === 'creationDate' &&
                        sort.sortDirection === 'asc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.sortBy === 'creationDate' &&
                        sort.sortDirection === 'desc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </th>
              {/* <th
                className="cursor-pointer p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400"
                onClick={() => sortBy('dueDate')}
              >
                <div className="flex items-center gap-3">
                  <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                    Due Date
                  </p>
                  <span className="flex flex-col gap-0.5">
                    <svg
                      className={
                        sort.sortBy === 'dueDate' &&
                        sort.sortDirection === 'asc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      className={
                        sort.sortBy === 'dueDate' &&
                        sort.sortDirection === 'desc'
                          ? 'text-gray-500'
                          : 'text-gray-300'
                      }
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </div>
              </th> */}
              <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
                Vacancy
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
                Total
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
                Status
              </th>
              <th className="p-4 text-left text-xs font-medium text-gray-700 dark:text-gray-400">
                <div className="relative">
                  <span className="sr-only">Action</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-x divide-y divide-gray-200 dark:divide-gray-800">
            {paginatedInvoices.map((invoice: Invoice) => (
              <tr
                key={invoice.id}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="p-4 whitespace-nowrap">
                  <div className="group flex items-center gap-3">
                    <label className="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                      <span className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selected.includes(Number(invoice.id))}
                          onChange={() => toggleRow(Number(invoice.id))}
                        />
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                            selected.includes(Number(invoice.id))
                              ? 'border-brand-500 bg-brand-500'
                              : 'border-gray-300 bg-transparent dark:border-gray-700'
                          }`}
                        >
                          <span
                            className={
                              selected.includes(Number(invoice.id))
                                ? ''
                                : 'opacity-0'
                            }
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="1.6666"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </span>
                      </span>
                    </label>
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="text-theme-xs font-medium text-gray-700 group-hover:underline dark:text-gray-400"
                    >
                      {invoice.number}
                    </Link>
                  </div>
                </td>
                {/* <td className="p-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    {invoice.customer}
                  </span>
                </td> */}
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {new Date(invoice.created * 1000).toLocaleDateString(
                      'en-GB',
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </td>
                {/* <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {invoice.dueDate}
                  </p>
                </td> */}
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {invoice.jobTitle}
                  </p>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    ${invoice.amount}
                  </p>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`rounded-full px-2 py-0.5 text-theme-xs font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
                        : invoice.status === 'uncollectible'
                          ? 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400'
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="dropdown relative flex justify-center">
                    <TableDropdown
                      dropdownButton={
                        <button className="text-gray-500 dark:text-gray-400">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      }
                      dropdownContent={
                        <>
                          <Link
                            href={invoice.hostedInvoiceUrl}
                            target="_blank"
                            className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            View More
                          </Link>
                          <Link
                            href={invoice.invoicePdfUrl}
                            className="flex w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                          >
                            Download PDF
                          </Link>
                        </>
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center justify-between border-t border-gray-200 px-5 py-4 sm:flex-row dark:border-gray-800">
        <div className="pb-4 sm:pb-0">
          <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="text-gray-800 dark:text-white/90">
              {startEntry}
            </span>{' '}
            to{' '}
            <span className="text-gray-800 dark:text-white/90">{endEntry}</span>{' '}
            of{' '}
            <span className="text-gray-800 dark:text-white/90">
              {sortedInvoices.length}
            </span>
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray-50 p-4 sm:w-auto sm:justify-normal sm:bg-transparent sm:p-0 dark:bg-white/[0.03] dark:sm:bg-transparent">
          <button
            className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${
              currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={previousPage}
            disabled={currentPage === 1}
          >
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
                d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
                fill=""
              />
            </svg>
          </button>
          <span className="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <ul className="hidden items-center gap-0.5 sm:flex">
            {visiblePages.map((page) => (
              <li key={page}>
                <button
                  onClick={() => goToPage(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                    page === currentPage
                      ? 'bg-brand-500 text-white'
                      : 'text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                <li>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 dark:text-gray-400">
                    ...
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-brand-500 hover:text-white dark:text-gray-400 dark:hover:text-white"
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}
          </ul>
          <button
            className={`flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 ${
              currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
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
                d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceListTable
