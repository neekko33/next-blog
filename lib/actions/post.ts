'use server'

import { db } from '@/lib/db/db'
import { postsTable, postsTagsTable } from '@/lib/db/schema'
import { desc, and, exists, eq } from 'drizzle-orm'
import { Post } from '@/types/types'

export async function getPostsCount() {
  return db.$count(postsTable)
}

export async function getTotal(category: string = '', tag: string = '') {
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

export async function getAllPosts(pageNum: number, pageSize: number, category: string = '', tag: string = '') {
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
    limit: pageSize,
    offset: (pageNum - 1) * pageSize,
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


