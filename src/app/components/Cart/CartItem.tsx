import React from 'react';
import { CartItemProps } from '@/types';
import Image from 'next/image';

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  img,
  onUpdateQuantity,
  onRemove,
}) => {

  return (
    <li className="flex items-center justify-between py-2">
      <Image
        src={img}
        alt={name}
        width={500}
        height={500}
        className="w-16 h-16 rounded"
      />
      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span>${price.toFixed(2)}</span>
        <div className="flex items-center mt-2">
          <button
            onClick={() => onUpdateQuantity(id, -1)}
            className="bg-gray-200 px-2 rounded"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(id, 1)}
            className="bg-gray-200 px-2 rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Remove
      </button>
    </li>
  );
};

export default CartItem;
