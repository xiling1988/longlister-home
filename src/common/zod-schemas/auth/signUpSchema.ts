import { z } from 'zod'
import { email } from 'zod/v4'

export const signUpSchema = z.object({
  userType: z.enum(['recruiter', 'client'], {
    required_error: 'Company type is required',
  }),
  email: z.string().refine((val) => email().safeParse(val).success, {
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
})

export const loginSchema = z.object({
  email: z.string().refine((val) => email().safeParse(val).success, {
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
})

export const forgotPasswordSchema = z.object({
  email: z.string().refine((val) => email().safeParse(val).success, {
    message: 'Invalid email address',
  }),
})
