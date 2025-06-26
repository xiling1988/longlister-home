import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-10 text-center dark:bg-gray-900">
      <div className="rounded-2xl bg-white p-10 shadow-xl dark:bg-gray-800">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
          SUCCESS!
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          {message || 'Your action was successful!'}
        </p>
        <Link
          href="/"
          className="rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
        >
          Back to Dashboard
        </Link>
      </div>
      <footer className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Longlister. All rights reserved.
      </footer>
    </div>
  )
}
