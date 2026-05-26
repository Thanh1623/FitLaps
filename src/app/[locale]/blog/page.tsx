import { getPosts } from "@/services/postService";
import { Link } from "@/i18n/routing";

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Fitness Insights</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Discover tips, guides, and inspiration for your journey.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`} 
              className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:border-emerald-500/30"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3">
                    {/* Simplified excerpt for better design */}
                    Read more about this fitness topic...
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                    {post.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-sm font-medium text-slate-400 group-hover:text-emerald-600 transition-colors">Read →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
