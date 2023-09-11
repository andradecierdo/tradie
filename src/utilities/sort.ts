export function sortByProperty<D extends { [key: string]: any }>(data: D[], key: string, desc = true): D[] {
  return data.sort((a, b) => {
    if (a[key] instanceof Date) {
      if (desc) {
        return a[key].getTime() - b[key].getTime()
      }
      return b[key].getTime() - a[key].getTime()
    }

    if (desc) {
      return a[key].toString().localeCompare(b[key])
    }
    return b[key].toString().localeCompare(a[key])
  })
}
