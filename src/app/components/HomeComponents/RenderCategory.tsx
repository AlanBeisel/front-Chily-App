'use client';
import React, { useEffect, useState } from 'react';
import { useCache } from '@/app/contexts/CacheContext';
import CategoryProducts from './CategoryProducts';


export const RenderCategory = () => {
  const { categories } = useCache();
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
              const categoryId = parseInt(category.id.toString()); //modificacion
              return (
                categoryId >= 1 &&
                categoryId <= 32 &&
                category.products.length > 0
              );
            })
            .map((category) => (
              <CategoryProducts
                key={category.id}
                categoryId={category.id.toString()}
                name={category.name}
                products={category.products} // Pasamos los productos directamente
              />
            ))}
        </div>
      )}
    </div>
  );
};
