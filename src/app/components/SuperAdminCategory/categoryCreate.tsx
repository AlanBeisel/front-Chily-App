'use client'
import React, {useState} from 'react';
import CategoryForm from './categoryForm';
import { createCategory } from '@/helpers/peticionesSuperAdmin';
import BackButton from '../ProductIdComponents/BackButton';
import { toast } from 'react-toastify';
import ConfirmModal from '../SuperAdminProducts/confirmModal';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation';


interface CategoryData {
  name: string;
  icon: string;

}

const CategoryCreate: React.FC = () => {
 const router = useRouter();
 const [error, setError] = useState<string | null>(null);
 const [isModalOpen, setModalOpen] = useState(false);
 const [formData, setFormData] = useState<CategoryData>({
  name: '',
  icon: '',
 });


 const [modalAction, setModalAction] = useState<()=> void>(()=>{});
 const {accessToken} = useAuth();


  const handleCreate = async (data: CategoryData, icon?: string) => {
    try{

      const formattedData ={
        ...data,
        icon: icon || '',
      };

      setModalAction(() => async()=>{
        if(!accessToken) {
          setError('No se encontró el token de autentocación.');
          return;
        }
        const response = await createCategory(formattedData, accessToken);


      if(response.success){
        setError(null);
        setFormData({
          name: '',
          icon: '',
         });
      toast.success('Categoría creada exitosamente',{
         position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      router.push('/superadmin/categories')
      } else {
        setError('Error al crear la categoría');
        toast.error('Error al crear la categoría',{
         position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      }
    });
    setModalOpen(true);
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al crear la categoría. Inténtalo de nuevo más tarde.');
        toast.error('Error al crear la categoría. Inténtalo de nuevo más tarde.', {
          position: 'top-center',
       autoClose: 3000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       });
      }
    }
  };

  const handleConfirm = () => {
    setModalOpen(false);
    modalAction();
  };

  const handleCancel = ()=>{
    setModalOpen(false);
  };


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-4">
        <div className="flex items-center justify-start  mb-4">
          <BackButton />
      </div>
      {error && <div className="text-red-500 mb-4"> {error}</div>}
      <CategoryForm onSubmit={handleCreate} defaultValues={formData} />
      <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title="Confirmar creación de categoría"
          message="¿Estás seguro de que deseas crear esta categoría?"
        />
    </div>
    </div>
  );
};

export default CategoryCreate;