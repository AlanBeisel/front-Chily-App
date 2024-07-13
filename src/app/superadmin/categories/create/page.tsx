'use client'
import React from "react";
import CategoryCreate from "@/app/components/SuperAdminCategory/categoryCreate";
import RouteGuard from "@/helpers/routeGuard";

const CreateCategoryPage: React.FC = () => {
  return(
      <RouteGuard allowedRoles={['superadmin']}>
    <div>
      <CategoryCreate />
    </div>
      </RouteGuard>
  );
};

export default CreateCategoryPage;