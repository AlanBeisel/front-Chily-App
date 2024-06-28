import React from 'react';
import OrderDetails from './OrderItem';
import { Order } from '@/types';

interface OrderListProps {
  orders:Order[];
}

const OrderList: React.FC <OrderListProps>= ({orders}) => {
  return(
    <div className="mt-4">
      {orders.map((order) => (
        <OrderDetails
        key = {order.id}
        order = {order}
      />
      ))}
    </div>
  );
};

export default OrderList;

