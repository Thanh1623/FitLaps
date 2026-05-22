import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: any | null; 
  affiliateLink: string;
  category: string | null;
}

interface RecommendationCardProps {
  product: Product;
}

export function RecommendationCard({ product }: RecommendationCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{product.name}</h4>
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">
          ${product.price?.toString()}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow">
        {product.description}
      </p>
      
      <a 
        href={product.affiliateLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full"
      >
        <Button variant="default" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
          View Product <ExternalLink className="w-4 h-4" />
        </Button>
      </a>
    </div>
  );
}
