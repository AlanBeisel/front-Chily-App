'use client'
import React, { useEffect, useState } from "react";
import { deleteCategory } from "@/helpers/peticionesSuperAdmin";
import { getAllCategories } from "@/helpers/peticiones";
import ConfirmModal from "../SuperAdminProducts/confirmModal";
import { Category } from "@/types";
import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";
import BackButton from "../ProductIdComponents/BackButton";

const PAGE_SIZE = 10;

const CategoryList: React.FC = ()=> {
  const[category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {accessToken} = useAuth();

  useEffect(() =>{
    fetchData();
  },[currentPage]);

    const fetchData = async () => {
      try{
      setLoading(true);
      const startIndex = (currentPage -1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const categoriesData = await getAllCategories();
      const slicedCategories = categoriesData.slice(startIndex, endIndex);
      setCategory(slicedCategories);
      setTotalPages(Math.ceil(categoriesData.length / PAGE_SIZE));
    } catch (error) {
      console.error('Error al obtener las categorias', error);
    } finally {
      setLoading(false);
    }
    };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (id: string) => {
    setCategoryToDelete(id);
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setCategoryToDelete(null);
  };

  const confirmDelete = async () => {
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    if(!categoryToDelete) return;

    try{
      await deleteCategory(categoryToDelete, accessToken);
      setCategory(category.filter((category) => category.id.toString() !== categoryToDelete));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar la categoria', error);
    }
  };



  if(loading) return <div>Cargando...</div>;
  if(category.length === 0) return <div>No hay Categorias disponibles.</div>
  
  return (
    <div className="container mx-auto px-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <BackButton className="mr-4"/>
        <h2 className="text-2xl font-bold text-red-500">Categorías</h2>
        <Link href="/superadmin/categories/create">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
      Crear categoria
      </button>
      </Link>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Nombre</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Imagen</th>
            <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category, index)=>(
            <tr key= {category.id}>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{category.name}</td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>
                <img src={category.icon} alt={category.name} className="h-12 w-12 object-cover rounded-full"/>
                </td>
              <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>
              <button className="bg-white text-green-500 px-2 py-1 rounded mr-2">
                <Link href={`/superadmin/categories/edit/${category.id.toString()}`}>
                <FiEdit className="text-4xl"/>
                </Link>
                </button>
                <button
                onClick={() => openDeleteModal(category.id.toString())}
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

export default CategoryList;