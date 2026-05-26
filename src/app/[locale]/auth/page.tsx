import { AuthForm } from "@/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <main className="min-h-screen flex bg-white dark:bg-slate-950">
        {/* Left Side: Image */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-600">
            <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                alt="Fitness" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent flex items-end p-12">
                <div className="text-white space-y-4">
                    <h1 className="text-4xl font-extrabold">Achieve Your Fitness Goals</h1>
                    <p className="text-lg text-emerald-100">Join FitLaps today and start your personalized fitness journey with AI-powered plans.</p>
                </div>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
                <AuthForm />
            </div>
        </div>
    </main>
  );
}
