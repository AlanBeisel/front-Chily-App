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
     
      <ProductEdit productId={id} />
    </div>
  );
};

export default EditProductPage;