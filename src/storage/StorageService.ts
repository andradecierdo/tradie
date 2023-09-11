import { ILocalStorage } from '../services/LocaleStorageService'

export interface IStorageService<D, I, S> {
  getStorageKey(): string
  initialize(source: S[]): D[]
  createModel(id: string, input: I): D
  toModel(source: S): D
  saveData(data: D[]): void
}

export abstract class StorageService<D, I, S> implements IStorageService<D, I, S> {
  protected data: D[] = []

  constructor(private localeStorage: ILocalStorage<D>) { }

  abstract getStorageKey(): string
  abstract toModel(source: S): D
  abstract createModel(id: string, input: I): D

  initialize(source: S[]): D[] {
    const storageData = this.localeStorage.get<S[]>(this.getStorageKey())
    if (storageData !== null) {
      return storageData.map(o => this.toModel(o))
    }
    this.localeStorage.set<S[]>(this.getStorageKey(), source)
    return source.map(o => this.toModel(o))
  }

  saveData(data: D[]): void {
    this.localeStorage.set<D[]>(this.getStorageKey(), data)
  }
}
