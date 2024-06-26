'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAllCategories } from '@/helpers/peticiones';
import { Category } from '@/types';

export const CategoryFilter = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter()

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

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

   const handleViewAllProducts = () => {
     router.push('/menu');
   };

  return (
    <div className="flex justify-center mb-4 overflow-x-auto">
      <div className="flex space-x-12 p-2">
        <button
          className="flex flex-col items-center focus:outline-none group"
          onClick={handleViewAllProducts}
        >
          <div className="w-16 h-16 relative mb-1 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg bg-gray-200">
            <Image
              src="/Carta.png"
              alt="Ver Todos"
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300 group-hover:opacity-80"
            />
          </div>
          <span className="text-xs text-center transition-colors duration-300 group-hover:text-red-500">
            Ver Todos
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className="flex flex-col items-center focus:outline-none group"
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
    </div>
  );
};
