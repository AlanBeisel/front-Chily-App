'use client'
import React, {useEffect, useState} from 'react';
import ProductForm from './productForm';
import { getProductById } from '@/helpers/peticiones';
import { updateProduct } from '@/helpers/peticionesSuperAdmin';
import { Product } from '@/types';
import ConfirmModal from './confirmModal';
import PopularProductSwitch from './popularSwitch';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/contexts/AuthContext';
import BackButton from '../ProductIdComponents/BackButton';



interface ProductEditProps {
  productId: string;
}

const ProductEdit: React.FC<ProductEditProps> = ({productId}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const {accessToken} = useAuth();
  const token = accessToken;


  useEffect(() => {
    const fetchProduct = async () =>{
      try{
          setLoading(true)
          const productData = await getProductById(productId);
          console.log('Datos del producto cargado:', productData);
          setProduct(productData);
      }catch (error) {
        console.error('Error al obtener el producto', error);
        setError('No se pudo obtener el producto. Por favor, inténtalo nuevamente.');
      }finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);



const handleUpdate = async (data: Partial<Product>) => {
  if (!token) {
    console.error('Token no disponible');
    toast.error('Token no disponible', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

    const updateData: any = {};

    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.img !== undefined) updateData.img = data.img
    if (data.name !== undefined) updateData.name = data.name;
    if (data.category !== undefined) updateData.category = data.category;

  try {
    setLoading(true);
    setModalOpen(true);
    console.log('Actualizando popularidad del producto:', productId);
    await updateProduct(productId, updateData, token);
    toast.success('Producto actualizado correctamente', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
     // router.push('/dashboard');
  } catch (error) {
    console.error('Error al actualizar el producto', error);
    setError(
      'No se pudo actualizar el producto. Por favor, inténtalo nuevamente.',
    );
    toast.error(
      'Error al actualizar el producto. Por favor inténtalo nuevamente.',
      {
      position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
  } finally {
    setLoading(false);
  }
};

  const confirmUpdate = async () => {
    
    try {
      console.log('Confirmando actualización del producto:', productId);
      await updateProduct(productId, product!, token!);
      setError(null);
      setModalOpen(false);
      const updatedProduct = await getProductById(productId);
      setProduct(updatedProduct);
      toast.success('Producto actualizado correctamente', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al actualizar el producto.', error);
      setError(
        'No se pudo actualizar el producto. Por favor, inténtalo nuevamente.',
      );
      toast.error(
        'Error al actualizar el producto. Por favor inténtalo nuevamente.',
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
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
      <h2 className="text-2xl font-bold mb-4 text-red-500">{product?.name}</h2>
      {product && (
      <>
      <div className="flex items-center">
        <PopularProductSwitch productId={productId} isInitiallyPopular={product.isPopular} />
      </div>
      <ProductForm defaultValues={{...product, category: product.category, imageURL: product.img}} onSubmit={handleUpdate} isEditMode/>
      <ConfirmModal
      isOpen={modalOpen}
      onConfirm={confirmUpdate}
      onCancel={closeModal}
      title="Confirmar actualización"
      message="¿Estás seguro de que quieres actualizar este producto?"
      />
      </>
    )}
    </div>
  );
};

export default ProductEdit;