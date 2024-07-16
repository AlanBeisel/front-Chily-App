'use client';
import React, { useState } from 'react';
import ProductForm from './productForm';
import { createProduct } from '@/helpers/peticionesSuperAdmin';
import BackButton from '../ProductIdComponents/BackButton';
import { toast } from 'react-toastify';
import ConfirmModal from './confirmModal';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter } from 'next/navigation'; 

interface ProductData {
  name: string;
  description: string;
  price: string;
  imageURL: string;
  category: string[];
}

const ProductCreate: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    description: '',
    category: [],
    price: '',
    imageURL: '',
  });
  const {accessToken} = useAuth();
  const token = accessToken;
  const [modalAction, setModalAction] = useState<() => void>(() => {});

const handleCreate = async (data: ProductData, imageURL?: string) => {
  try {
    if (!token) {
      throw new Error('Token no disponible');
    }
    const formattedData = {
      ...data,
      imageURL: imageURL || '',
      price: parseFloat(data.price),
      category: data.category.map((cat: string) => parseInt(cat, 10)),
    };

    setModalAction(() => async () => {
      const response = await createProduct(formattedData, token);
      console.log(response);

      if (response.success) {
        setError(null);
        setFormData({
          name: '',
          description: '',
          category: [],
          price: '',
          imageURL: '',
        });
        toast.success('Producto creado exitosamente', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push('/superadmin/products');
      } else {
        setError(response.data || 'Error al crear el producto');
        toast.error(response.data || 'Error al crear el producto', {
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
    if (error instanceof Error) {
      setError(error.message);
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setError('Error al crear el producto. Inténtalo de nuevo más tarde.');
      toast.error('Error al crear el producto. Inténtalo de nuevo más tarde.', {
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

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl p-4">
        <div className="flex items-center justify-start  mb-4">
          <BackButton />
        </div>
        {error && <div className="text-red-500 mb-4"> {error}</div>}
        <ProductForm onSubmit={handleCreate} defaultValues={formData} />
        <ConfirmModal
          isOpen={isModalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title="Confirmar creación de producto"
          message="¿Estás seguro de que deseas crear este producto?"
        />
      </div>
    </div>
  );
};

export default ProductCreate;
