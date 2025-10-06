import { db } from './db'
import { usersTable } from './schema'
import bcrypt from 'bcryptjs'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME
  
  const hashedPassword = await bcrypt.hash(password, 10)

  const data = await db
    .insert(usersTable)
    .values({
      email: email!,
      password: hashedPassword,
      name: name!,
    })
    .returning({ id: usersTable.id })
  
  const user = data[0]
  if (!user) {
    console.log('❎ Failed to create admin user')
  }
  
  console.log('✅ Admin user created with ID:', user.id)
}
