// vista de prueba, org como mostrar.

"use client"
import BackButton from '@/app/components/ProductIdComponents/BackButton';
import AdminChat from '@/app/components/Chat/AdminChat';
import RouteGuard from '@/helpers/routeGuard';
import React from 'react';



const AdminChatPage: React.FC = () => {


  return (
    <>
    <RouteGuard allowedRoles={['user', 'admin']}>
      <div className="flex justify-between items-center p-4">
        <div>
          <BackButton />
        </div>
        <h1 className="text-xl font-bold text-red-500">Chat de reclamos</h1>  
        </div>
        <AdminChat/>
    </RouteGuard>
    </>
  );
};

export default AdminChatPage;