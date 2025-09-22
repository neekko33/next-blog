import Author from '../components/author'
import Categories from '../components/categories'
import Tags from '../components/tags'
import Archive from '../components/archive'
import { getAllCategories } from '@/lib/actions/category'
import { getAllTags } from '@/lib/actions/tag'
import { getArchives } from '@/lib/actions/archive'
import { getUser } from '@/lib/actions/user'
import PostList from '@/components/postList'
import { getPostsCount } from '@/lib/actions/post'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string, category?: string }>
}) {
  const categoryId = searchParams.category || ''
  const tagId = searchParams.tag || ''

  const [categories, tags, archives, user, postsCount] = await Promise.all([
    getAllCategories(),
    getAllTags(),
    getArchives(),
    getUser(),
    getPostsCount(),
  ])

  const profile = {
    ...user,
    postsCount,
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
          <PostList categories={categories} tags={tags} />
        </div>
      </div>
    </main>
  )
}
