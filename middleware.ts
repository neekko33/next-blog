import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Only protect /admin routes except /admin/login
  const isProtectedRoute = path.startsWith('/admin') && !path.endsWith('/login')

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    const loginUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
