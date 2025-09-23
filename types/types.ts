export type Post = {
  id: number
  title: string
  description: string
  content?: string
  created_at: Date
  tags: Tag[]
  category?: Category
}

export type Tag = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
}

export type User = {
  name: string
  avatarUrl: string
  bio: string
}
