import { getPostBySlug } from '@/lib/actions/post'
import dayjs from 'dayjs'
import { Tag } from '@/types/types'
import Markdown from 'react-markdown'
import classes from './page.module.css'

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return (
    <>
      <main className='w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
        <p className='text-sm text-gray-500 mb-8 space-x-4'>
          <span>发布时间：{dayjs(post.created_at).format('YYYY-MM-DD')}</span>
          <span>分类：{post.category?.name ?? ''}</span>
        </p>
        <div className='text-gray-500 mb-8 bg-gray-50 p-4 rounded'>
          {post.description}
        </div>
        <div className={classes['markdown-body']}>
          <Markdown>{post.content}</Markdown>
        </div>
        <div className='space-x-2 mt-8'>
          {post.tags.map((tag: Tag) => (
            <span
              key={tag.id}
              className='text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium'
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </main>
    </>
  )
}
