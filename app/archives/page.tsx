import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import dayjs from "dayjs"
import { getArchives } from "@/lib/actions/archive"
import Archive from '@/components/archive'

export default async function Archives() {
  const archives = await getArchives()
  return (
    <main className="flex w-full mx-auto gap-8">
      <div className="flex-1">
        <Card>
          <CardContent>
            {
              archives.map((archive) => (
                <div key={archive.year} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0 pt-6 first:pt-0">
                  <h2 id={archive.year} className="text-2xl font-bold mb-4">{archive.year}</h2>
                  <div className="space-y-4">
                    {
                      archive.posts.map((post) => (
                        <div key={post.id}>
                          <p className="text-sm text-gray-500 mb-1">{dayjs(post.created_at).format("YYYY-MM-DD")}</p>
                          <Link href={`/posts/${post.id}`} className="text-lg mb-2 hover:underline">{post.title}</Link>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </CardContent>
        </Card>
      </div>
      <div className="w-[350px] space-y-4">
        <Archive archives={archives} />
      </div>
    </main>
  )
}
