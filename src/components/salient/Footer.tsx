import Link from 'next/link'

import { Container } from '@/components/salient/Container'
import redLogo from '@/images/full_logo_red.png'
import { NavLink } from '@/components/salient/NavLink'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-brand-cream">
      <Container>
        <div className="py-16">
          <Image
            height={40}
            width={160}
            unoptimized
            src={redLogo}
            alt="TaxPal Logo"
            className="mx-auto h-16 w-auto"
          />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="#howItWorks">Hiring</NavLink>
              <NavLink href="#recruiters">Recruiters</NavLink>
              <NavLink href="#faqs">FAQs</NavLink>
              <NavLink href="legal/user-terms">Terms and Conditions</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex items-baseline gap-x-6">
            <Link
              href="#"
              className="group items-center"
              aria-label="Longlister on X"
            >
              <svg
                className="h-9 w-9 fill-slate-500 group-hover:fill-brand-red"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Longlister. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
