export interface INoteInput {
  jobId: string
  content: string
  dateCreated: Date
}

export interface INote extends INoteInput {
  id: string
}
