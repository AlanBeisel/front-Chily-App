'use client';
import React, { useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts';
import { Category } from '@/types';


export const RenderCategory = ({ categories }: { categories: Category[] }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categories.length > 0) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {categories
            .filter((category) => {
              const categoryId = parseInt(category.id);
              return (
                categoryId >= 1 &&
                categoryId <= 16 &&
                category.products.length > 0
              );
            })
            .map((category) => (
              <CategoryProducts
                key={category.id}
                categoryId={category.id}
                name={category.name}
                products={category.products} // Pasamos los productos directamente
              />
            ))}
        </div>
      )}
    </div>
  );
};
