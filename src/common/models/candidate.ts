import { Job } from './job'

export interface Candidate {
  id: string
  recruiterProfileId: string
  name: string
  // Add additional fields as necessary
}

export interface CandidateProfileVersion {
  id: string
  candidateId: string
  addedByRecruiterId: string
  location: string
  noticePeriod: number
  currency?: string
  currentSalary?: number
  expectedSalary?: number
  details: FullCandidateCV
}

export interface FullCandidateCV {
  personal: {
    full_name: string
    title?: string | null
    nationality?: string | null
    date_of_birth?: string | null
    marital_status?: string | null
    gender?: string | null
    location?: string | null
    phone?: string | null
    email: string
    linkedin?: string | null
    website?: string | null
    github?: string | null
    twitter?: string | null
    other_socials?: string[]
  }
  achievements?: {
    category: string
    items: string[]
  }[]
  profile?: string[]
  experience?: {
    job_title: string
    company: string
    location?: string | null
    start_date?: string | null
    end_date?: string | null
    employment_type?: {
      type?: string | null
      guess_if_missing: boolean
    }
    industry?: string | null
    responsibilities?: string[]
    key_projects?: {
      name: string
      impact: string
    }[]
    hash_id: string
  }[]
  education?: {
    degree: string
    institution: string
    location?: string | null
    start_date?: string | null
    end_date?: string | null
    field_of_study?: string | null
    details?: string | null
    gpa?: string | null
    hash_id: string
  }[]
  skills?: {
    hard_skills?: string[]
    soft_skills?: string[]
    tools_and_technologies?: string[]
  }
  languages?: {
    language: string
    proficiency?: string | null
    certifications?: string[]
  }[]
  interests?: string[]
  certifications?: {
    name: string
    issuer?: string | null
    year?: string | null
    credential_id?: string | null
  }[]
  publications?: {
    title: string
    publisher?: string | null
    year?: string | null
    url?: string | null
  }[]
  volunteer_experience?: {
    organization: string
    role: string
    start_date?: string | null
    end_date?: string | null
    responsibilities?: string[]
    hash_id: string
  }[]
  references?: {
    name?: string | null
    position?: string | null
    company?: string | null
    contact?: string | null
    relationship?: string | null
  }[]
  additional_info?: {
    hobbies?: string[]
    awards?: string[]
    memberships?: string[]
    custom_sections?: {
      [key: string]: string[]
    }
    miscellaneous?: string[]
  }
}

export interface LimitedCandidateCV {
  achievements?: {
    category: string
    items: string[]
  }[]
  profile?: string[]
  experience?: {
    job_title: string
    company: string
    location?: string | null
    start_date?: string | null
    end_date?: string | null
    employment_type?: {
      type?: string | null
      guess_if_missing: boolean
    }
    industry?: string | null
    responsibilities?: string[]
    key_projects?: {
      name: string
      impact: string
    }[]
    hash_id: string
  }[]
  education?: {
    degree: string
    institution: string
    location?: string | null
    start_date?: string | null
    end_date?: string | null
    field_of_study?: string | null
    details?: string | null
    gpa?: string | null
    hash_id: string
  }[]
  skills?: {
    hard_skills?: string[]
    soft_skills?: string[]
    tools_and_technologies?: string[]
  }
  languages?: {
    language: string
    proficiency?: string | null
    certifications?: string[]
  }[]
  interests?: string[]
  certifications?: {
    name: string
    issuer?: string | null
    year?: string | null
    credential_id?: string | null
  }[]
  publications?: {
    title: string
    publisher?: string | null
    year?: string | null
    url?: string | null
  }[]
  volunteer_experience?: {
    organization: string
    role: string
    start_date?: string | null
    end_date?: string | null
    responsibilities?: string[]
    hash_id: string
  }[]
  references?: {
    name?: string | null
    position?: string | null
    company?: string | null
    contact?: string | null
    relationship?: string | null
  }[]
  additional_info?: {
    hobbies?: string[]
    awards?: string[]
    memberships?: string[]
    custom_sections?: {
      [key: string]: string[]
    }
    miscellaneous?: string[]
  }
}

export interface CandidateOnJob {
  id: string
  jobId: string
  job: Job
  candidateProfileVersionId: string
  candidateId: string
  recruiterId: string
  candidateProfileVersion: CandidateProfileVersion
  candidate: Candidate
  isDisclosed: boolean
  disclosedAt: string
  candidateProfileVersions: CandidateProfileVersion[]
}
