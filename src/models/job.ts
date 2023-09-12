import { ICustomer, INote } from './'

export enum JobStatus {
  Scheduled = 'SCHEDULED',
  Active = 'ACTIVE',
  Invoicing = 'INVOICING',
  ToPriced = 'TO_PRICED',
  Completed = 'COMPLETED',
}

export interface IJobInput {
  status: JobStatus
  dateCreated: Date
  description: string
  tradieId: string
  customerId: string
}

export interface IJob extends IJobInput {
  id: string
  customer?: ICustomer
  notes?: INote[]
}
