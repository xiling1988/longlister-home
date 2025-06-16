import { CandidateOnJob, CandidateProfileVersion } from '../models'

export interface Success {
  success: boolean
  candidate: CandidateProfileVersion
}

export interface RejectionSuccess {
  success: boolean
  candidateOnJob?: CandidateOnJob
}
export interface ApprovalSuccess {
  success: boolean
  candidateOnJob?: CandidateOnJob
}
