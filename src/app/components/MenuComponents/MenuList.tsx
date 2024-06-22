import React from 'react';
import { MenuItem } from './MenuItems';

const menuItems = [
  { name: 'Beef Burger', price: 20, image: '/images/beef-burger.jpg' },
  { name: 'Pizza-Tikka', price: 30, image: '/images/pizza-tikka.jpg' },
];

export const MenuList = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {menuItems.map((item) => (
        <MenuItem key={item.name} {...item} />
      ))}
    </div>
  );
};
