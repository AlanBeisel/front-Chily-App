'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById, updateUser } from "@/helpers/peticionesSuperAdmin";
import { useAuth } from "@/app/contexts/AuthContext";
import { User as UserType } from "@/types";
import ConfirmModal from "../SuperAdminProducts/confirmModal";
import { toast } from "react-toastify";


interface User extends UserType {
  role: 'user' | 'admin' | 'superadmin'; 
}

interface UserEditProps {
  userId: number;
}

const EditUser: React.FC<UserEditProps>= ({userId}) => {
  const router = useRouter();
  const { accessToken } = useAuth();


  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (!accessToken) {
          throw new Error('No se encontró el token de autenticación.');
        }
        const response = await getUserById(userId, accessToken);
        console.log('Response from getUserById:', response);
        if (response.data) {
          setUser(response.data);
        } else {
          console.error('No se encontró el usuario.');
        }
      } catch (error) {
        console.error('Error al obtener el usuario', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId, accessToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async () => {
  if (!accessToken || !user.id) {
    return; 
  }

  const updateData = { role: user.role };

  try {
    const response = await updateUser(userId, updateData, accessToken);
    console.log('Response from updateUser:', response);
    toast.success('Usuario actualizado exitosamente', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push("/superadmin/users"); 
  } catch (error) {
    console.error('Error al actualizar el usuario', error);
    toast.error('Error al actualizar el usuario', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const openModal = () => {
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

  if (loading) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="container mx-auto px-4 w-full">
      <h2 className="text-2xl font-bold text-red-500 my-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="role">
            Rol
          </label>
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-red-500 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
            <option value="superadmin">Super Administrador</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={openModal}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
   
          <ConfirmModal
          isOpen={modalOpen}
          onConfirm={handleSubmit}
          onCancel={closeModal}
          title="Confirmar edición"
          message="¿Estás seguro de que quieres editar este usuario? Esta acción no se puede deshacer."
          />
           </div>
  );
};

export default EditUser;
