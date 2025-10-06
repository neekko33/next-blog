import 'server-only'
import { decrypt } from './session'
import { cache } from 'react'
import { redirect } from 'next/dist/server/api-utils'

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/admin/login')
  }

  return { isAuth: true, userId: session.userId }
})
