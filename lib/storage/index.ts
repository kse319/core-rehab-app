/**
 * Storage layer exports.
 * All app code should import from here.
 */
export { LocalStorageRepository } from './local-storage-adapter'
export type { IStorageRepository } from './storage-repository'

import { LocalStorageRepository } from './local-storage-adapter'

/** Singleton storage instance for the entire app */
let _storage: LocalStorageRepository | null = null

/** Get the app storage repository singleton */
export function getStorage(): LocalStorageRepository {
  if (!_storage) {
    _storage = new LocalStorageRepository()
  }
  return _storage
}
