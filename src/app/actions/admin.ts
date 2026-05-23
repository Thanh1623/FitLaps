"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

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
  await checkAdmin();
  const name = formData.get("name") as string;
  const affiliateLink = formData.get("affiliateLink") as string;
  
  await prisma.product.create({ 
    data: { 
      name, 
      affiliateLink,
      description: formData.get("description") as string,
      price: formData.get("price") ? parseFloat(formData.get("price") as string) : null,
      category: formData.get("category") as string
    } 
  });
  revalidatePath("/admin/dashboard");
}

export async function deleteProduct(id: string) {
  await checkAdmin();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/dashboard");
}
