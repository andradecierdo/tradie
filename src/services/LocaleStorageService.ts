export interface ILocalStorage<D> {
  get<D>(key: string): D | null
  set<D>(key: string, data: D): void
}

export class LocaleStorageService<D> implements ILocalStorage<D>{
  get<D>(key: string): D | null {
    const data = localStorage.getItem(key)
    if (!data) {
      return null
    }

    let value
    try {
      value = JSON.parse(data) as D
    } catch {
      value = null
    }

    return value
  }

  set<D>(key: string, data: D): void {
    localStorage.setItem(key, JSON.stringify(data))
  }

}
