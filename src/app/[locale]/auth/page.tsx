import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-extrabold text-center mb-8 text-slate-900 dark:text-white">Sign Up</h1>
            <AuthForm />
        </div>
    </main>
  );
}
