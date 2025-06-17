// 'use server'

// import { JOBS_API_URL } from '@/common/constants'
// import { FormErrors, UploadFormState } from '@/common/util/errors'
// import { getHeaders } from '@/common/util/fetch'
// import { candidateSchema } from '@/common/zod-schemas/candidates/schemas'

// export async function uploadCandidateSubmission(
//   _prevState: UploadFormState,
//   formData: FormData,
// ): Promise<UploadFormState> {
//   console.log('testing from the server side.')
//   console.log(formData)

//   // Convert FormData to an object
//   const data = Object.fromEntries(formData.entries())

//   const validation = candidateSchema.safeParse(data)

//   if (!validation.success) {
//     const errors = validation.error.issues.reduce((acc: FormErrors, issue) => {
//       acc[issue.path[0]] = issue.message
//       return acc
//     }, {})

//     return { errors }
//   }

//   try {
//     const headers = await getHeaders()

//     // If the validation is successful, send the original FormData to the server via our custom post function (which takes in a formData Object for the body of the request)
//     console.log('📤 Submitting to:', `${JOBS_API_URL}/candidates`)
//     const response = await fetch(`${JOBS_API_URL}/candidates`, {
//       method: 'POST',
//       headers,
//       body: formData,
//     })

//     let parsedRes
//     try {
//       const contentType = response.headers.get('content-type') || ''
//       const isJson = contentType.includes('application/json')
//       const text = await response.text()

//       if (!text) {
//         // Body is empty
//         throw new Error('Empty response body')
//       }

//       parsedRes = isJson ? JSON.parse(text) : { message: text }

//       // parsedRes = await response.json()

//       if (!response.ok) {
//         return {
//           errors: { api: parsedRes }, // 🟢 Returns the exact error your backend sent
//         }
//       }
//       console.log('SUCCESS FROM THE SERVER!: ', parsedRes)
//       return {
//         success: {
//           success: true,
//           candidate: parsedRes.profileVersion,
//         },
//       }
//     } catch (error) {
//       console.error('⚠️ Failed to parse backend response:', error)
//       return {
//         errors: {
//           message: 'Server returned an invalid response',
//           code: 'UNKNOWN_ERROR',
//         },
//       }
//     }
//   } catch (error) {
//     console.error('⚠️ Network or Server Error:', error)
//     return {
//       errors: {
//         message: 'Network error. Please try again.',
//         code: 'UNKNOWN_ERROR',
//       },
//     }
//   }
// }
