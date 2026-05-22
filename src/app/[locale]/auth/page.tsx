import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-md mx-auto">
            <AuthForm />
        </div>
    </main>
  );
}
