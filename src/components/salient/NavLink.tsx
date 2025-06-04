import Link from 'next/link'

export function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm text-brand-dark transition-all hover:bg-brand-red-faint hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
