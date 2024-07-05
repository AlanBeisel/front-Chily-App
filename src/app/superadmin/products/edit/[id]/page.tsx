'use client'
import React from 'react';
import ProductEdit from '@/app/components/SuperAdminProducts/productEdit';


interface EditProductPageProps {
  params: { id: string };
}

const EditProductPage: React.FC<EditProductPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Editar Producto</h1>
      <ProductEdit productId={id} />
    </div>
  );
};

export default EditProductPage;
