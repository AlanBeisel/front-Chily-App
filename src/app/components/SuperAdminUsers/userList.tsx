'use client'
import React, { useEffect, useState } from "react";
import { deleteUser, fecthUsers } from "@/helpers/peticionesSuperAdmin";
import ConfirmModal from "../SuperAdminProducts/confirmModal";
import { HiOutlineTrash } from "react-icons/hi";
import { useAuth } from "@/app/contexts/AuthContext";
import BackButton from "../ProductIdComponents/BackButton";
import {User} from "@/types";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";

const PAGE_SIZE = 10;

const UsersList: React.FC = ()=> {
  const[users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('')
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
      if(!accessToken) {
        throw new Error('No se encontró el token de autenticación.');
      }
      const response = await fecthUsers(currentPage,PAGE_SIZE, accessToken);
      if(response.data && Array.isArray(response.data.data)) {
      setUsers(response.data.data);
      setTotalPages(response.data.totalPages);
      } else {
        setUsers([]);
        setTotalPages(1);
      }
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
      setUsers(users.filter(user => user.id !== userToDelete));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );



  
  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <BackButton className="mr-4"/>
        <h2 className="text-2xl font-bold text-red-500 mx-auto">Usuarios</h2>
        </div>
      <div className="flex items-center mb-4 relative">
      <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar usuarios..."
      className="border-gray-300 rounded-full border p-2  pl-10 focus:border-red-500 w-full"
      />
      <AiOutlineSearch className="absolute left-3 top-3 text-gray-400"/>
      </div>
      {filteredUsers.length === 0 && !loading &&(
        <div className="text-center text-gray-500 my-4"> No hay usuarios que coincidan con la búsqueda. </div>
      )}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Nombre</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Email</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="text-center py-4"> Cargando usuarios...</td>
            </tr>
          ): users.length > 0 ? (
          filteredUsers.map((user, index)=>(
            <tr key= {user.id}>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{user.name}</td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{user.email}</td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>
              <button className="bg-white text-green-500 px-2 py-1 rounded mr-2">
                  <Link
                    href={`/superadmin/users/edit/${user.id}`}
                  >
                   <FiEdit className="text-4xl"/>
                  </Link>
                </button>
                <button
                onClick={() => openDeleteModal(user.id)}
                className="text-red-500 px-2 py-1 rounded mr-2"
                >
                  <HiOutlineTrash className="text-4xl"/>
                </button>
              </td>
            </tr>
          ))
        ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">No hay usuarios disponibles.</td>
            </tr>
            )}
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
       message="¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer."
       />
    </div>

  );
};

export default UsersList;

