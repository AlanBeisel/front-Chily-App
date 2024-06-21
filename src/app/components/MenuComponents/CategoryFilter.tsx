import React from 'react';
import Image from 'next/image';

const categories = [
    { name: 'All', icon: '/icons/all.png' },
    { name: 'Pizza', icon: '/icons/pizza.png' },
    { name: 'Burger', icon: '/icons/burger.png' },
    { name: 'Dessert', icon: '/icons/dessert.png' },
    { name: 'Ice cream', icon: '/icons/ice-cream.png' },
];

export const CategoryFilter = () => {
    return (
    <div className="flex justify-between mb-4">
        {categories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
            <Image src={category.icon} alt={category.name} width={40} height={40} className="mb-1" />
            <span className="text-xs">{category.name}</span>
        </div>
        ))}
    </div>
    );
};