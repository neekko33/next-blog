export type Post = {
  id: number
  title: string
  description: string
  created_at: Date
  tags: Tag[]
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