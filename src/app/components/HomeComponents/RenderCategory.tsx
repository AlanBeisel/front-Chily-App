'use client';
import React, { useEffect } from 'react';
import CategoryProducts from './CategoryProducts';
import { useCache } from '@/app/contexts/CacheContext';

export const RenderCategory = () => {
  const { categories, fetchCategories } = useCache();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  console.log('Categorías:', categories);

  return (
    <div>
      {categories
        .filter((category) => category.products && category.products.length > 0) // Filtra categorías sin productos
        .map((category) => (
          <CategoryProducts
            key={category.id}
            categoryId={category.id}
            name={category.name}
          />
        ))}
    </div>
  );
};
