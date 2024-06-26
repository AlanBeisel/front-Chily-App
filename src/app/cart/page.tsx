"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CartItem from '@/app/components/Cart/CartItem';
import { CartItemType } from '@/types';

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    //   const storedItems = localStorage.getItem('cartItems');
    //   if (storedItems) {
    //     setItems(JSON.parse(storedItems));
    //   }
    // }, []);
    const fakeItems: CartItemType[] = [
      { id: 1, name: 'David Pancho', price: 9, quantity: 1, img: '/pizza.png' },
      {
        id: 2,
        name: 'Jona Choripan',
        price: 20,
        quantity: 1,
        img: '/papas.png',
      },
      { id: 3, name: 'Esaul Burger', price: 5, quantity: 2, img: '/burrito.png' },
    ];

    // Almacenar productos ficticios en localStorage
    localStorage.setItem('cartItems', JSON.stringify(fakeItems));

    // Leer productos del localStorage y actualizar el estado
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const updateQuantity = (id: number, increment: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + increment) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const proceedToCheckout = () => {
    const order = {
      items,
      deliveryFees: 1.5,
      total: calculateTotal() + 0.3 + 1.5,
    };
    localStorage.setItem('order', JSON.stringify(order));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-full mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Tu carrito está vacío</h2>
        <p className="mb-4">
          Agrega algunos productos para comenzar a comprar.
        </p>
        <Link href="/menu" className="text-blue-500 hover:underline">
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Tu carrito de compras</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </ul>
      <div className="mt-8">
        <Link
          href="/checkout"
          onClick={proceedToCheckout}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded m-6"
        >
          Proceder al pago
        </Link>
      </div>
      <div className='m-8'>
        
      <Link href="/menu" className=''>← Volver al menú</Link>
      </div>
    </div>
  );
};

export default CartPage;
