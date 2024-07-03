import React from 'react';
import OrderList from '../components/OrderComponents/OrderList';
import { IOrderProps } from '../components/OrderComponents/OrderItem';

const orders: IOrderProps[] = [
  {
    orderId: 'order1',
    date: '2024-06-25',
    products: [
      { name: 'Beef Burger', quantity: 2 },
      { name: 'pizza Tikki', quantity: 1 },
    ],
    totalPrice: 100,
    status: 'pending',
  },
  {
    orderId: 'order2',
    date: '2024-05-20',
    products: [
      { name: 'Beef Burger', quantity: 3 },
      { name: 'pizza Tikki', quantity: 2 },
    ],
    totalPrice: 150,
    status: 'completed',
  },
];

/*export async function getServerSideProps() {
  const res = await fetch ('https://chilyapi.onrender.com/pedidos');
  const orders = await res.json();
  return {
    props: {
      orders,
    },
  };
}*/

const Orders: React.FC = () => {
  /*<{orders: IOrderProps[]}> = ({orders}) => {*/
  return (
    <div>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold text-red-500">Mis Pedidos</h1>
      </header>
      <OrderList orders={orders} />
    </div>
  );
};

export default Orders;
