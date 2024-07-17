'use client'
import React from "react";
import TransactionInfoPage from "@/app/components/SuperAdminStripe/TransactionList";
import RouteGuard from "@/helpers/routeGuard";

const CreateProductPage: React.FC = () => {
  return(
      <RouteGuard allowedRoles={['superadmin']}>
    <div>
      <TransactionInfoPage />
    </div>
      </RouteGuard>
  );
};

export default CreateProductPage;