import { auth } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  const { userId } = await auth()
  return userId
}

export async function isAdmin() {
  // TODO: Implement admin role checking when needed
  return false
}

export async function requireAuth() {
  const userId = await getCurrentUser()
  if (!userId) {
    throw new Error('Authentication required')
  }
  return userId
}

export async function requireAdmin() {
  const userId = await requireAuth()
  const adminStatus = await isAdmin()
  if (!adminStatus) {
    throw new Error('Admin access required')
  }
  return userId
}
