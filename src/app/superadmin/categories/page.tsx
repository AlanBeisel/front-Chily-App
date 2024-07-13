'use client'
import React from 'react';
import CategoryList from '@/app/components/SuperAdminCategory/categoryList';
import RouteGuard from '@/helpers/routeGuard';

const categoryListPage: React.FC = () => {
  return(
      <RouteGuard allowedRoles={['superadmin']}>
    <div>
      <CategoryList />
    </div>
      </RouteGuard>
  );
};

export default categoryListPage;