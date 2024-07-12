'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface AdminAccountFormProps {
  onSuccess?: () => void;
}

interface AdminFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  nin: string; // Keep it as string initially
  phone: string;
}

const AdminAccountForm: React.FC<AdminAccountFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    nin: '', // Initialize as string
    phone: '',
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const { accessToken } = useAuth();
  const token = accessToken;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, un número y una letra mayúscula.',
      );
      return;
    }

    // Create a new object excluding 'nin' and including 'NIN'
    const { nin, ...restFormData } = formData;
    const formDataToSend = {
      ...restFormData,
      NIN: nin.toUpperCase(), // Ensure it's sent as a string in uppercase
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataToSend),
        },
      );

      if (!response.ok) {
        throw new Error('Error al crear el administrador');
      }

      toast.success('Cuenta creada exitosamente');

      console.log('Administrador creado exitosamente');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        nin: '', // Reset to string
        phone: '',
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error al crear el administrador:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Nombre del administrador"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email del administrador"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
          title="Debe contener al menos 8 caracteres, un número y una letra mayúscula"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirmar Contraseña
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Confirmar Contraseña"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          minLength={8}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="nin"
        >
          NIN
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nin"
          type="text"
          placeholder="Número de Documento"
          name="nin"
          value={formData.nin}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="phone"
        >
          Teléfono ej: +57 343 12345678
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="tel"
          placeholder="+57 343 12345678"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      {passwordError && <p className="text-red-500">{passwordError}</p>}
      <div className="flex items-center justify-between">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Crear Cuenta
        </button>
      </div>
    </form>
  );
};

export default AdminAccountForm;
