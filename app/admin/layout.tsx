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
  return <div>
    <h1>Admin Layout</h1>
    {children}
  </div>
}
