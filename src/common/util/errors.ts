import {
  ApprovalSuccess,
  RejectionSuccess,
  Success,
} from '@/app/(dashboard)/vacancies/recruiter/vacancy/[id]/actions/success'
import { format } from 'path'

export interface FormErrors {
  [key: string]: string | undefined
}

export type KnownBackendErrorCode =
  | 'EMAIL_EXTRACTION_FAILED'
  | 'CV_TEXT_EXTRACTION_FAILED'
  | 'STRUCTURED_DATA_EXTRACTION_FAILED'
  | 'CANDIDATE_ALREADY_EXISTS'
  | 'CANDIDATE_CREATION_FAILED'
  | 'ADD_CANDIDATE_TO_JOB_FAILED'
  | 'UNKNOWN_ERROR'

export type BackendError = {
  message: string
  code?: KnownBackendErrorCode
}

export type UploadFormState =
  | {
      success: Success | ApprovalSuccess | RejectionSuccess
      errors?: undefined
    }
  | { errors: BackendError | FormErrors; success?: undefined }

export type RejectCandidateState =
  | { success: RejectionSuccess; errors?: undefined }
  | { errors: BackendError | FormErrors; success?: undefined }

export type ApproveCandidateState =
  | { success: ApprovalSuccess; errors?: undefined }
  | { errors: BackendError | FormErrors; success?: undefined }

export const getErrorMessage = (response: any): BackendError => {
  if (!response) {
    return { message: 'Unknown error occurred', code: 'UNKNOWN_ERROR' }
  }

  if (Array.isArray(response.message)) {
    return {
      message: response.message[0],
      code: response.code || 'UNKNOWN_ERROR',
    }
  }
  if (typeof response.message === 'string') {
    return {
      message: response.message,
      code: response.code || 'UNKNOWN_ERROR',
    }
  }
  return { message: 'An unknown error occurred', code: 'UNKNOWN_ERROR' }
}

export const formatError = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1)
}
