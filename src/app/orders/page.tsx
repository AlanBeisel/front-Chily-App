'use client'
import React, { useEffect, useState } from 'react';
import OrderList from '../components/OrderComponents/OrderList';
import { getOrders } from '@/helpers/peticionOrder';
import { Address, ProductsInOrder } from '@/types';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/ProductIdComponents/BackButton';

interface Order {
  id: number;
  userId: number;
  address: Address;
  details: ProductsInOrder[];
  formBuy: 'efectivo' | 'tarjeta';
  total: number;
  status: 'Pendiente' | 'Confirmada' | 'En camino' | 'Entregada';
  date: string;
}

const UserOrders: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return; 

    if (!userId) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrders(userId);
        setOrders(ordersData);
      } catch (error: any) {
        setError(error.message || 'No se pudieron cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, authLoading]);

  if (authLoading || loading)
    return <div className="text-center mt-4">Cargando...</div>;
  if (error)
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

  return (
    <div className="relative min-h-screen p-4">
      <div className="absolute top-0 left-0 p-4">
        <BackButton />
      </div>
      {orders.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-lg font-semibold text-gray-700 mb-4">
            ¡Todavía no hiciste ningún pedido!
          </p>
          <Link
            href="/menu"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Menú
          </Link>
        </div>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
};

export default UserOrders;