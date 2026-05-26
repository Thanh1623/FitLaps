import { prisma } from "@/lib/db";
import { deleteImage } from "./storage";

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return await prisma.post.findUnique({
    where: { slug },
  });
}

export async function createPost(data: {
  title: string;
  slug: string;
  content: string;
  published: boolean;
}) {
  return await prisma.post.create({
    data,
  });
}

export async function updatePost(
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: string;
    published?: boolean;
  }
) {
  return await prisma.post.update({
    where: { id },
    data,
  });
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({ where: { id } });
  
  if (post && post.content) {
    const imageUrlRegex = /!\[.*?\]\((https:\/\/.*?\/blog-images\/.*?)\)/g;
    let match;
    while ((match = imageUrlRegex.exec(post.content)) !== null) {
      if (match[1]) {
        await deleteImage(match[1]);
      }
    }
  }

  return await prisma.post.delete({
    where: { id },
  });
}

export async function searchPosts(query: string) {
  return await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
}
