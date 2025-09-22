'use server'
import { db } from '@/lib/db/db'
import { postsTable, postsTagsTable, tagsTable } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function getArchives() {
  const posts = await db
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.created_at))

  const postsWithTags = await Promise.all(
    posts.map(async post => {
      const tags = await db
        .select()
        .from(postsTagsTable)
        .where(eq(postsTagsTable.post_id, post.id))
        .leftJoin(tagsTable, eq(tagsTable.id, postsTagsTable.tag_id))
      return {
        ...post,
        tags: tags.map(t => t.tags),
      }
    })
  )

  const grouped = postsWithTags.reduce<Record<number, typeof postsWithTags>>(
    (acc, post) => {
      const year = new Date(post.created_at).getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    },
    {}
  )

  const sortedYears = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)

  return sortedYears.map(year => ({
    year,
    posts: grouped[year],
  }))
}
