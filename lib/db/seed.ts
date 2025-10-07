import { db } from './db'
import { usersTable, categoriesTable, tagsTable, postsTable, postsTagsTable } from './schema'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { faker } from '@faker-js/faker'

async function main() {
  // const email = process.env.ADMIN_EMAIL
  // const name = process.env.ADMIN_NAME
  // const password = process.env.ADMIN_PASSWORD || 'password'

  // const hashedPassword = await bcrypt.hash(password, 10)

  // const user = await db
  //   .insert(usersTable)
  //   .values({
  //     name: name!,
  //     email: email!,
  //     password: hashedPassword,
  //     bio: faker.lorem.sentence(),
  //     avatar_url: faker.image.avatar(),
  //   })
  //   .returning({ id: usersTable.id })

  // console.log('✅ Admin user created:')
  // console.log(`   Email: ${email}`)

  const user = await db.query.usersTable.findFirst()

  if (!user) {
    console.error('❌ No user found. Please create an admin user first.')
    process.exit(1)
  }

  console.log('🌱 Seeding categories...')
  const categoryNames = ['技术', '生活', '随笔', '教程', '其他']
  const categories = await db
    .insert(categoriesTable)
    .values(categoryNames.map(name => ({ name })))
    .returning()

  console.log('🌱 Seeding tags...')
  const tags = await db
    .insert(tagsTable)
    .values(Array.from({ length: 10 }, () => ({ name: faker.lorem.word() })))
    .returning()

  console.log('🌱 Seeding posts...')
  const posts = await db
    .insert(postsTable)
    .values(
      Array.from({ length: 30 }, () => ({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(3),
        user_id: user.id,
        category_id: categories[Math.floor(Math.random() * categories.length)].id,
      }))
    )
    .returning()

  console.log('🌱 Seeding posts-tags relations...')
  await db.insert(postsTagsTable).values(
    Array.from({ length: 50 }, () => ({
      post_id: posts[Math.floor(Math.random() * posts.length)].id,
      tag_id: tags[Math.floor(Math.random() * tags.length)].id,
    }))
  )

  console.log('✅ Fake data inserted successfully!')
}

main().catch(err => {
  console.error('❌ Error:', err)
  process.exit(1)
})
