import { z } from 'zod'

export const candidateSchema = z.object({
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
  noticePeriod: z
    .string()
    .min(1, { message: 'Notice period is required.' }) // Ensures input is not empty
    .transform((val) => Number(val)) // ✅ Converts string to number before validation
    .refine((num) => num >= 0, {
      message: 'Notice period must be at least 0 months.',
    })
    .refine((num) => num <= 36, {
      message: 'Notice period cannot exceed 36 months.',
    }),
  currentSalary: z.string().optional(),
  expectedSalary: z.string().optional(),
})
