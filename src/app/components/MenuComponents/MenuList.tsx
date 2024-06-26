import React from 'react';
import { MenuItem } from './MenuItems';

const menuItems = [
  {
    name: 'Papas',
    description:
      'https://img.freepik.com/foto-gratis/papa-fresca-frita-salsa_144627-5503.jpg?t=st=1719237878~exp=1719241478~hmac=b9eb47db35f4f25a8bf3b16eb223a6e0301b98f54bd3eea8f63e44196e9cb7ff&w=996',
    price: 13500,
    img: 'https://example.com/yordle_snack.jpg',
    available: true,
    category: 'Snacks',
  },
  {
    name: 'Demacian Bread',
    description: 'El pan más delicioso de Demacia',
    price: 12000,
    img: 'https://img.freepik.com/foto-gratis/emparedado_1203-2860.jpg?t=st=1719237857~exp=1719241457~hmac=7be5d2560ea3c7f913486ea78a69915db570c3278004f30991501f761dffeedc&w=996',
    available: true,
    category: 'Bakery',
  },
  {
    name: 'Piltover Pie',
    description: 'La tarta más exquisita de Piltover',
    price: 15000,
    img: 'https://img.freepik.com/foto-gratis/vista-superior-delicioso-pastel-manzana-rodajas-dentro-placa-limon-escritorio-blanco-pastel-pastel-azucar-dulce-hornear-galletas_140725-40082.jpg?t=st=1719237901~exp=1719241501~hmac=3f0dcfdc1f378015f02d9b736a24b484486861589b53458b59d13bfb9677532a&w=996',
    available: true,
    category: 'Bakery',
  },
  {
    name: 'Noxian Stew',
    description: 'El estofado más robusto de Noxus',
    price: 20000,
    img: 'https://img.freepik.com/foto-gratis/ragout-estofado-lentejas-calabaza-zanahoria-tazon-sobre-mesa-madera_123827-20934.jpg?t=st=1719237926~exp=1719241526~hmac=749e5ba5486562645b459f97c63f2c9551a76177e2989a765658370287f0c653&w=740',
    available: true,
    category: 'Meals',
  },
  {
    name: 'Ionia Tea',
    description: 'El té más relajante de Ionia',
    price: 10000,
    img: 'https://img.freepik.com/foto-gratis/vista-superior-taza-te-flores-secas-superficie-blanca-bebida-sabor-flor-te_140725-85765.jpg?t=st=1719237345~exp=1719240945~hmac=692256809281bcf5a598a631d5eae8c8147bef5b8ffeb2cb7150e4ecd21b88d7&w=740',
    available: true,
    category: 'Beverages',
  },
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
