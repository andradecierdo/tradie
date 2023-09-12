import { StorageService } from './StorageService'
import { ITradie, ITradieInput } from '../models'

export interface ITradieSource {
  id: string
  name: string
  description: string
}

export class TradieDataService extends StorageService<ITradie, ITradieInput, ITradieSource> {
  getStorageKey(): string {
    return 'tradie-app-tradie-key'
  }

  createModel(id: string, input: ITradieInput): ITradie {
    return { ...input, id }
  }

  toModel(source: ITradieSource): ITradie {
    return source
  }

}
