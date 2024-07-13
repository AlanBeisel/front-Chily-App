'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Category } from '@/types';

export const CategoryFilter = ({categories}: {categories: Category[]}) => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewAllProducts = () => {
    router.push('/menu');
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200;
    }
  };

  return (
    <div className="w-full mx-auto px-4">
      <div className="relative w-full py-4">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
          onClick={scrollLeft}
        >
          <IoIosArrowBack className="text-gray-600 text-lg" />
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
          onClick={scrollRight}
        >
          <IoIosArrowForward className="text-gray-600 text-lg" />
        </button>
        <div
          className="overflow-x-auto rounded-3xl"
          ref={sliderRef}
          style={{
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 p-2 sm:p-3 md:p-4 w-full">
            <button
              className="flex flex-col items-center focus:outline-none group flex-shrink-0"
              onClick={handleViewAllProducts}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative mb-2 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Image
                  src="/Carta.png"
                  alt="Ver Todos"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-xs sm:text-sm md:text-base text-center text-gray-600 truncate w-full">
                MENU COMPLETO
              </span>
            </button>
            {categories
              .filter(
                (category) =>
                  parseInt(category.id) <= 16 && category.products.length > 0,
              )
              .map((category) => (
                <button
                  key={category.id}
                  className="flex flex-col items-center focus:outline-none group flex-shrink-0"
                  onClick={() => scrollToCategory(category.id)}
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative mb-2 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-opacity duration-300 group-hover:opacity-80"
                    />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base text-center text-gray-600 truncate w-full">
                    {category.name}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
