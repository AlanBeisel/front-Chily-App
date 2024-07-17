"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isAuthenticated } = useAuth();
  


  if (product.stock <= 0) {
    return null;
  }


  const getInitialQuantity = (productId: string): number => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const existingItem = cartItems.find((item: any) => item.id === productId);
      return existingItem ? existingItem.quantity : 0;
    }
    return 0;
  };


  const [quantity, setQuantity] = useState<number>(() =>
    getInitialQuantity(product.id),
  );

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.warn('Debes iniciar sesión para agregar productos al carrito.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const storedCart = localStorage.getItem('cartItems');
    let cartItems = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find((item: any) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.warn('No hay suficiente stock disponible.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      cartItems = cartItems.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      if (product.stock <= 0) {
        toast.warn('No hay suficiente stock disponible.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setQuantity(quantity + 1);
    toast.success('Producto agregado al carrito.', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemoveFromCart = () => {
    const storedCart = localStorage.getItem('cartItems');
    let cartItems = storedCart ? JSON.parse(storedCart) : [];

    const existingItem = cartItems.find((item: any) => item.id === product.id);

    if (existingItem && existingItem.quantity > 1) {
      cartItems = cartItems.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    } else {
      cartItems = cartItems.filter((item: any) => item.id !== product.id);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setQuantity(quantity > 1 ? quantity - 1 : 0);
  };

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 relative max-w-xs ">
        <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 mb-4">
          <Image
            src={product.img}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl truncate">
          {product.name}
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          ${product.price.toFixed(2)}
        </p>
        {quantity > 0 ? (
          <div className="absolute bottom-2 right-2 flex items-center space-x-2">
            <button
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveFromCart();
              }}
            >
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button
              className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            className="absolute bottom-2 right-2 bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <FaPlus />
          </button>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
