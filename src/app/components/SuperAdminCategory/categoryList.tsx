'use client'
import React, { useEffect, useState } from "react";
import { deleteCategory } from "@/helpers/peticionesSuperAdmin";
import { getAllCategories } from "@/helpers/peticiones";
import ConfirmModal from "../SuperAdminProducts/confirmModal";
import { Category } from "@/types";
import Link from "next/link";

const PAGE_SIZE = 10;

const CategoryList: React.FC = ()=> {
  const[category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    if(!categoryToDelete) return;

    try{
      await deleteCategory(categoryToDelete);
      setCategory(category.filter((category) => category.id !== categoryToDelete));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar la categoria', error);
    }
  };



  if(loading) return <div>Cargando...</div>;
  if(category.length === 0) return <div>No hay Categorias disponibles.</div>
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-500">Todas las categorias</h2>
        <Link href="/superadmin/categories/create">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
      Crear categoria
      </button>
      </Link>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {category.map((category)=>(
            <tr key= {category.id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                <img src={category.icon} alt={category.name} className="h-12 w-12 object-cover rounded-full"/>
                </td>
              <td className="border px-4 py-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                <Link href={`/superadmin/categories/edit/${category.id.toString()}`}>
                Editar
                </Link>
                </button>
                <button
                onClick={() => openDeleteModal(category.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
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