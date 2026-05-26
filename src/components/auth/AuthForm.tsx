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
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form action={handleSubmit} className="space-y-4">
        <Input name="email" type="email" placeholder="Email" required className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl" />
        <Input name="password" type="password" placeholder="Password" required className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl" />
        {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-center">{error}</p>}
        {message && <p className="text-emerald-500 text-sm bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg text-center">{message}</p>}
        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 text-lg font-bold">
            {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
        </form>
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">Or</span>
            </div>
        </div>
        <Button 
            variant="outline" 
            className="w-full rounded-xl py-6 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300" 
            onClick={() => setIsLogin(!isLogin)}
        >
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Button>
    </div>
  )
}
