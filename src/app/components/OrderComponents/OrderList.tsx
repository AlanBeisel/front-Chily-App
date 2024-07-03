import React from 'react';
import OrderDetails, { IOrderProps } from './OrderItem';

interface OrderListProps {
  orders: IOrderProps[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="mt-4">
      {orders.map((order) => (
        <OrderDetails
          key={order.orderId}
          orderId={order.orderId}
          date={order.date}
          products={order.products}
          status={order.status}
          totalPrice={order.totalPrice}
        />
      ))}
    </div>
  );
};

export default OrderList;
