import { db } from '@/lib/db/db'
import { postsTable, postsTagsTable } from '@/lib/db/schema'
import { desc, and, exists, eq } from 'drizzle-orm'
import { Post } from '@/types/types'

export async function getPostsCount(category: string = '', tag: string = '') {
  const total = await db.$count(
    postsTable,
    and(
      tag
        ? exists(
          db
            .select()
            .from(postsTagsTable)
            .where(
              and(
                eq(postsTagsTable.post_id, postsTable.id),
                eq(postsTagsTable.tag_id, Number(tag))
              )
            )
        )
        : undefined,
      category ? eq(postsTable.category_id, Number(category)) : undefined
    )
  )

  return total
}

export async function getAllPosts(pageNum: number, category: string = '', tag: string = '') {
  const sizeNum = 10
  const posts = await db.query.postsTable.findMany({
    where: (postsTable, { exists, and, eq }) =>
      and(
        tag
          ? exists(
            db
              .select()
              .from(postsTagsTable)
              .where(
                and(
                  eq(postsTagsTable.post_id, postsTable.id),
                  eq(postsTagsTable.tag_id, Number(tag))
                )
              )
          )
          : undefined,
        category ? eq(postsTable.category_id, Number(category)) : undefined
      ),
    with: {
      postsTags: {
        with: {
          tag: true,
        },
      },
    },
    orderBy: [desc(postsTable.created_at)],
    limit: sizeNum,
    offset: (pageNum - 1) * sizeNum,
  })

  const postsFormatted: Post[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    created_at: post.created_at,
    tags: post.postsTags.map(pt => pt.tag),
  }))

  return postsFormatted
}


