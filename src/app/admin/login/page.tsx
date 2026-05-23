'use client';
import { loginAction } from "@/app/actions/admin";
import { useActionState } from "react";

export default function AdminLoginPage() {
  const [state, action] = useActionState(async (prevState: { error: string }, formData: FormData) => {
      const result = await loginAction(formData);
      return { error: result.error || "" };
  }, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
      <form action={action} className="p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Admin Login</h1>
        {state?.error && <p className="text-red-500 mb-4">{state.error}</p>}
        <input name="username" type="text" placeholder="Username" className="border p-2 mb-4 w-full rounded" required />
        <input name="password" type="password" placeholder="Password" className="border p-2 mb-4 w-full rounded" required />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
