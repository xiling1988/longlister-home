import React from 'react'
import {
  UserCircleIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  LanguagesIcon,
  AwardIcon,
  BookOpenIcon,
  HandshakeIcon,
  InfoIcon,
  StarIcon,
  LightbulbIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { FullCandidateCV, LimitedCandidateCV } from '@/common/models'

interface Props {
  cv: FullCandidateCV | LimitedCandidateCV
}

export default function FullCandidateProfileViewer({ cv }: Props) {
  if (!cv)
    return <p className="text-sm text-gray-500">No profile data available.</p>

  // Type guard to check if cv has 'personal' property
  function hasPersonal(
    cv: FullCandidateCV | LimitedCandidateCV,
  ): cv is FullCandidateCV & { personal: any } {
    return (cv as any).personal !== undefined
  }

  const personal = hasPersonal(cv) ? cv.personal : undefined
  const profile = hasPersonal(cv) ? cv.profile : undefined
  const experience = hasPersonal(cv) ? cv.experience : undefined
  const education = hasPersonal(cv) ? cv.education : undefined
  const skills = hasPersonal(cv) ? cv.skills : undefined
  const languages = hasPersonal(cv) ? cv.languages : undefined
  const certifications = hasPersonal(cv) ? cv.certifications : undefined
  const publications = hasPersonal(cv) ? cv.publications : undefined
  const volunteer_experience = hasPersonal(cv)
    ? cv.volunteer_experience
    : undefined
  const additional_info = hasPersonal(cv) ? cv.additional_info : undefined

  const Section = ({ icon: Icon, title, children }: any) => (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white">
        <Icon className="h-5 w-5 text-gray-500" />
        {title}
      </div>
      {children}
    </div>
  )

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
      {/* Personal Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {personal.full_name}
        </h2>
        {personal.title && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {personal.title}
          </p>
        )}
        <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {personal.email && <p>Email: {personal.email}</p>}
          {personal.phone && <p>Phone: {personal.phone}</p>}
          {personal.location && <p>Location: {personal.location}</p>}
          {personal.linkedin && <p>LinkedIn: {personal.linkedin}</p>}
          {personal.website && <p>Website: {personal.website}</p>}
          {personal.github && <p>GitHub: {personal.github}</p>}
        </div>
      </div>

      {profile && profile?.length > 0 && (
        <Section icon={InfoIcon} title="Profile">
          {profile.map((p, i) => (
            <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
              {p}
            </p>
          ))}
        </Section>
      )}

      {experience && experience?.length > 0 && (
        <Section icon={BriefcaseIcon} title="Experience">
          {experience.map((exp) => (
            <div
              key={exp.hash_id}
              className="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700"
            >
              <p className="font-medium text-gray-900 dark:text-white">
                {exp.job_title} @ {exp.company}
              </p>
              <p className="text-sm text-gray-500">
                {exp.start_date} – {exp.end_date || 'Present'}{' '}
                {exp.location && `| ${exp.location}`}
              </p>
              {exp.responsibilities?.map((r, i) => (
                <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
                  • {r}
                </p>
              ))}
              {(exp.key_projects ?? []).length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Key Projects:
                  </p>
                  {(exp.key_projects ?? []).map((proj, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-700 dark:text-gray-300"
                    >
                      - {proj.name}: {proj.impact}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {Array.isArray(education) && education.length > 0 && (
        <Section icon={GraduationCapIcon} title="Education">
          {education.map((edu) => (
            <div
              key={edu.hash_id}
              className="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700"
            >
              <p className="font-medium text-gray-900 dark:text-white">
                {edu.degree} @ {edu.institution}
              </p>
              <p className="text-sm text-gray-500">
                {edu.start_date} – {edu.end_date}{' '}
                {edu.location && `| ${edu.location}`}
              </p>
              {edu.field_of_study && <p>Field: {edu.field_of_study}</p>}
              {edu.details && <p>Details: {edu.details}</p>}
            </div>
          ))}
        </Section>
      )}

      {skills && (
        <Section icon={StarIcon} title="Skills">
          {Array.isArray(skills.hard_skills) &&
            skills.hard_skills.length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Hard Skills
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {skills.hard_skills.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {Array.isArray(skills.soft_skills) &&
            skills.soft_skills.length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Soft Skills
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {skills.soft_skills.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-yellow-100 px-2 py-1 text-xs dark:bg-yellow-900"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {Array.isArray(skills.tools_and_technologies) &&
            skills.tools_and_technologies.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Tools & Technologies
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {skills.tools_and_technologies.map((s, i) => (
                    <span
                      key={i}
                      className="rounded bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </Section>
      )}

      {Array.isArray(languages) && languages.length > 0 && (
        <Section icon={LanguagesIcon} title="Languages">
          <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
            {languages.map((lang, i) => (
              <li key={i}>
                {lang.language} {lang.proficiency && `- ${lang.proficiency}`}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {Array.isArray(certifications) && certifications.length > 0 && (
        <Section icon={AwardIcon} title="Certifications">
          <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
            {certifications.map((cert, i) => (
              <li key={i}>
                {cert.name} {cert.issuer && `- ${cert.issuer}`}{' '}
                {cert.year && `(${cert.year})`}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {Array.isArray(publications) && publications.length > 0 && (
        <Section icon={BookOpenIcon} title="Publications">
          {publications.map((pub, i) => (
            <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
              {pub.title} {pub.publisher && `- ${pub.publisher}`}{' '}
              {pub.year && `(${pub.year})`} {pub.url && `| ${pub.url}`}
            </p>
          ))}
        </Section>
      )}

      {Array.isArray(volunteer_experience) &&
        volunteer_experience.length > 0 && (
          <Section icon={HandshakeIcon} title="Volunteer Experience">
            {volunteer_experience.map((vol) => (
              <div
                key={vol.hash_id}
                className="mb-4 rounded-md border border-gray-200 p-4 dark:border-gray-700"
              >
                <p className="font-medium text-gray-900 dark:text-white">
                  {vol.role} @ {vol.organization}
                </p>
                <p className="text-sm text-gray-500">
                  {vol.start_date} – {vol.end_date || 'Present'}
                </p>
                {vol.responsibilities?.map((r, i) => (
                  <p
                    key={i}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    • {r}
                  </p>
                ))}
              </div>
            ))}
          </Section>
        )}

      {additional_info && (
        <Section icon={LightbulbIcon} title="Additional Info">
          {Array.isArray(additional_info.hobbies) &&
            additional_info.hobbies.length > 0 && (
              <div className="mb-2">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Hobbies
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {additional_info.hobbies.map((h, i) => (
                    <span
                      key={i}
                      className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </Section>
      )}
    </div>
  )
}
