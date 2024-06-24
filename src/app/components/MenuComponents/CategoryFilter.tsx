'use client';

import React from 'react';
import Image from 'next/image';

const categories = [
  { name: 'Pizza', icon: '/pizza.png', id: 'pizza' },
  { name: 'Burger', icon: '/burger.png', id: 'burger' },
  { name: 'Burritos', icon: '/burrito.png', id: 'burritos' },
  { name: 'Papas fritas', icon: '/papas.png', id: 'papas-fritas' },
];

export const CategoryFilter = () => {
  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-between mb-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category.name}
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
