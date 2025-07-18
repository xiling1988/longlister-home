import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import { AuthProvider } from '@/context/auth/auth-provider'

export const metadata: Metadata = {
  title: {
    template: '%s - Longlister',
    default: 'Longlister - Recruitment Revolution',
  },
  description:
    'Longlister connects companies with top freelance recruiters, making hiring faster, more flexible, and performance-based—only pay when you hire.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <html
        lang="en"
        className={clsx(
          'h-full scroll-smooth bg-transparent antialiased',
          inter.variable,
          lexend.variable,
        )}
      >
        <body className="flex h-full flex-col">{children}</body>
      </html>
    </AuthProvider>
  )
}
