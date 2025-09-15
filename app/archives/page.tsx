import Article from "../ui/article"
import Pagination from "../ui/pagination"
import ArchivesCard from "../ui/archive"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function Archives() {
  const archives = await fetch("http://localhost:3001/api/archives")
  const archivesJson = await archives.json()

  return (
    <main className="flex w-3xl mx-auto gap-8">
      <div className="flex-1">
        <Card>
          <CardContent>
            {
              archivesJson.map((archive) => (
                <div key={archive.year} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0 pt-6 first:pt-0">
                  <h2 className="text-2xl font-bold mb-4">{archive.year}</h2>
                  <div className="space-y-4">
                    {
                      archive.posts.map((post) => (
                        <div key={post.id}>
                          <p className="text-sm text-gray-500 mb-1">{new Date(post.created_at).toLocaleDateString()}</p>
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
    </main>
  )
}