'use client'
import React, { useEffect, useState } from "react";
import { deleteUser, fecthUsers } from "@/helpers/peticionesSuperAdmin";
import ConfirmModal from "../SuperAdminProducts/confirmModal";
import { HiOutlineTrash } from "react-icons/hi";
import { useAuth } from "@/app/contexts/AuthContext";
import BackButton from "../ProductIdComponents/BackButton";
import {User} from "@/types";

const PAGE_SIZE = 10;

const UsersList: React.FC = ()=> {
  const[user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {accessToken} = useAuth();

  useEffect(() =>{
    fetchData();
  },[currentPage]);

    const fetchData = async () => {
      try{
      setLoading(true);
      const userData = await fecthUsers(currentPage,PAGE_SIZE)
      setUser(userData);
      setTotalPages(Math.ceil(userData.length / PAGE_SIZE));
    } catch (error) {
      console.error('Error al obtener los usuarios', error);
    } finally {
      setLoading(false);
    }
    };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (id: string) => {
    setUserToDelete(id);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setUserToDelete(null);
  };

  const confirmDelete = async () => {
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    if(!userToDelete) return;

    try{
      await deleteUser(userToDelete, accessToken);
      setUser(user.filter((user) => user.id !== userToDelete));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };



  if(loading) return <div>Cargando...</div>;
  if(user.length === 0) return <div>No hay usuarios disponibles.</div>
  
  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <BackButton className="mr-4"/>
        <h2 className="text-2xl font-bold text-red-500">Usuarios</h2>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Nombre</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Mail</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index)=>(
            <tr key= {user.id}>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{user.name}</td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{user.email}</td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>
                <button
                onClick={() => openDeleteModal(user.id)}
                className="text-red-500 px-2 py-1 rounded mr-2"
                >
                  <HiOutlineTrash className="text-4xl"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center items-center">
        <button
         onClick={() => handlePageChange(currentPage - 1)}
         disabled= {currentPage === 1}
         className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
         >
          Anterior
         </button>
         <button
         onClick={() => handlePageChange(currentPage + 1)}
         disabled= {currentPage === totalPages}
         className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
         >
          Siguiente
         </button>
      </div>
      <ConfirmModal
       isOpen={modalOpen}
       onConfirm={confirmDelete}
       onCancel={closeModal}
       title="Confirmar eliminación"
       message="¿Estás seguro de que quieres eliminar esta categoria? Esta acción no se puede deshacer."
       />
    </div>

  );
};

export default UsersList;