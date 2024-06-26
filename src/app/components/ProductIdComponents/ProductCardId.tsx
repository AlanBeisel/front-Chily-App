'use client'
import Image from 'next/image';
import Rating from './Raiting';
import PriceTag from './PriceTag';
import AddItem from './AddItem';
import CartButtons from './CartButtons';
import {useState} from 'react';


export default function ProductIDCard () {
const [quantity, setQuantity]= useState(2);

const handleIncrease = () => {
    setQuantity (quantity + 1);
};

const handleDecrease = () => {
    if (quantity>1) setQuantity(quantity -1);
};

return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-5">
        <Image
         src="/burger.jpg"
         alt= "beef burger"
         width= {300}
         height={200}
         className="w-full h-auto rounded-md mb-4"
         />
         <div className="flex justify-between items-center mb-4">
          <Rating value={4.8}/>
          <PriceTag price={20} />
         </div>
         <h2 className="text-2xl font-bold mb-2">Beef Burger</h2>
         <p className="text-gray-600 text-sm mb-4">Big Juicy Beef Burger with cheese, lettuce,tomato, onions and special sauce!</p>
         <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Ons</h3>
            <div className="flex space-x-4">
            <AddItem src="/cheese.png" label= "cheese" price={9}/>
            <AddItem src="/sauce.png" label= "sauce" price={9}/>
            <AddItem src="/pepperoni.png" label= "pepperoni" price={9}/>
            </div>
         </div>
         <CartButtons
           quantity={quantity}
           onIncrease={handleIncrease}
           onDecrease={handleDecrease}
          />
    </div>
);
}