'use client'
import React from 'react';
import CategoryEdit from '@/app/components/SuperAdminCategory/categoryEdit';


interface EditCategoryPageProps {
  params: { id: string };
}

const EditCategoryPage: React.FC<EditCategoryPageProps> = ({ params }) => {
  const { id } = params;

  return (
    <div className="container mx-auto p-4">
     
      <CategoryEdit categoryId={id} />
    </div>
  );
};

export default EditCategoryPage;
