'use client';
import Pagination from '@/app/components/HomeComponents/Pagination';
import React, { useState, useEffect } from 'react';
import { getProductsByCategoryId } from '@/helpers/peticiones';
import { Product } from '@/types';
import ProductCard from '@/app/components/Cards/ProductCard';

const categoryMapping: Record<string, string> = {
  '1': 'Porciones',
  '2': 'Bebidas',
  '3': 'Entradas',
  '4':'Parrilla',
  '5': 'Jochos',
  '6': 'Quesadillas',
  '7': 'Tacos',
  '8': 'Nachos',
  '9' : 'Alitas',
  '10': 'Hamburguesas',
  '11':'Franchutes',
  '12':'Arepas Rellenas',
  '13': 'Salchipapas',
  '14': 'Burritos',
  '15': 'Otros',
  '16': 'Carnes', 
  '17':'Pescados',
  '18': 'Vegetarianos',
  '19': 'Con alcohol',
  '20': 'Sin alcohol',
  '21': 'Gaseosas',
  '22': 'Cervezas',
  '23': 'Limonadas',
  '24': 'Vinos',
  '25': 'Jugos', 
  '26':'Pastas',
  '27': 'Papas',
  '28': 'Ensaladas',
};

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const categoryId = params.category;
  const categoryName = categoryMapping[categoryId] || 'Categoría Desconocida';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log(
          `Fetching products for category ${categoryId}, page ${page}`,
        );
        const fetchedProducts = await getProductsByCategoryId(
          categoryId,
          page,
          limit,
        );
        setProducts(
          page === 1 ? fetchedProducts : [...products, ...fetchedProducts],
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
    console.log('Agregado al carrito:', product);
  };

  if (loading && products.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryName}:</h1>
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
        hasMore={hasMore}
      />
      {loading && <p className="text-center mt-4">Cargando...</p>}
      {!loading && !hasMore && (
        <p className="text-center mt-4">No hay más productos para cargar.</p>
      )}
    </div>
  );
};

export default CategoryPage;
