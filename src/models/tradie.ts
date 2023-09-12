import { IJob } from './job'

export interface ITradieInput {
  name: string
  description: string
}

export interface ITradie extends ITradieInput {
  id: string
  jobs?: IJob[]
}
