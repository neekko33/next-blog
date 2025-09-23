export default function Footer() {
  return (
    <div className="w-full h-16 flex items-center justify-between border-t mt-8 px-16">
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Neekko33's Blog. All rights reserved.
      </p>
      <p className="text-sm text-gray-500">
        Built with Next.js and shadcn/ui
      </p>
    </div>
  )
}