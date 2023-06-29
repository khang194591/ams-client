import { decrypt, encrypt } from '../crypto'

interface StorageData<T> {
  value: T
  expire: number | null
}

function createLocalStorage<T extends StorageInterface.Local = StorageInterface.Local>() {
  /** The default cache period is 7 days */
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

  function set<K extends keyof T>(key: K, value: T[K], expire: number | null = DEFAULT_CACHE_TIME) {
    const storageData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null
    }
    const json = encrypt(storageData)
    window.localStorage.setItem(key as string, json)
  }

  function get<K extends keyof T>(key: K) {
    const json = window.localStorage.getItem(key as string)
    if (json) {
      let storageData: StorageData<T[K]> | null = null
      try {
        storageData = decrypt(json)
      } catch {
        // Prevent analytical failure
      }
      if (storageData) {
        const { value, expire } = storageData
        // Return directly within the validity period
        if (expire === null || expire >= Date.now()) {
          return value as T[K]
        }
      }
      remove(key)
      return null
    }
    return null
  }

  function remove(key: keyof T) {
    window.localStorage.removeItem(key as string)
  }
  function clear() {
    window.localStorage.clear()
  }

  return { set, get, remove, clear }
}

export const localStg = createLocalStorage()