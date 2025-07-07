import clsx from 'clsx'

import { Button } from '@/components/salient/Button'
import { Container } from '@/components/salient/Container'
import backgroundImage from '@/images/howItWorks_bg.png'
import Image from 'next/image'
import Plan from '../custom/home/pricing/Plan'
import RightPlan from '../custom/home/pricing/RightPlan'
import LeftPlan from '../custom/home/pricing/LeftPlan'
import LonglisterPlan from '../custom/home/pricing/LonglisterPlan'

function SwirlyDoodle(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 281 40"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
      />
    </svg>
  )
}

export function Pricing() {
  return (
    <section
      id="about"
      aria-label="Pricing"
      className="relative overflow-hidden bg-transparent py-20 sm:py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] overflow-clip"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="md:text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl sm:text-balance">
            <span className="relative whitespace-nowrap">
              <SwirlyDoodle className="absolute top-1/2 left-0 h-[1em] w-full fill-brand-coral" />
              <span className="relative text-brand-red">The GAP</span>
            </span>{' '}
            {'we&apos;re filling'}
          </h2>
          <p className="mx-auto mt-8 max-w-4xl text-lg text-brand-dark">
            Right now, you’ve got two options for finding talent.{' '}
            <span className="font-semibold text-brand-red">
              Longlister sits perfectly in the middle.{' '}
            </span>
            We combine the reach and flexibility of job ads with the expertise
            of experienced recruiters without the high costs or long contracts.
            {
              '  It’s the first platform built for businesses who want quality hires,'
            }
            fast and without breaking the bank.
          </p>
        </div>
        <div className="group -mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          <div className="transition-transform duration-300 group-hover:-rotate-4 hover:rotate-0">
            <LeftPlan
              name="Cheap but flooded with unqualified applicants"
              price="Job Adverts"
              description="Good for anyone who is self-employed and just getting started."
              href="/register"
              features={[
                'Get flooded with irrelevant or unqualified CVs',
                'Waste hours screening & filtering applicants manually',
                'No human touch – no one actively headhunting for you',
                'Attract passive or low-intent candidates',
                'Hard to stand out unless you pay to boost visibility',
              ]}
            />
          </div>
          <div className="transition-transform duration-300 group-hover:scale-101">
            <LonglisterPlan
              featured
              name="Better quality, but expensive and slow"
              price="Longlister"
              description="Perfect for small / medium sized businesses."
              href="/register"
              features={[
                'Vetted freelance recruiters on demand',
                'Faster than ads, cheaper than agencies',
                'Choose your own timeline and budget',
                'No fixed contracts, no costly retainers',
                'Flexible, smart pricing based on urgency',
              ]}
            />
          </div>
          <div className="transition-transform duration-300 group-hover:rotate-4 hover:rotate-0">
            <RightPlan
              name="Better quality, but expensive and slow"
              price=" Agencies "
              description="For even the biggest enterprise companies."
              href="/register"
              features={[
                'Large fees or long-term retainers',
                'Lack of transparency on candidate sourcing',
                'Slow turnaround times – especially for niche roles',
                'Rigid processes that don’t flex to your business needs',
                'Limited control – you wait while they &apos;work their list&apos;',
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
