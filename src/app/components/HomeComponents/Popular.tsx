'use client';
import { Product } from '@/types';
import ProductCard from '../Cards/ProductCard';

export const Popular = ({
  popularProducts,
}: {
  popularProducts: Product[];
}) => {
  const handleAddToCart = (product: Product) => {
    console.log(`Producto agregado al carrito: ${product.name}`);
  };

  return (
    <div className="category-container bg-gray-100 rounded-lg shadow-md p-4 mb-8">
      <h2 className="text-xl text-yellow-400 font-bold mb-2">Popular</h2>
      <div className="grid grid-cols-3 gap-4 justify-items-center">
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
