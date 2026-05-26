import { prisma } from "@/lib/db";

async function normalizeCategories() {
  const products = await prisma.product.findMany();
  for (const p of products) {
    if (p.category) {
      await prisma.product.update({
        where: { id: p.id },
        data: { category: p.category.toLowerCase() }
      });
    }
  }
  console.log("Categories normalized.");
}

normalizeCategories().catch(console.error);
