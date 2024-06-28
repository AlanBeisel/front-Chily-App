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
       const products = await getProducts(1, 4);
       const popularProducts = products.filter((product) => product.isPopular);
       setPopularProducts(popularProducts);
     } catch (error) {
       console.error('Error al cargar productos populares:', error);
     }
   }

   fetchPopularProducts();
 }, []);

 const handleAddToCart = (product: Product) => {
   // Lógica para agregar el producto al carrito
  console.log(`Producto agregado al carrito: ${product.name}`);
 };

  return (
    <div className="mb-4">
      <h2 className="text-xl text-yellow-400 font-bold mb-2">Popular</h2>
      <div className="grid grid-cols-2 gap-4">
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