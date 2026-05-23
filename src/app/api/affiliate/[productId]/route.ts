import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  await prisma.clickLog.create({
    data: { productId }
  });

  return NextResponse.redirect(product.affiliateLink);
}
