"use client"
import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { getPopularProducts } from '@/helpers/peticiones';
import { Product } from '@/types';
import ProductCard from '../Cards/ProductCard';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Deliciosa pizza con tomate, mozzarella y albahaca.',
    price: 8.99,
    img: 'https://img.freepik.com/fotos-premium/rebanada-pizza-pepperoni-italiana-tradicional-salsa-tomate-rucula_285885-2420.jpg?w=996',
    available: true,
    isPopular: true,
    category: 'Pizza',
  },
  {
    id: '2',
    name: 'Cheeseburger',
    description: 'Hamburguesa con queso, lechuga, tomate y cebolla.',
    price: 5.99,
    img: 'https://img.freepik.com/foto-gratis/deliciosa-hamburguesa-aislado-sobre-fondo-blanco_125540-3368.jpg?t=st=1719240684~exp=1719244284~hmac=bb8e26b7921c771b0d27933bb48223f0bc6904d6d5315ebdf4e8dab44705252c&w=996',
    available: true,
    isPopular: true,
    category: 'Burger',
  },
  {
    id: '3',
    name: 'Burrito de Pollo',
    description: 'Burrito relleno de pollo, arroz, frijoles y salsa.',
    price: 7.99,
    img: 'https://img.freepik.com/foto-gratis/vista-frontal-delicioso-sandwich-carne-hecho-carne-parrilla-asador-rodajas-condimentos-escritorio-azul-oscuro_140725-61597.jpg?t=st=1719240703~exp=1719244303~hmac=9fadf8ca925883cbdef945ee536a3f437daad4a098e3ba234558c509706de470&w=996',
    available: true,
    isPopular: true,
    category: 'Burritos',
  },
  {
    id: '4',
    name: 'Papas Fritas',
    description: 'Crujientes papas fritas con sal.',
    price: 2.99,
    img: 'https://img.freepik.com/foto-gratis/vista-lateral-papas-fritas-condimento_141793-4899.jpg?t=st=1719240751~exp=1719244351~hmac=114449e0989345908a0bc36901cf30b94df02fdff6a9e72c2e4b6b1088d6b0b6&w=996',
    available: true,
    isPopular: true,
    category: 'Snacks',
  },
];


export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  useEffect(() => {
    // async function fetchPopularProducts() {
    //   try {
    //     const products = await getPopularProducts();
    //     setPopularProducts(products);
    //   } catch (error) {
    //     console.error('Error al cargar productos populares:', error);
    //   }
    // }

    // fetchPopularProducts();
    setPopularProducts(initialProducts.filter((product) => product.isPopular));
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