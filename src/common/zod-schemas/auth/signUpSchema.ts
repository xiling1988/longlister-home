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

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, {
      message: 'This password reset link is invalid or has expired',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Confirm password must be at least 6 characters',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // 👈 error will appear under confirmPassword field
  })

export const changeEmailSchema = z.object({
  email: z.string().refine((val) => email().safeParse(val).success, {
    message: 'Invalid email address',
  }),
  // confirmChangeEmail must be true to proceed with email change
  confirmChangeEmail: z
    .preprocess((val) => val === 'on', z.boolean())
    .refine((val) => val === true, {
      message: 'You must confirm the change of email address',
    }),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: 'Current password must be at least 6 characters',
    }),
    newPassword: z.string().min(6, {
      message: 'New password must be at least 6 characters',
    }),
    confirmNewPassword: z.string().min(6, {
      message: 'Confirm new password must be at least 6 characters',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords don't match",
    path: ['confirmNewPassword'], // 👈 error will appear under confirmNewPassword field
  })
