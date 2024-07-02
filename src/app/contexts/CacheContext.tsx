'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  getAllCategories,
  getProducts,
} from '@/helpers/peticiones';
import { Category, Product } from '@/types';



interface CacheProviderProps {
  children: ReactNode;
}

interface CacheContextType {
  categories: Category[];
  products: Product[];
  fetchCategories: () => Promise<void>;
  getAllProducts: () => Promise<void>;
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


 const getAllProducts = async () => {
   console.log('Fetching all products...');
   try {
     const fetchedProducts = await getProducts(1, 1000);
     setProducts(fetchedProducts);
   } catch (error) {
     console.error('Failed to fetch all products:', error);
   }
 };


  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };


useEffect(() => {
  fetchCategories();
  getAllProducts(); 
}, []);


  return (
    <CacheContext.Provider
      value={{
        categories,
        products,
        fetchCategories,
        getAllProducts
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};
