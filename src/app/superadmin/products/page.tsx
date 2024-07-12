'use client'
import React from 'react';
import ProductList from '@/app/components/SuperAdminProducts/productList';
import BackButton from '@/app/components/ProductIdComponents/BackButton';
import RouteGuard from '@/helpers/routeGuard';

const ProductListPage: React.FC = () => {
  return(
    <RouteGuard allowedRoles={['superadmin']}>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <BackButton className= "self-start ml-4 mt-4" />
      <div className="mt-4">
      <ProductList />
    </div>
  </div>
    </RouteGuard>
  );
};
export default ProductListPage;