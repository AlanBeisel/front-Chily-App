'use client'
import React, {useEffect, useState} from 'react';
import ProductForm from './productForm';
import { getProductById } from '@/helpers/peticiones';
import { updateProduct } from '@/helpers/peticionesSuperAdmin';
import { Product } from '@/types';
import ConfirmModal from './confirmModal';
import PopularProductSwitch from './popularSwitch';

interface ProductEditProps {
  productId: string;
}

const ProductEdit: React.FC<ProductEditProps> = ({productId}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


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

  const handleUpdate = async (data: Product) => {
    try {
      setLoading(true);
      setModalOpen(true);
      console.log('Actualizando popularidad del producto:', productId);
      await updateProduct(productId, data);
    //  router.push('/dashboard');
    } catch (error) {
      console.error('Error al actualizar el producto', error);
      setError('No se pudo actualizar el producto. Por favor, inténtalo nuevamente.');
    }finally {
      setLoading(false);
    }
  };

  const confirmUpdate = async () => {
    try{
      await updateProduct(productId, product!);
      setError(null);
      setModalOpen(false);
      const updatedProduct = await getProductById(productId);
      setProduct(updatedProduct);
    } catch (error) {
      console.error('Error al actualizar el producto.', error);
      setError('No se pudo actualizar el producto. Por favor, inténtalo nuevamente.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handlePopularUpdate = async (isPopular:boolean) => {
    try {
      setLoading(true);
      const updatedProduct = {...product!, isPopular};
      console.log('Datos del producto actualizado:', updatedProduct);
      await updateProduct(productId, updatedProduct);
      console.log('Respuesta del servidor:', Response);
      setProduct(updatedProduct);
      setLoading(false);
    }catch (error) {
      console.error('Error al actualizar la popularidad del producto, error');
      setError('No se pudo actualizar la popularidad del producto. Por Favor, inténtalo nuevamente');
      setLoading(false);
    }
  };

  if (loading) {
    return <p> Cargando...</p>;
  }

  if(error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-red-500">Producto ID:{productId}</h2>
      {product && (
      <>
      <div className="flex items-center">
        <PopularProductSwitch productId={productId} isInitiallyPopular={product.isPopular} onUpdatePopular={handlePopularUpdate} />
      </div>
      <ProductForm defaultValues={{...product, category: product.category, image: product.img}} onSubmit={handleUpdate} isEditMode/>
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