'use client'

import { signUp, signIn } from '@/app/actions/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setMessage(null)
    
    const result = isLogin 
        ? await signIn(formData) 
        : await signUp(formData)

    if (result?.error) {
      setError(result.error)
    } else if (!isLogin) {
      setMessage("Check your email for the confirmation link.")
    }
  }

  return (
    <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">
            {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <form action={handleSubmit} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-emerald-500 text-sm">{message}</p>}
        <Button type="submit" className="w-full">
            {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
        </form>
        <Button variant="outline" className="w-full" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account?' : 'Already have an account?'}
        </Button>
    </div>
  )
}
