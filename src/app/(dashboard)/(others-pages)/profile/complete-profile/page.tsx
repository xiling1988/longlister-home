import CompleteProfilePage from '@/components/custom/pageComponents/CompleteProfilePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Profile',
  description: 'This is Next.js Home for TailAdmin Dashboard Template',
}

export default async function Page() {
  return <CompleteProfilePage />
}
