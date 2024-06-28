import React from "react";

interface ProductCardProps {
    image: string,
    name: string,
    price: number,
}
export const ProductCard: React.FC<ProductCardProps>=({image, name, price}) => {
  return (
    <div className="w-60 h-72 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-40">
      <img src={image} alt={name} className="w-full h-auto rounded-lg mb-2.5 object-cover"/>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <p className="text-center text-gray-500">${price}</p>
      </div>
      <div className="absolute top-0 right-0 p-2 bg-green-500 rounded-bl-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      </div>
    </div>
  );
};