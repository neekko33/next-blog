'use server'
import { db } from '@/lib/db/db'
import { postsTable, usersTable } from '@/lib/db/schema'
import { User } from '@/types/types'

export async function getUser(): Promise<User> {
  const me = await db.select().from(usersTable).limit(1)
  return {
    name: me[0].name,
    avatarUrl: me[0].avatarUrl,
    bio: me[0].bio
  }
}
