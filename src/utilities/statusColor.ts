import { JobStatus } from '../models'

export const statusColor = (status: JobStatus) => {
  switch (status) {
    case JobStatus.Active:
      return '#498df8'
    case JobStatus.Completed:
      return '#3cc43f'
    case JobStatus.Invoicing:
      return '#e8ec70'
    case JobStatus.Scheduled:
      return '#f39a2e'
    case JobStatus.ToPriced:
      return '#d537ef'
    default:
      return '#000000'
  }
}
