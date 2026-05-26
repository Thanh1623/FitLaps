import { getPostBySlug } from "@/services/postService";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote/rsc";
import ProductCard from "@/components/mdx/ProductCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.content.substring(0, 150),
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <article>
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
        <div className="prose dark:prose-invert max-w-none">
          <MDXRemote 
            source={post.content} 
            components={{ ProductCard }}
          />
        </div>
      </article>
      
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.createdAt.toISOString(),
          }),
        }}
      />
    </main>
  );
}
