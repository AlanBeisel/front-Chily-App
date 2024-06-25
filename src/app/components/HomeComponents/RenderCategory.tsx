"use client"
import React, { useEffect, useState } from 'react';
import CategoryProducts from './CategoryProducts';
import { getAllCategories } from '@/helpers/peticiones';
import { Category } from '@/types'; 

export const RenderCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <CategoryProducts
            key={category.id}
            categoryId={category.id}
            name={category.name}
          />
        ))}
      </div>
  );
};

