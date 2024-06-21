import React from 'react';
import Image from 'next/image';

interface MenuItemProps {
  name: string;
  price: number;
  image: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ name, price, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="w-full h-40 object-cover rounded-lg mb-2"
      />
      <h3 className="font-bold text-lg">{name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-red-500 font-bold">${price}</span>
        <button className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
          +
        </button>
      </div>
    </div>
  );
};
