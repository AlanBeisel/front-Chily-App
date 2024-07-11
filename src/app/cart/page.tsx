'use client';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CartItemType, ProductsInOrder } from '@/types';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const CartPage: React.FC = () => {
  const { isAuthenticated, address, user } = useAuth();
  const [items, setItems] = useState<CartItemType[]>([]);
  const [orderInstructions, setOrderInstructions] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const storedItems = localStorage.getItem('cartItems');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    }
  }, [isAuthenticated]);

  const updateQuantity = (id: number, increment: number) => {
    if (!isAuthenticated) {
      toast.warn('Debes iniciar sesión para actualizar el carrito.');
      return;
    }

    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + increment) }
        : item,
    );
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    if (!isAuthenticated) {
      toast.warn('Debes iniciar sesión para actualizar el carrito.');
      return;
    }

    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    if (!address) {
      toast.warn(
        'Por favor, proporciona tu dirección antes de proceder al checkout.',
      );
      localStorage.setItem('fromCart', 'true');
      router.push('/address');
      return;
    }

    const productsInOrder: ProductsInOrder[] = items.map((item) => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const order = {
      userId: Number(user?.id),
      productsInOrder,
      orderInstructions,
      address: Number(address.id),
      total: calculateTotal(),
    };
    
    localStorage.setItem('order', JSON.stringify(order));
    console.log('Order saved to localStorage:', order);
    router.push('/checkout');
  };


 return (
   <div className="min-h-screen flex flex-col">
     {items.length === 0 ? (
       <div className="max-w-md mx-auto text-center py-12 px-4 flex-grow">
         <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
         <p className="mb-4">
           Agrega algunos productos para comenzar a comprar.
         </p>
         <Link href="/menu" className="text-blue-500 hover:underline">
           Volver al menú
         </Link>
       </div>
     ) : (
       <div className="max-w-md mx-auto p-4 sm:max-w-2xl md:max-w-4xl flex-grow">
         <div className="bg-white rounded-lg shadow-md p-6 mb-4">
           {items.map((item) => (
             <div
               key={item.id}
               className="flex items-center justify-between py-4 border-b"
             >
               <div className="flex items-center space-x-4">
                 <Image
                   src={item.img}
                   alt={item.name}
                   width={60}
                   height={60}
                   className="rounded-md"
                 />
                 <div>
                   <h3 className="font-semibold">{item.name}</h3>
                   <p className="text-gray-600">${item.price}</p>
                 </div>
               </div>
               <div className="flex items-center space-x-2">
                 <button
                   onClick={() => updateQuantity(item.id, -1)}
                   className="text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                 >
                   <FiMinus size={24} />
                 </button>
                 <span>{item.quantity}</span>
                 <button
                   onClick={() => updateQuantity(item.id, 1)}
                   className="text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                 >
                   <FiPlus size={24} />
                 </button>
                 <button
                   onClick={() => removeItem(item.id)}
                   className="ml-2 text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100 hover:bg-red-200"
                 >
                   <FiTrash size={24} />
                 </button>
               </div>
             </div>
           ))}
           <div className="mt-4">
             <h3 className="font-semibold mb-2">Instrucciones del Pedido:</h3>
             <textarea
               value={orderInstructions}
               onChange={(e) => setOrderInstructions(e.target.value)}
               className="w-full p-2 border rounded-md"
               rows={3}
             />
           </div>
         </div>
         <div className="bg-white rounded-lg shadow-md p-6">
           <div className="flex justify-between mb-2">
             <span>Subtotal:</span>
             <span>${calculateTotal().toFixed(2)}</span>
           </div>
           <button
             onClick={proceedToCheckout}
             className="block w-full bg-red-500 text-white text-center font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
           >
             Ir al checkout
           </button>
         </div>
         <div className="mt-4 text-center">
           <Link href="/" className="text-blue-500 hover:underline">
             ← Volver al Menu
           </Link>
         </div>
       </div>
     )}
   </div>
 );
};

export default CartPage;
