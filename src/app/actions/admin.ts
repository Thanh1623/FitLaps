"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

async function checkAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session || session.value !== "true") {
    throw new Error("Unauthorized");
  }
}

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", { httpOnly: true, secure: true });
    redirect("/admin/dashboard");
  }
  
  return { error: "Invalid credentials" };
}

export async function addProduct(formData: FormData) {
  try {
    await checkAdmin();
    const name = formData.get("name") as string;
    const affiliateLink = formData.get("affiliateLink") as string;
    const file = formData.get("image") as File;
    let imageUrl = formData.get("imageUrl") as string;

    console.log("File received:", file?.name, file?.size, file?.type);

    if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `product_${Date.now()}.${fileExt}`;
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log("Uploading to Supabase...");
        const { data, error } = await supabase.storage
          .from('blog-images')
          .upload(fileName, buffer, { contentType: file.type });
        
        if (error) {
            console.error("Supabase Upload Error:", error);
            throw new Error(`Supabase upload failed: ${error.message}`);
        }
        console.log("Upload successful:", data);
        imageUrl = supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl;
    }
    
    console.log("Creating product in DB with imageUrl:", imageUrl);
    await prisma.product.create({ 
      data: { 
        name, 
        affiliateLink,
      imageUrl,
      description: formData.get("description") as string,
      price: formData.get("price") ? parseFloat(formData.get("price") as string) : null,
      category: (formData.get("category") as string)?.toLowerCase()
    } 
  });

    revalidatePath("/admin/dashboard");
  } catch (error) {
    console.error("AddProduct Error:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  await checkAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
}
