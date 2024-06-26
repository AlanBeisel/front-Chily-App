'use client';
import Pagination from '@/app/components/HomeComponents/Pagination';
import React, { useState, useEffect } from 'react';
import { getProductsByCategoryId } from '@/helpers/peticiones'; 
import { Product } from '@/types'; 
import ProductCard from '@/app/components/Cards/ProductCard';


// const categoryMapping: Record<string, string> = {
//   '1': 'burritos',
//   '2': 'pizzas',
//   '3': 'bebidas',
//   // Agrega tus IDs y nombres de categoría
// };

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const categoryId = params.category; 
  // const categoryName = categoryMapping[categoryId] || 'Categoría Desconocida';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10; 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProductsByCategoryId(
          categoryId,
          page,
          limit,
        );
        setProducts((prev) =>
          page === 1 ? fetchedProducts : [...prev, ...fetchedProducts],
        );
        setHasMore(fetchedProducts.length === limit);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, page]);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleAddToCart = (product: Product) => {
    // Implementa la lógica para agregar al carrito aquí
    console.log('Agregado al carrito:', product);
    // Llamar a una función que actualice el estado del carrito
    // updateCart(product);
  };

  if (loading && products.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Categoría: {categoryId}</h1>
      {/* <h1 className="text-3xl font-bold mb-6">Categoría: {categoryName}</h1> */}
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

        {loading && <p className="text-center mt-4">Cargando...</p>}

        {!loading && !hasMore && (
          <p className="text-center mt-4">No hay más productos para cargar.</p>
        )}
      </>
    </div>
  );
};

export default CategoryPage;
