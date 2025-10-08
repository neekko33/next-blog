'use client'
import Table from '@/components/table'
import Pagination from '@/components/pagination'
import type { Post } from '@/types/types'
import { getAllPosts, getTotal } from '@/lib/actions/post'
import { useEffect, useState } from 'react'
import { set } from 'zod'

const columns = [
  { label: '标题', key: 'title' },
  { label: '分类', key: 'category' },
  {
    label: '标签',
    key: 'tags',
    render: (item: Post) => {
      return item.tags.map(tag => (
        <span key={tag.id} className="px-2 py-1 mr-2 bg-blue-400 rounded text-white">
          {tag.name}
        </span>
      ))
    },
  },
]

export default function PostsPage() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      const [data, total] = await Promise.all([getAllPosts(page, pageSize), getTotal()])
      setPosts(data)
      setTotal(total)
    }

    fetchPosts()

    return () => {
      setPosts([])
      setTotal(0)
    }
  }, [page])

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <div className="space-y-4">
      <Table data={posts} columns={columns} />
      <Pagination total={total} page={page} pageSize={pageSize} onPageChange={handlePageChange} />
    </div>
  )
}
