'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/salient/Button'
import { Container } from '@/components/salient/Container'
import { NavLink } from '@/components/salient/NavLink'
import Image from 'next/image'
import fullLogoRed from '../../images/full_logo_red.png'
import wordLogoRed from '../../images/word_logo_red.png'
import { useAuth } from '@/context/auth/auth-context'
import UserDropdown from '../tailAdmin/header/UserDropdown'
function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  const { user } = useAuth()
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-brand-cream opacity-80 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-brand-cream p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="#about">About</MobileNavLink>
        <MobileNavLink href="#howItWorks">How it works</MobileNavLink>
        <MobileNavLink href="#recruiters">Recruiters</MobileNavLink>
        <MobileNavLink href="#faqs">FAQs</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        {user ? (
          <MobileNavLink href="/">Dashboard</MobileNavLink>
        ) : (
          <>
            <MobileNavLink href="/login">Sign in</MobileNavLink>
            <MobileNavLink href="/register">Get started</MobileNavLink>
          </>
        )}
      </PopoverPanel>
    </Popover>
  )
}

export function Header({ transparent = false }: { transparent?: boolean }) {
  const { user } = useAuth()
  console.log('LOGGING USER', user)
  return (
    <header className={`${transparent ? 'bg-transparent' : 'bg-brand-cream'}`}>
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/home" aria-label="Home">
              <Image
                height={100}
                width={100}
                src={fullLogoRed}
                unoptimized
                alt="Longlister Logo"
                className="hidden h-20 w-auto lg:inline-block"
              />
              <Image
                height={40}
                width={40}
                src={wordLogoRed}
                unoptimized
                alt="Longlister Logo"
                className="h-14 w-auto lg:hidden"
              />
              {/* <Logo className="h-10 w-auto" /> */}
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/home/#about">About</NavLink>
              <NavLink href="/home/#howItWorks">How it works</NavLink>
              <NavLink href="/home/#recruiters">Recruiters</NavLink>
              <NavLink href="/home/#faqs">FAQs</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {user ? (
              <UserDropdown />
            ) : (
              <>
                <div className="hidden md:block">
                  <NavLink href="/login">Sign in</NavLink>
                </div>
                <Button href="/register" color="brand-red">
                  <span>
                    Get started <span className="hidden lg:inline">today</span>
                  </span>
                </Button>
              </>
            )}
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
