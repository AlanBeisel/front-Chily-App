'use client'
import React, {useEffect, useState} from 'react';
import CategoryForm from './categoryForm';
import { updateCategory } from '@/helpers/peticionesSuperAdmin';
import { getCategoryById } from '@/helpers/peticionesSuperAdmin';
import { Category } from '@/types';
import ConfirmModal from '../SuperAdminProducts/confirmModal';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'react-toastify';


interface CategoryEditProps {
  categoryId: string;
}

const CategoryEdit: React.FC<CategoryEditProps> = ({categoryId}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const {accessToken} = useAuth();


  useEffect(() => {
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    const fetchCategory = async () =>{
      try{
          setLoading(true)
          const categoryData = await getCategoryById(categoryId, accessToken);
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
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    try {
      setLoading(true);
      setModalOpen(true);

      const updateData = {
        name: data.name,
        icon: data.icon,
      };

      await updateCategory(categoryId, updateData, accessToken);
    //  router.push('/dashboard');
    } catch (error) {
      console.error('Error al actualizar la categoría', error);
      setError('No se pudo actualizar la categoría. Por favor, inténtalo nuevamente.');
      toast.error('No se pudo actualizar la categoría. Por Favor, inténtelo nuevamente.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }finally {
      setLoading(false);
    }
  };

  const confirmUpdate = async () => {
    if(!accessToken) {
      console.error('No se encontró el token de autenticación.');
      return;
    }
    try{
      await updateCategory(categoryId, category!, accessToken);
      setError(null);
      setModalOpen(false);
      const updatedCategory = await getCategoryById(categoryId, accessToken);
      setCategory(updatedCategory);
      toast.success('¡Categoría actualizada correctamente!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al actualizar la categoría.', error);
      setError('No se pudo actualizar la categoría. Por favor, inténtalo nuevamente.');
      toast.error('Error al actualizar la categoría. Por favor, inténtalo nuevamente.', {
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