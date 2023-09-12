import { ICustomer, IJob, IJobInput, JobStatus } from '../models'
import { StorageService } from './StorageService'
import customersData from '../data/customers.json'

export interface IJobSource {
  id: string
  status: string
  dateCreated: string
  description: string
  tradieId: string
  customerId: string
}

export class JobDataService extends StorageService<IJob, IJobInput, IJobSource> {
  customers = new Map<string, ICustomer>(customersData.map(o => [o.id, o]))

  getStorageKey(): string {
    return 'tradie-app-job-key'
  }

  createModel(id: string, input: IJobInput): IJob {
    return { ...input, id }
  }

  toModel(source: IJobSource): IJob {
    return {
      ...source,
      status: source.status as JobStatus,
      dateCreated: new Date(source.dateCreated),
      customer: this.customers.get(source.customerId)!,
    }
  }

}
