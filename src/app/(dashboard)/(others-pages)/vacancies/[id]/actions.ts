import { JOBS_API_URL } from '@/common/constants'
import { get } from '@/common/util/fetch'

export async function getManageVacancyInfo(id: string) {
  console.log('LOGGING FROM THE SERVER SIDE', id)
  const vacancyInfo = await get(JOBS_API_URL, `jobs/manageVacancy/${id}`)
  console.log('VACANCY INFO TEST: ', vacancyInfo)
  return vacancyInfo
}
