'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import React, { useState, useEffect } from 'react';

interface Usuario {
  id: string;
  name: string;
}

interface AsignarCuponProps {
  cuponId: string;
  onClose: () => void;
  onAsignado: () => void;
}

const AsignarCupon: React.FC<AsignarCuponProps> = ({
  cuponId,
  onClose,
  onAsignado,
}) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [filter, setFilter] = useState('');
  const {accessToken} = useAuth()

  const fetchUsuarios = async () => {
    setLoading(true);
    setError('');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user?page=1&limit=100`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsuarios(data.data);
      setLoading(false);
    } catch (error) {
      setError(
        'No se pudieron cargar los usuarios. Por favor, intente más tarde.',
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const asignarCuponAUsuario = async () => {
    if (!usuarioSeleccionado) {
      setError('Por favor, seleccione un usuario');
      return;
    }

    const queryParams = new URLSearchParams({
      discount: cuponId,
      userId: usuarioSeleccionado,
    }).toString();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discount/setdiscount?${queryParams}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error al asignar el cupón');
      }

      onClose();
      onAsignado();
    } catch (error) {
      setError('No se pudo asignar el cupón. Por favor, intente nuevamente.');
    }
  };

  const filteredUsuarios = filter
    ? usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : usuarios;

  if (loading) {
    return <div className="text-center">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Asignar Cupón a Usuario</h2>
        <div className="mb-4 relative">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700"
          >
            Buscar y Seleccionar Usuario
          </label>
          <input
            type="text"
            id="filter"
            placeholder="Buscar Usuario"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
          />
          <select
            id="usuario"
            value={usuarioSeleccionado}
            onChange={(e) => setUsuarioSeleccionado(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
            size={5}
          >
            <option value="">Seleccione un usuario</option>
            {filteredUsuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={asignarCuponAUsuario}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mb-2"
        >
          Asignar Cupón
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
        >
          Cancelar
        </button>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default AsignarCupon;
