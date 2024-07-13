'use client'
import React from 'react';
import CategoryEdit from '@/app/components/SuperAdminCategory/categoryEdit';
import RouteGuard from '@/helpers/routeGuard';


interface EditCategoryPageProps {
  params: { id: string };
}

const EditCategoryPage: React.FC<EditCategoryPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <RouteGuard allowedRoles={['superadmin']}>

    <div className="container mx-auto p-4">
    
      <CategoryEdit categoryId={id} />
    </div>
    </RouteGuard>
  );
};

export default EditCategoryPage;
