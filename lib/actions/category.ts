import { Category } from "@/types/types"
import { db } from "@/lib/db/db"
import { categoriesTable } from "@/lib/db/schema"

export async function getAllCategories() {
  const categories: (Category & { posts: { id: number }[] })[] = await db.query.categoriesTable.findMany({
    with: {
      posts: {
        columns: {
          id: true
        }
      }
    }
  })

  return categories.map(c => ({
    id: c.id,
    name: c.name,
    postsCount: c.posts.length
  }))
}