import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: any | null; 
  affiliateLink: string;
  imageUrl: string | null;
  category: string | null;
}

interface RecommendationCardProps {
  product: Product;
}

export function RecommendationCard({ product }: RecommendationCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col overflow-hidden transition-all hover:shadow-xl hover:border-emerald-500/30">
      {product.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{product.name}</h4>
          {product.price && (
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full whitespace-nowrap">
              ${parseFloat(product.price.toString()).toFixed(2)}
            </span>
          )}
        </div>
        
        {product.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow line-clamp-3">
            {product.description}
          </p>
        )}
        
        <a 
          href={product.affiliateLink} 
          target="_blank" 
          rel="noopener noreferrer nofollow"
          className="w-full mt-2"
        >
          <Button variant="default" className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-2">
            View Product <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
