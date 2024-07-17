'use client'
import React from 'react';
import ProductList from '@/app/components/SuperAdminProducts/productList';
import RouteGuard from '@/helpers/routeGuard';

const ProductListPage: React.FC = () => {
  return(
    <RouteGuard allowedRoles={['superadmin', 'admin']}>
      <div className="w-full flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="mt-4 w-full">
      <ProductList />
    </div>
  </div>
    </RouteGuard>
  );
};
export default ProductListPage;