'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import { getProducts } from '@/helpers/peticiones';
import ProductCard from '@/app/components/Cards/ProductCard';
import Pagination from '@/app/components/HomeComponents/Pagination';
import MenuFilters from '../components/MenuComponents/MenuFilter';
import { Product } from '@/types';

const PRODUCTS_PER_PAGE = 8;

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true); 

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts(
        currentPage,
        PRODUCTS_PER_PAGE,
        appliedFilters,
      );
      setProducts(fetchedProducts);
      const totalPagesCount = Math.ceil(
        fetchedProducts.length / PRODUCTS_PER_PAGE,
      );
      setTotalPages(totalPagesCount || 1);
      setHasMore(fetchedProducts.length === PRODUCTS_PER_PAGE); 
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setHasMore(false); 
    }
  };

  fetchProducts();
}, [currentPage, appliedFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Añadir al carrito:', product);
    // Implementa la lógica para agregar al carrito aquí

  };

  const handleFilterChange = (filters: string[]) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    // Al cambiar los filtros, volver a la página 1
  };

  return (
    <div className="p-6">
      <SearchBar />
      <div className="flex w-full h-full">
        <div className="w-1/4 p-4 border-r border-gray-200">
          <MenuFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
);
};
