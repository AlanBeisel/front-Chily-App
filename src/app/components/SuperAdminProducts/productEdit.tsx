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
import { useRouter } from 'next/navigation'; 



interface ProductEditProps {
  productId: number;
}

const ProductEdit: React.FC<ProductEditProps> = ({productId}) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const {accessToken} = useAuth();
  const token = accessToken;


  useEffect(() => {
    const fetchProduct = async () =>{
      try{
          setLoading(true)
          const productData = await getProductById(productId);
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

    const updateData: any = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      img: data.img,
    };

  try {
    await updateProduct(productId, updateData, token);
    setError(null);
    setModalOpen(true);
    setProduct((prevProduct: any) => ({...prevProduct, ...updateData}));
    toast.success('Producto actualizado correctamente', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    router.push('/superadmin/products')
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
    setModalOpen(false);
  }
};


  const openModal = () => {
    setModalOpen(true);
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
      <ProductForm defaultValues={{...product, category: product.category, imageURL: product.img}} onSubmit={(data) => {
              handleUpdate(data);
              openModal();
            }} isEditMode/>
      <ConfirmModal
      isOpen={modalOpen}
      onConfirm={() => { 
        handleUpdate(product!);
        closeModal();
        
      }}
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