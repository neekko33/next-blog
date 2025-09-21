import Image from 'next/image'
import Author from '../components/author'
import Categories from '../components/categories'
import Tags from '../components/tags'
import Archive from '../components/archive'
import Article from '../components/article'
import Pagination from '../components/pagination'
import { Card } from '@/components/ui/card'
import { Post } from '@/types/types'
import { getAllPosts, getPostsCount } from '@/lib/actions/post'
import { getAllCategories } from '@/lib/actions/category'
import { getAllTags } from '@/lib/actions/tag'
import { getArchives } from '@/lib/actions/archive'
import { getUser } from '@/lib/actions/user'

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const categoryId = searchParams.category || ''
  const tagId = searchParams.tag || ''

  const posts: Post[] = await getAllPosts(page, categoryId, tagId)
  const total: number = await getPostsCount(categoryId, tagId)
  const categories = await getAllCategories()
  const tags = await getAllTags()
  const archives = await getArchives()
  const user = await getUser()
  const profile = {
    ...user,
    postsCount: total,
    categoriesCount: categories.length,
    tagsCount: tags.length,
  }

  return (
    <main className='flex w-full gap-8'>
      <div className='w-[350px] space-y-4'>
        <Author profile={profile} />
        <Categories categories={categories} categoryId={categoryId} />
        <Tags tags={tags} tagId={tagId} />
        <Archive archives={archives} />
      </div>
      <div className='flex-1'>
        <div className='space-y-4 mb-6'>
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
          {posts.map(post => (
            <Article key={post.id} article={post} />
          ))}
        </div>
        <Pagination
          total={total}
          page={page}
          pageSize={10}
        />
      </div>
    </main>
  )
}
