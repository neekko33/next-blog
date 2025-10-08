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
  return (
    <>
      <Banner />
      <main className="container mx-auto px-4 py-8 min-h-screen pt-24">{children}</main>
      <Footer />
    </>
  )
}
