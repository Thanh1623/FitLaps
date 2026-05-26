import { prisma } from "@/lib/db";
import { savePost } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownEditor from "@/components/admin/MarkdownEditor";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Edit Post</h1>
      <form action={savePost} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <input type="hidden" name="id" value={post.id} />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
          <input name="title" defaultValue={post.title} className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Slug</label>
          <input name="slug" defaultValue={post.slug} className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
          <MarkdownEditor name="content" defaultValue={post.content} />
        </div>
        
        <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer">
          <input type="checkbox" name="published" value="true" defaultChecked={post.published} className="w-5 h-5 accent-emerald-600" />
          <span className="font-medium text-slate-900 dark:text-white">Published</span>
        </label>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">Save Changes</button>
          <Link href="/admin/dashboard/blog" className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

