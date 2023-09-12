import { INote, INoteInput } from '../models'
import { StorageService } from './StorageService'

export interface INoteSource {
  id: string
  jobId: string
  content: string
  dateCreated: string
}

export class NoteDataService extends StorageService<INote, INoteInput, INoteSource> {
  getStorageKey(): string {
    return 'tradie-app-note-key'
  }

  createModel(id: string, input: INoteInput): INote {
    return { ...input, id }
  }

  toModel(source: INoteSource): INote {
    return {
      ...source,
      dateCreated: new Date(source.dateCreated),
    }
  }

}
