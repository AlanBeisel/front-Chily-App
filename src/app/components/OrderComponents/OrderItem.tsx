import React from 'react';

export interface IProductOrder{
  name: string;
  quantity: number;
}

export interface IOrderProps{
  orderId: string;
  date: string;
  products: IProductOrder [];
  totalPrice: number;
  status: string,
}



const OrderDetails: React.FC<IOrderProps> = ({orderId, date, products, status, totalPrice}) => {
  return(
    <div className="bg-red-500 text-white rounded-lg p-4 mb-4 flex flex-col items-center">
      <div className="text-sm">{orderId}</div>
      <div className="text-sm">{date}</div>
      <div className="text-lg">
        {products.map((product,index) => (
        <div key={index} className="mb-2">
       <span> Product: {product.name}</span>, <span>Quantity: {product.quantity}</span>
      </div>
      ))}
      </div>
      
      <div className="text-sm">{status}</div>
      <div className="text-lg text-yellow-300">${totalPrice}</div>
    </div>
  );
};

export default OrderDetails;