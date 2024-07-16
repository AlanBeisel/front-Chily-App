"use client"
import React, { useState, useEffect } from 'react';
import { Address, ProductsInOrder } from '@/types';
import StatusTracker from './StatusTracker';

interface OrderProps {
  order: Order;
}

interface Order {
  id: number;
  userId: number;
  address: Address;
  details: ProductsInOrder[];
  formBuy: 'efectivo' | 'tarjeta';
  total: number;
  status:
    | 'Pendiente'
    | 'Confirmada'
    | 'En camino'
    | 'En preparación'
    | 'Entregada';
  date: string;
}


const OrderDetails: React.FC<OrderProps> = ({ order }) => {
  const [showStatusTracker, setShowStatusTracker] = useState(false);


  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null;

    if (
      order.status === 'Confirmada' ||
      order.status === 'En preparación' ||
      order.status === 'En camino'
    ) {
      setShowStatusTracker(true);
    } else if (order.status === 'Entregada') {
      setShowStatusTracker(true);
      hideTimer = setTimeout(() => {
        setShowStatusTracker(false);
      }, 20000);
    } else {
      setShowStatusTracker(false);
    }

    
    
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [order.status]);

  return (
    <div className="bg-red-500 text-white rounded-lg p-4 mb-4">
      <div className="flex justify-between mb-2">
        <div className="text-sm">
          {new Date(order.date).toLocaleDateString()}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-bold mb-2">Productos:</div>

        {order.details.map((product, index) => (
          <div key={index} className="mb-2">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="inline-block bg-yellow-400 text-gray-700 rounded-xl p-1 mr-2">
                {product.name}
              </div>
              <div className="inline-block bg-red-400 text-white rounded-xl p-1">
                Cantidad: {product.quantity}
              </div>
            </div>
          </div>
        ))}
        <div className="inline-block text-gray-700 bg-green-400 rounded-xl p-1 mb-2">
          Forma de pago: {order.formBuy}{' '}
        </div>
        <div className="text-lg text-yellow-300 font-bold mt-2">
          Total: ${order.total.toFixed(2)}
        </div>
      </div>

      <div className="text-sm mb-6 sm:mb-0 bg-white rounded-xl">
        {showStatusTracker && <StatusTracker status={order.status} />}
      </div>
    </div>
  );
};

export default OrderDetails;