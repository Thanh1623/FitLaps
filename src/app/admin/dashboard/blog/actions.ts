"use server";
import { createPost, updatePost, deletePost } from "@/services/postService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function savePost(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const published = formData.get("published") === "true";

  if (id) {
    await updatePost(id, { title, slug, content, published });
  } else {
    await createPost({ title, slug, content, published });
  }
  revalidatePath("/admin/dashboard/blog");
  redirect("/admin/dashboard/blog");
}

export async function removePost(id: string) {
  await deletePost(id);
  revalidatePath("/admin/dashboard/blog");
}
