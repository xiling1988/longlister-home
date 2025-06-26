'use client'

import Image from 'next/image'

import { Button } from '@/components/salient/Button'
import { Container } from '@/components/salient/Container'
import { useState } from 'react'
import { BookingModal } from '../custom/common/BookingModal'
import { ReactTyped } from 'react-typed'

export function Hero() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Container className="h-[calc(100vh-6rem)] bg-brand-cream pt-20 pb-16 text-center lg:pt-32">
      <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
        Recruitment just got <br />
        <span className="relative whitespace-nowrap text-brand-red">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-brand-coral"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">
            {' '}
            <ReactTyped
              backSpeed={70}
              startWhenVisible={true}
              strings={['SMARTER', 'FASTER', 'CHEAPER', 'LEANER', 'SAFER']}
              typeSpeed={70}
              loop
              loopCount={Infinity}
              showCursor={true}
            />
          </span>
        </span>{' '}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
        Longlister gives you access to top freelance recruiters who deliver
        great candidates, fast – without the high agency fees or wasted job ads.
      </p>
      <div className="mt-10 flex justify-center gap-x-6">
        <Button color="brand-red" onClick={() => setShowModal(true)}>
          Book a Demo
        </Button>

        <Button variant="outline" href="/register" color="brand-red">
          Get started now!
        </Button>
      </div>
      <BookingModal open={showModal} onClose={() => setShowModal(false)} />
    </Container>
  )
}
