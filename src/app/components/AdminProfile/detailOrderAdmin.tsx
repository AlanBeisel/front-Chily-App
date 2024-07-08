import React from 'react';
import { Button } from '../ui/button';

interface Product {
  name: string;
  price: string;
}

interface OrderDetailModalProps {
  order: {
    id: string;
    date: string;
    price: string;
    products: Product[];
  } | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2>Detalle de la Orden</h2>
        <p>ID: {order.id}</p>
        <p>Fecha: {order.date}</p>
        <p>Precio: {order.price}</p>
        <h3>Productos:</h3>
        <ul>
          {order.products.map((product, index) => (
            <li key={index}>
              {product.price} x {product.name}
            </li>
          ))}
        </ul>
        <Button className="bg-red-500 mt-4" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
