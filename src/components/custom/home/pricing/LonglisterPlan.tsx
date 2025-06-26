import { Button } from '@/components/salient/Button'
import clsx from 'clsx'
import Image from 'next/image'
import longlisterWords from '@/images/word_logo_red.png'
import Badge from '@/components/tailAdmin/ui/badge/Badge'

function CheckIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        'h-6 w-6 flex-none fill-current stroke-current',
        className,
      )}
      {...props}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function LonglisterPlan({
  name,
  price,
  description,
  href,
  features,
  featured = false,
}: {
  name: string
  price: string
  description: string
  href: string
  features: Array<string>
  featured?: boolean
}) {
  return (
    <section
      className={clsx(
        'flex flex-col rounded-3xl px-6 sm:px-8',
        featured
          ? 'order-first border-1 border-brand-red bg-brand-cream py-8 shadow-2xl lg:order-none'
          : 'lg:py-8',
      )}
    >
      <Image
        src={longlisterWords}
        height={100}
        width={100}
        alt={`${name} logo`}
        unoptimized
        className="mt-4 mb-6 h-16 w-auto object-cover"
      />
      {/* <h3 className="font-display mt-5 text-center text-lg text-brand-dark">
        {name}
      </h3> */}
      {/* <p
        className={clsx(
          'mt-2 text-center text-base',
          featured ? 'text-brand-dark' : 'text-brand-dark',
        )}
      >
        {description}
      </p> */}

      <ul
        role="list"
        className={clsx(
          'mt-10 flex flex-col gap-y-3 text-left text-sm',
          featured ? 'text-white' : 'text-slate-200',
        )}
      >
        {features.map((feature) => (
          <li key={feature} className="mx-auto flex text-left">
            <Badge
              variant="light"
              color="light"
              className="bg-brand-cream text-brand-coral"
              startIcon={<CheckIcon className="" />}
            >
              {/* <CheckIcon
                className={featured ? 'text-brand-red' : 'text-slate-400'}
              /> */}
              <span className="">{feature}</span>
            </Badge>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        variant="solid"
        color="brand-red"
        className="mt-8 transition-transform duration-200 hover:scale-105"
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button>
    </section>
  )
}
