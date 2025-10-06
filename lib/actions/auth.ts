import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '../db/db'
import { usersTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import { createSession, deleteSession } from '../session'
import { redirect } from 'next/dist/server/api-utils'

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }).trim(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).trim(),
})

type FormState = 
  | {
      errors: { 
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function signIn(state: FormState, formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return validatedFields.error.flatten().fieldErrors
  }

  const { email, password } = validatedFields.data

  const data = await db.findFirst(usersTable, {
    where: eq(usersTable.email, email),
  })

  if (!data) {
    return {
      errors: {
        email: ['Email or password is incorrect'],
      },
    }
  }

  const isPasswordValid = await bcrypt.compare(password, data.password)

  if (!isPasswordValid) {
    return {
      errors: {
        email: ['Email or password is incorrect'],
      },
    }
  }

  await createSession(data.id)
  redirect('/admin/posts')
}

export async function signOut() {
  await deleteSession()
  redirect('/')
}