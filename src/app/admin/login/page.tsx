'use client';
import { loginAction } from "@/app/actions/admin";
import { useActionState } from "react";

export default function AdminLoginPage() {
  const [state, action] = useActionState(async (prevState: { error: string }, formData: FormData) => {
      const result = await loginAction(formData);
      return { error: result.error || "" };
  }, { error: "" });

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Left Side: Image */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-slate-800">
            <img 
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop" 
                alt="Admin" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-extrabold mb-4">FitLaps Admin</h1>
                    <p className="text-slate-300">Manage products, blog content, and monitor app statistics.</p>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center p-8">
            <form action={action} className="p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-sm space-y-6">
                <h1 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">Admin Login</h1>
                {state?.error && <p className="text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-center text-sm">{state.error}</p>}
                <div className="space-y-4">
                    <input name="username" type="text" placeholder="Username" className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" required />
                    <input name="password" type="password" placeholder="Password" className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none" required />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-xl font-bold transition">Login</button>
            </form>
        </div>
    </div>
  );
}
