import { prisma } from "@/lib/db";
import Link from "next/link";
import { removePost } from "./actions";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q || "";
  
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: q, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Manage Blog Posts</h1>
        <Link 
          href="/admin/dashboard/blog/new" 
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          <Plus size={20} /> New Post
        </Link>
      </div>

      <form className="mb-6 relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input 
          name="q" 
          defaultValue={q} 
          placeholder="Search posts by title..." 
          className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" 
        />
      </form>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{post.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.published ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  <Link href={`/admin/dashboard/blog/${post.id}/edit`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 p-2">
                    <Pencil size={18} />
                  </Link>
                  <form action={removePost.bind(null, post.id)}>
                    <button type="submit" className="text-red-600 dark:text-red-400 hover:text-red-800 p-2">
                      <Trash2 size={18} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="p-8 text-center text-slate-500">No posts found.</div>
        )}
      </div>
    </div>
  );
}
