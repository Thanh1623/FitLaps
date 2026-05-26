import { savePost } from "../actions";
import MarkdownEditor from "@/components/admin/MarkdownEditor";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">New Post</h1>
      <form action={savePost} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
          <input name="title" placeholder="Enter post title" className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" required />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Slug</label>
          <input name="slug" placeholder="enter-post-slug" className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
          <MarkdownEditor name="content" placeholder="Write your post content here..." />
        </div>

        <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer">
          <input type="checkbox" name="published" value="true" className="w-5 h-5 accent-emerald-600" />
          <span className="font-medium text-slate-900 dark:text-white">Published</span>
        </label>
        
        <div className="flex gap-4 pt-4">
          <button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">Save Post</button>
          <Link href="/admin/dashboard/blog" className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
