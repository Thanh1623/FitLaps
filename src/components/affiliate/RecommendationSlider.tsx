"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: any | null;
  affiliateLink: string;
  imageUrl: string | null;
  category: string | null;
}

interface RecommendationSliderProps {
  products: Product[];
}

export function RecommendationSlider({ products }: RecommendationSliderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {paginatedProducts.map((product) => (
            <RecommendationCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === index 
                  ? 'bg-emerald-700 dark:bg-emerald-600' 
                  : 'bg-emerald-200 dark:bg-emerald-800'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
