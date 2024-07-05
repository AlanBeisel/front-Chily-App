'use client'
import React, {useState} from 'react';
import ProductForm from './productForm';
import { createProduct } from '@/helpers/peticionesSuperAdmin';
import BackButton from '../ProductIdComponents/BackButton';
import ConfirmModal from './confirmModal';
//import { useRouter } from 'next/router';


interface ProductData {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string[];

}

const ProductCreate: React.FC = () => {
 // const router = useRouter();
 const [error, setError] = useState<string | null>(null);
 const [modalOpen, setModalOpen] = useState(false);
 const [formData, setFormData] = useState<ProductData>({
  name: '',
  description: '',
  category: [],
  price: '',
  image: '',
 });

  const handleCreate = async (data: ProductData) => {
    try{
      console.log(data)
      setFormData(data)
      setModalOpen(true);
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      }else {
        setError('Error al crear el producto. Inténtalo de nuevo más tarde.');
      }
    }
  };

  const confirmCreate = async () => {
    try{
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        category: formData.category.map(cat => parseInt(cat, 10)),
      };
      const response: Response = await createProduct(formattedData);
      const responseData = await response.json();
      if(responseData.success){
         setError(null);
         setModalOpen(false);
      } else {
        setError(responseData.error)
      }   
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al crear el producto. Inténtalo de nuevo más tarde.');
      }
    }

  };

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-4">
        <div className="flex items-center justify-start  mb-4">
          <BackButton />
      <h2 className="text-2xl text-red-500 font-bold mb-4">Crear Producto</h2>
      </div>
      {error && <div className="text-red-500 mb-4"> {error}</div>}
      <ProductForm onSubmit={handleCreate} defaultValues={formData} />
      <ConfirmModal
       isOpen={modalOpen}
       onConfirm={confirmCreate}
       onCancel={closeModal}
       title="Confirmar creación"
       message="¿Estás seguro de que quieres crear este producto?"
       />
    </div>
    </div>
  );
};

export default ProductCreate;
