'use client'
import type { Post, Category, Tag } from '@/types/types'
import Article from './article'
import Pagination from './pagination'
import { useState, useEffect } from 'react'
import { getAllPosts, getTotal } from '@/lib/actions/post'
import { useSearchParams } from 'next/navigation'

export default function PostList({ categories, tags }: { categories: Category[], tags: Tag[] }) {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [posts, setPosts] = useState<Post[]>([])
  const pageSize = 5

  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category') || ''
  const tagId = searchParams.get('tag') || ''

  useEffect(() => {
    setPage(1)
  }, [categoryId, tagId])

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts(page, pageSize, categoryId, tagId)
      const total = await getTotal(categoryId, tagId)

      setTotal(total)
      setPosts(posts)
    }

    getPosts()
  }, [page, categoryId, tagId])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      {(categoryId || tagId) && (
        <div className='text-sm mb-4 font-semibold border rounded-lg shadow-sm p-4 flex justify-between'>
          <div>
            <span className='mr-2 text-gray-600'>
              {categoryId ? '分类' : '标签'}:{' '}
            </span>
            <span className='bg-gray-100 text-gray-700 px-2 py-1 rounded font-bold'>
              {categoryId
                ? categories.find(c => c.id === Number(categoryId))?.name
                : tags.find(c => c.id === Number(tagId))?.name}
            </span>
          </div>
          <div className='text-gray-600'>
            共<span className='mx-1'>{total}</span>篇
          </div>
        </div>
      )}
      {
        posts.map((post: Post) => (
          <Article article={post} key={post.id} />
        ))
      }
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  )
}
