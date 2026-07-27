/**
 * User types — for future cloud sync and auth.
 */

/** User profile */
export interface UserProfile {
  id: string
  email?: string | null
  displayName?: string | null
  createdAt: string
  updatedAt: string
}
