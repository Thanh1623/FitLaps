import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, LogOut } from "lucide-react";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "true") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package /> FitLaps Admin
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link href="/admin/dashboard/blog" className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">
              <Package size={18} /> Blog
            </Link>
            <form action={async () => {
                'use server';
                (await cookies()).delete('admin_session');
                redirect('/admin/login');
            }}>
                <button type="submit" className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700">
                    <LogOut size={18} /> Logout
                </button>
            </form>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-8">{children}</main>
    </div>
  );
}
