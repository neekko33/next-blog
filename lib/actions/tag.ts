'use server'
import { db } from "@/lib/db/db"
import { tagsTable } from "@/lib/db/schema"
import { Tag } from "@/types/types"

export async function getAllTags() {
  const tags: Tag[] = await db.select().from(tagsTable)
  return tags
}
