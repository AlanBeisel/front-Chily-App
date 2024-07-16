'use client'
import React from 'react';
import CategoryList from '@/app/components/SuperAdminCategory/categoryList';
import RouteGuard from '@/helpers/routeGuard';

const categoryListPage: React.FC = () => {
  return(
      <RouteGuard allowedRoles={['superadmin']}>
      <div className="w-full flex flex-col items-center justify-start min-h-screen bg-white p-8">
      <div className="mt-4 w-full">
      <CategoryList />
    </div>
    </div>
      </RouteGuard>
  );
};

export default categoryListPage;