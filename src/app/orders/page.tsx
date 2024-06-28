'use client'
import React, {useState, useEffect} from 'react';
import OrderList from '../components/OrderComponents/OrderList';
import { Order } from '@/types';
import { useAuth } from '../contexts/AuthContext';
import { getOrders } from '@/helpers/peticionOrder';



const Orders: React.FC = () => {

const {user} = useAuth();
const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersData = await getOrders(user); //agregar a context de auth (user.userID)
          setOrders(ordersData);
        } catch (error) {
          console.error ('Error al obtener órdenes del usuario:', error);
        }
      }
    };

    fetchOrders();
  }, []); //[user]


  return (
    <div>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-red-500">Mis Pedidos</h1>
      </header>
      <OrderList orders = {orders} />
    </div>
  );
};

export default Orders