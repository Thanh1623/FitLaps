import { getProductById } from "@/services/affiliate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button"; // Check if Button exists

export default async function ProductCard({ productId }: { productId: string }) {
  const product = await getProductById(productId);

  if (!product) return null;

  return (
    <Card className="my-4 p-4 border border-emerald-500/20 flex gap-4">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
      )}
      <div className="flex-1">
        <CardHeader className="p-0 mb-2">
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{product.description}</p>
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            View Product
          </a>
        </CardContent>
      </div>
    </Card>
  );
}
