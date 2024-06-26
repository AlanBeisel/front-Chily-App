'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getProductsByCategoryId } from '@/helpers/peticiones';
import ProductCard from '../Cards/ProductCard';
import Pagination from './Pagination';
import { Product } from '@/types';


interface CategoryProductsProps {
  categoryId: string;
  name: string;
  limit?: number;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({
  categoryId,
  name,
  limit = 5,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

useEffect(() => {
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      console.log(`Fetching products for category ${name} (${categoryId})`);
      const fetchedProducts = await getProductsByCategoryId(
        categoryId,
        page,
        limit,
      );
      setProducts(fetchedProducts);
      setHasMore(fetchedProducts.length === limit);
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
 }, [categoryId, page, limit, name]);
  console.log('Products:', products);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleAddToCart = (product: Product) => {
    // Implementa la lógica para agregar al carrito aquí
    console.log('Agregado al carrito:', product);
    // Llamar a una función que actualice el estado del carrito
    // updateCart(product);
  };

  const handleViewAll = () => {
    router.push(`/viewCategory/${categoryId}`);
  };

  return (
    <div id={categoryId} className="category-container bg-white rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-2xl font-bold mb-4">{name}</h2>

      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(products.length / limit)}
        onPageChange={handlePageChange}
      />

      {isLoading && <p className="text-center mt-4">Cargando...</p>}

      {!isLoading && !hasMore && (
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
