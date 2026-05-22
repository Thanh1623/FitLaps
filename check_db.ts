import { prisma } from './src/lib/db';

async function main() {
  const products = await prisma.product.findMany();
  console.log('Products:', JSON.stringify(products, null, 2));
}

main().catch(console.error);
