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
    email: string;
    products: Product[];
  } | null;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Detalle de la Orden</h2>
        <p className="mb-2">
          <strong>ID:</strong> {order.id}
        </p>
        <p className="mb-2">
          <strong>Fecha:</strong> {order.date}
        </p>
        <p className="mb-2">
          <strong>Precio:</strong> {order.price}
        </p>
        <p className="mb-4">
          <strong>Correo:</strong> {order.email}
        </p>
        <h3 className="text-lg font-semibold mb-2">Productos:</h3>
        <ul className="list-disc list-inside space-y-2">
          {order.products.map((product, index) => (
            <li key={index} className="flex justify-between">
              <span>{product.name}</span>
              <span>{product.price}</span>
            </li>
          ))}
        </ul>
        <Button
          className="bg-red-500 hover:bg-gray-500 mt-6 w-full py-2"
          onClick={onClose}
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
}
