import { type Metadata } from 'next'
import LoginPage from '@/components/custom/pageComponents/loginPage'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function page() {
  return <LoginPage />
}
