"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category } from '@/types';
import { getAllCategories } from '@/helpers/peticiones';

interface CacheProviderProps {
  children: ReactNode; // Esto permite que cualquier nodo React (elemento, string, número, etc.) se pase como children
}

interface CacheContextType {
  categories: Category[];
  products: Product[];
  fetchCategories: () => Promise<void>;
  fetchProducts: (categoryId: string) => Promise<void>;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
};

export const CacheProvider: React.FC<CacheProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

   const fetchCategories = async () => {
     try {
       const fetchedCategories = await getAllCategories();
       setCategories(fetchedCategories);
     } catch (error) {
       console.error('Failed to fetch categories:', error);
     }
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
   }, [categories]);

  const fetchProducts = async (categoryId: string) => {
    // Aquí realizarías el fetch y almacenarías los datos en el estado
    const response = await fetch(`/api/products?categoryId=${categoryId}`);
    const data = await response.json();
    setProducts(data);
  };

  return (
    <CacheContext.Provider
      value={{ categories, products, fetchCategories, fetchProducts }}
    >
      {children}
    </CacheContext.Provider>
  );
};
