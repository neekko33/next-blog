'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/actions/auth'
import { useActionState } from 'react'

export default function LoginPage() {
  const [state, action, pending] = useActionState(signIn, undefined)
  return (
    <>
      <div className='w-screen h-screen flex'>
        <div className='flex-1 flex items-center justify-center'>
          <div className='w-96 p-8 bg-white rounded-xl shadow'>
            <h2 className='text-2xl font-bold mb-6'>Admin Login</h2>
            <p className='text-gray-500'>Enter your Email and Password below</p>
            <form className='mt-4 space-y-4' action={signIn}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='m@example.com'
                    required
                  />
                  {state?.errors?.email && (
                    <p className='text-sm text-red-600 mt-1'>
                      {state.errors.email}
                    </p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <a
                      href='#'
                      className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id='password' type='password' name='password' required />
                  {state?.errors?.password && (
                    <p className='text-sm text-red-600 mt-1'>
                      {state.errors.password}
                    </p>
                  )}
                </div>
              </div>
              <Button type='submit' className='w-full cursor-pointer mt-6'>
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
