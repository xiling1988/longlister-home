import { Job } from './job'
import { RecruiterProfile } from './recruiter-profile'
import { User } from './user'

export interface RecruiterOnJob {
  id: string
  recruiterId: string
  jobId: string
  createdAt: Date
  // Optionally, you can include recruiter and job as nested objects if needed:
  recruiter?: User
  job: Job
}
