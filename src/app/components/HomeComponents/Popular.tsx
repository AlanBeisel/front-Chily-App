"use client"
import { useState, useEffect } from 'react';
import { getProducts } from '@/helpers/peticiones';
import { Product } from '@/types';
import ProductCard from '../Cards/ProductCard';



export const Popular = () => {
 const [popularProducts, setPopularProducts] = useState<Product[]>([]);

 useEffect(() => {
   async function fetchPopularProducts() {
     try {
       const products = await getProducts(1, 1000);
       const popularProducts = products.filter((product) => product.isPopular);
       setPopularProducts(popularProducts);
     } catch (error) {
       console.error('Error al cargar productos populares:', error);
     }
   }

   fetchPopularProducts();
 }, []);

 const handleAddToCart = (product: Product) => {
  console.log(`Producto agregado al carrito: ${product.name}`);
 };

  return (
    <div className="category-container bg-gray-200 rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl text-yellow-500 font-bold mb-2">Productos más populares:</h2>
      <div className="product-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {popularProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};