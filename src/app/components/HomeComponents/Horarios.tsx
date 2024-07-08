"use client"
import { useState } from 'react';

const Horarios = () => {
  const [showDeliveryHours, setShowDeliveryHours] = useState(false);

  const toggleDeliveryHours = () => {
    setShowDeliveryHours(!showDeliveryHours);
  };

  return (
   <div className="bg-red-500 rounded-lg p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDeliveryHours}
      >
        <h2 className="text-white text-xl font-bold">Horarios de delivery:</h2>
        <span className="text-white">
          {showDeliveryHours ? '▲' : '▼'}
        </span>
      </div>
      {showDeliveryHours && (
        <div className="text-white mt-2">
          <p>Lunes a Viernes: 11:00 AM - 15:00 PM /  20:00 PM - 00:00 AM </p>
          <p>Sábados y Domingos: 11:00 PM - 15:00 PM</p>
        </div>
      )}
    </div>
  );
};

export default Horarios;
