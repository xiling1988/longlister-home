import ResetPassword from '@/components/custom/pageComponents/ResetPasswordPage'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  )
}
