'use server'

import { Category } from "@/types/types"
import { db } from "@/lib/db/db"

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
