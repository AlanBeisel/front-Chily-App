"use client"
import { Promotions } from '../app/components/HomeComponents/Promotions';
import { Popular } from '../app/components/HomeComponents/Popular';
import { SearchBar } from '../app/components/SearchBar/searchBar';
import { CategoryFilter } from '../app/components/MenuComponents/CategoryFilter';
import CategoryProducts from './components/HomeComponents/CategoryProducts';
import { Category } from '@/types';
import { useState, useEffect } from 'react';
import { getAllCategories } from '@/helpers/peticiones';


export default function Home() {

const [categories, setCategories] = useState<Category[]>([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  fetchCategories();
}, []);

  return (
    <>
      <div className="w-full flex justify-center">
        <main className="flex-grow p-4">
          <SearchBar />
          <CategoryFilter />
          <Promotions />
          <Popular />
          {categories.map((category) => (
            <CategoryProducts
              key={category.id}
              categoryId={category.id}
              name={category.name}
            />
          ))}
        </main>
      </div>
    </>
  );
}
