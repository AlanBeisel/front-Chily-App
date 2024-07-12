'use client'
import React, {useEffect, useState} from 'react';
import CategoryForm from './categoryForm';
import { updateCategory } from '@/helpers/peticionesSuperAdmin';
import { getCategoryById } from '@/helpers/peticionesSuperAdmin';
import { Category } from '@/types';
import ConfirmModal from '../SuperAdminProducts/confirmModal';

interface CategoryEditProps {
  categoryId: string;
}

const CategoryEdit: React.FC<CategoryEditProps> = ({categoryId}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchCategory = async () =>{
      try{
          setLoading(true)
          const categoryData = await getCategoryById(categoryId);
          console.log('Datos del producto cargado:', categoryData);
          setCategory(categoryData);
      }catch (error) {
        console.error('Error al obtener la categoría', error);
        setError('No se pudo obtener la categoría. Por favor, inténtalo nuevamente.');
      }finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleUpdate = async (data: Category) => {
    try {
      setLoading(true);
      setModalOpen(true);
      await updateCategory(categoryId, data);
    //  router.push('/dashboard');
    } catch (error) {
      console.error('Error al actualizar la categoría', error);
      setError('No se pudo actualizar la categoría. Por favor, inténtalo nuevamente.');
    }finally {
      setLoading(false);
    }
  };

  const confirmUpdate = async () => {
    try{
      await updateCategory(categoryId, category!);
      setError(null);
      setModalOpen(false);
      const updatedCategory = await getCategoryById(categoryId);
      setCategory(updatedCategory);
    } catch (error) {
      console.error('Error al actualizar la categoría.', error);
      setError('No se pudo actualizar la categoría. Por favor, inténtalo nuevamente.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <p> Cargando...</p>;
  }

  if(error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-red-500">Categoría ID:{categoryId}</h2>
      {category && (
      <>
      <div className="flex items-center">
      </div>
      <CategoryForm defaultValues={{...category, icon: category.icon}} onSubmit={handleUpdate} isEditMode/>
      <ConfirmModal
       isOpen={modalOpen}
       onConfirm={confirmUpdate}
       onCancel={closeModal}
       title="Confirmar actualización"
       message="¿Estás seguro de que quieres actualizar esta categoría?"
       />
      </>
     )}
    </div>
  );
};

export default CategoryEdit;