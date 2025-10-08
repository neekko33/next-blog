import Banner from '@/components/layouts/banner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Blog Admin - Neekko33's Blog",
  description: `Blog Management for Neekko33's personal blog.`,
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Banner type="admin" />
      <main className="container mx-auto px-12 py-8 pt-24 min-h-screen">{children}</main>
    </>
  )
}
