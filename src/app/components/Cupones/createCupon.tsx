"use client"
import { useAuth } from '@/app/contexts/AuthContext';
import React, { useState } from 'react';

const CrearCupon = () => {
  const [porcentaje, setPorcentaje] = useState('');
  const [mensaje, setMensaje] = useState('');
  const {accessToken} = useAuth();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!porcentaje || isNaN(Number(porcentaje))) {
    setMensaje('Por favor, ingrese un número válido.');
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/discount/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ discount: Number(porcentaje) }),
      },
    );

    if (response.ok) {
      setMensaje('Cupón creado exitosamente.');
      setPorcentaje('');
    } else {
      setMensaje('Error al crear el cupón. Intente nuevamente.');
    }
  } catch (error) {
    setMensaje('Error de conexión. Por favor, intente más tarde.');
  }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Cupón de Descuento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="porcentaje"
            className="block text-sm font-medium text-gray-700"
          >
            Porcentaje de descuento
          </label>
          <input
            type="number"
            id="porcentaje"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Ingrese el porcentaje"
            min="1"
            max="100"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Crear Cupón
        </button>
      </form>
      {mensaje && (
        <p
          className={`mt-4 text-sm ${mensaje.includes('error') ? 'text-red-600' : 'text-green-600'}`}
        >
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default CrearCupon;
