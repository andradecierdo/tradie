import { JobStatus } from '../models'

export const statusTextDisplay = (status: JobStatus) => {
  switch (status) {
    case JobStatus.Active:
      return 'Active'
    case JobStatus.Completed:
      return 'Completed'
    case JobStatus.Invoicing:
      return 'Invoicing'
    case JobStatus.Scheduled:
      return 'Scheduled'
    case JobStatus.ToPriced:
      return 'To Priced'
    default:
      return '#000000'
  }
}
