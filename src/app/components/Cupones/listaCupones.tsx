"use client"
import React, { useState, useEffect } from 'react';
import AsignarCupon from './asignarCupon';
import { User } from '@/types';
import { useAuth } from '@/app/contexts/AuthContext';

interface Cupon {
  id: string;
  code: string;
  discount: number;
  user: User | null;
}

const ListaCupones = () => {
  const [cupones, setCupones] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cuponSeleccionado, setCuponSeleccionado] = useState<string | null>(
    null,
  );
  const {accessToken} = useAuth();

  const fetchCupones = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discount`,
      );
      if (!response.ok) {
        throw new Error('Error al obtener los cupones');
      }
      const data = await response.json();
      setCupones(data);
      setLoading(false);
    } catch (error) {
      setError(
        'No se pudieron cargar los cupones. Por favor, intente más tarde.',
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCupones();
  }, []);

  const handleAsignarCupon = (cuponId: string) => {
    setCuponSeleccionado(cuponId);
  };

  const eliminarCupon = async (cuponId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discount/delete/${cuponId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Error al eliminar el cupón');
      }
      fetchCupones();
    } catch (error) {
      setError('No se pudo eliminar el cupón. Por favor, intente nuevamente.');
    }
  };

  if (loading) {
    return <div className="text-center">Cargando cupones...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="container flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Cupones de Descuento</h2>
        <button
          onClick={fetchCupones}
          className="mb-4 px-4 py-2 text-blue-600 rounded"
        >
          Actualizar
        </button>
      </div>
      {cupones.length === 0 ? (
        <p className="text-gray-500">No hay cupones disponibles.</p>
      ) : (
        <div className="grid gap-4">
          {cupones.map((cupon) => (
            <div
              key={cupon.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <span>
                  Código: {cupon.code} -- {cupon.discount}% de descuento
                </span>
                {cupon.user && (
                  <p className="text-gray-700">
                    Asignado a: {cupon.user.name} ({cupon.user.email})
                  </p>
                )}
              </div>
              <div>
                <button
                  className={`px-4 py-2 rounded ${
                    cupon.user
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  onClick={() => handleAsignarCupon(cupon.id)}
                >
                  {cupon.user ? 'Reasignar Cupón' : 'Asignar a Usuario'}
                </button>
                <button
                  className="ml-2 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
                  onClick={() => eliminarCupon(cupon.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {cuponSeleccionado && (
        <AsignarCupon
          cuponId={cuponSeleccionado}
          onClose={() => setCuponSeleccionado(null)}
          onAsignado={fetchCupones}
        />
      )}
    </div>
  );
};

export default ListaCupones;
