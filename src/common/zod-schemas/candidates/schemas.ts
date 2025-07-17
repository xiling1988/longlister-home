import { z } from 'zod'

export const candidateSchema = z
  .object({
    cv: z
      .instanceof(File, { message: 'CV is required.' })
      .refine(
        (file) =>
          file.type === 'application/pdf' ||
          file.type ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        {
          message: 'Only PDF or DOCX files are allowed.',
        },
      ),
    location: z.string().min(2, { message: 'Location is required.' }),
    noticePeriod: z.coerce
      .number({ invalid_type_error: 'Notice period must be a number.' })
      .min(0, { message: 'Notice period must be at least 0 months.' })
      .max(36, { message: 'Notice period cannot exceed 36 months.' }),
    currency: z.string().optional(),
    currentSalary: z.coerce
      .number({ invalid_type_error: 'Current salary must be a number.' })
      .optional()
      .transform((val) => (Number.isNaN(val) ? undefined : val))
      .refine((val) => val === undefined || val >= 0, {
        message: 'Current salary must be a positive number.',
      }),
    expectedSalary: z.coerce
      .number({ invalid_type_error: 'Expected salary must be a number.' })
      .optional()
      .transform((val) => (Number.isNaN(val) ? undefined : val))
      .refine((val) => val === undefined || val >= 0, {
        message: 'Expected salary must be a positive number.',
      }),
  })
  .refine(
    (data) => !(data.currentSalary || data.expectedSalary) || !!data.currency,
    {
      message: 'Currency is required when a salary field is provided.',
      path: ['currency'],
    },
  )

// import { z } from 'zod'

// export const candidateSchema = z.object({
//   cv: z
//     .instanceof(File, { message: 'CV is required.' })
//     .refine(
//       (file) =>
//         file.type === 'application/pdf' ||
//         file.type ===
//           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       {
//         message: 'Only PDF or DOCX files are allowed.',
//       },
//     ),
//   location: z.string().min(2, { message: 'Location is required.' }),
//   noticePeriod: z
//     .string()
//     .min(1, { message: 'Notice period is required.' }) // Ensures input is not empty
//     .transform((val) => Number(val)) // ✅ Converts string to number before validation
//     .refine((num) => num >= 0, {
//       message: 'Notice period must be at least 0 months.',
//     })
//     .refine((num) => num <= 36, {
//       message: 'Notice period cannot exceed 36 months.',
//     }),
//   currency: z.string().min(1, { message: 'Currency is required.' }),
//   currentSalary: z.string().optional(),
//   expectedSalary: z.string().optional(),
// })
