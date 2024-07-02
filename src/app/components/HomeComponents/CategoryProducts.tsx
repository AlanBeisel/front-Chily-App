'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../Cards/ProductCard';
import Pagination from './Pagination';
import { Product } from '@/types';

interface CategoryProductsProps {
  categoryId: string;
  name: string;
  products: Product[];
  limit?: number;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  categoryId,
  name,
  products,
  limit = 5,
}) => {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(products.length / limit);
  const hasMore = page < totalPages;

  const displayedProducts = products.slice((page - 1) * limit, page * limit);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Agregado al carrito:', product);
  };

  const handleViewAll = () => {
    router.push(`/viewCategory/${categoryId}`);
  };

  return (
    <div
      id={categoryId}
      className="category-container bg-white rounded-lg shadow-md p-4 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">{name}</h2>

      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        hasMore={hasMore}
      />

      {!hasMore && (
        <p className="text-center mt-4">No hay más productos para cargar.</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleViewAll}
          className="bg-gray-100 hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
        >
          Ver todos
        </button>
      </div>
    </div>
  );
};

export default CategoryProducts;
