'use client'
import React, { useEffect, useState } from 'react';
import OrderList from '../components/OrderComponents/OrderList';
import { getOrders } from '@/helpers/peticionOrder';
import { Order } from '@/types';
import Link from 'next/link';

const UserOrders: React.FC<{ userId: string }> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders(userId);
        setOrders(ordersData);
      } catch (error) {
        setError('No se pudieron cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <div className= "text-center mt-4">Cargando...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

  if (orders.length ===0) {
    return(
      <div className="text-center mt-8">
        <p className="text-lg font-semibold text-gray-700 mb-4">¡Todavía no hiciste ningún pedido!</p>
        <Link href="/menu" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Menú
        </Link>
      </div>
    );
  } 
  return <OrderList orders={orders} />;
};

export default UserOrders;
