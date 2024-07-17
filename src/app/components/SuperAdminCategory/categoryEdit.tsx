'use client'
import React, {useEffect, useState} from 'react';
import CategoryForm from './categoryForm';
import { updateCategory } from '@/helpers/peticionesSuperAdmin';
import { getCategoryById } from '@/helpers/peticionesSuperAdmin';
import { Category } from '@/types';
import ConfirmModal from '../SuperAdminProducts/confirmModal';
import BackButton from '../ProductIdComponents/BackButton';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'react-toastify';
import  {useRouter} from 'next/navigation';



interface CategoryEditProps {
  categoryId: string;
}

const CategoryEdit: React.FC<CategoryEditProps> = ({categoryId}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updateData, setUpdateData] = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
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
  }, [categoryId, accessToken]);

  const handleUpdate= (data: Category) => {
      setUpdateData(data);
      setModalOpen(true);
  };

  const confirmUpdate = async () => {
    if(!accessToken || !updateData) {
      console.error('No se encontró el token de autenticación o los datos de actualizacion.');
      return;
    }

    try{
      setLoading(true);
      const updatePayload = {
        name: updateData.name,
        icon: updateData.icon,
      };
      await updateCategory(categoryId, updatePayload, accessToken);
      setError(null);
      setModalOpen(false);
      router.push('/superadmin/categories');
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
    } finally{
      setLoading(false);
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
    <div className="container mx-auto px-4 w-full">
    <div className="flex items-center justify-start  mb-4">
      <BackButton />
    </div>
      <h2 className="text-2xl font-bold mb-4 text-red-500">Editar categoría</h2>
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