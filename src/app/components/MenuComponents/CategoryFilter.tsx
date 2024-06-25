'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAllCategories } from '@/helpers/peticiones'; 
import { Category } from '@/types'; 

export const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        console.log(
          'Categorías obtenidas en el componente:',
          fetchedCategories,
        );
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Manejo de errores: puedes mostrar un mensaje al usuario o registrar el error
      }
    };

    fetchCategories();
  }, []);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-around mb-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.id} 
          className="flex flex-col items-center mx-2 focus:outline-none group"
          onClick={() => scrollToCategory(category.id)}
        >
          <div className="w-16 h-16 relative mb-1 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
            <Image
              src={category.icon}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="transition-opacity duration-300 group-hover:opacity-80"
            />
          </div>
          <span className="text-xs text-center transition-colors duration-300 group-hover:text-red-500">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
};
