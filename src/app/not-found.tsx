import Link from 'next/link'

import { Button } from '@/components/salient/Button'
import { SlimLayout } from '@/layout/salient/SlimLayout'
import Image from 'next/image'
import FullLogo from '@/images/full_logo_red.png'

export default function NotFound() {
  return (
    <SlimLayout>
      <div className="mx-auto w-full">
        <Link href="/home" aria-label="Home">
          <Image
            src={FullLogo}
            alt="Full Logo"
            className="h-auto w-full"
            unoptimized
            width={40}
            height={40}
          />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button href="/" className="mt-10">
        Go back home
      </Button>
    </SlimLayout>
  )
}
