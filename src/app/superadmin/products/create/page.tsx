'use client'
import React from "react";
import ProductCreate from "@/app/components/SuperAdminProducts/productCreate";
import RouteGuard from "@/helpers/routeGuard";

const CreateProductPage: React.FC = () => {
  return(
      <RouteGuard allowedRoles={['superadmin']}>
    <div>
      <ProductCreate />
    </div>
      </RouteGuard>
  );
};

export default CreateProductPage;