import type { Metadata } from 'next'
import Banner from '@/components/layouts/banner'
import Footer from '@/components/layouts/footer'
export const metadata: Metadata = {
  title: "Neekko33's Blog",
  description: `Neekko33's personal blog about coding, tech, and more.`,
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='max-w-7xl mx-auto pb-8 pt-24'>{children}</div>
}
