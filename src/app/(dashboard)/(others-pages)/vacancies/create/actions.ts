'use server'

import { FormErrors } from '@/common/util/errors'
import {
  vacancyRemunerationSchema,
  vacancyRoleResponsibilitiesSchema,
} from '@/common/zod-schemas/jobs/schemas'

export async function newVacancyRoleResponsibilitiesAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())
  const validation = vacancyRoleResponsibilitiesSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }
  console.log('✅ Valid form submission:', validation.data)
  return { success: true }
}

export async function newVacancyRemunerationAction(
  _prevState:
    | { errors: FormErrors; success?: undefined }
    | { success: boolean; errors?: undefined },
  formData: FormData,
): Promise<
  | { errors: any; success?: undefined }
  | { success: boolean; errors?: undefined }
> {
  const data = Object.fromEntries(formData.entries())
  const validation = vacancyRemunerationSchema.safeParse(data)

  if (!validation.success) {
    const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
      acc[issue.path[0]] = issue.message
      return acc
    }, {})
    console.log('❌ Invalid form submission:', errors)
    return { errors }
  }

  console.log('✅ Valid form submission:', validation.data)

  return { success: true }
}
