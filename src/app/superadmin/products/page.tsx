'use client'
import React from 'react';
import ProductList from '@/app/components/SuperAdminProducts/productList';
import BackButton from '@/app/components/ProductIdComponents/BackButton';

const ProductListPage: React.FC = () => {
  return(
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <BackButton className= "self-start ml-4 mt-4" />
      <div className="mt-4">
      <ProductList />
    </div>
  </div>
  );
};
export default ProductListPage;