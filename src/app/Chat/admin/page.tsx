// vista de prueba, org como mostrar.

"use client"
import BackButton from '@/app/components/ProductIdComponents/BackButton';
import AdminChat from '@/app/components/Chat/AdminChat';
import RouteGuard from '@/helpers/routeGuard';
import React from 'react';
import Link from 'next/link';


const AdminChatPage: React.FC = () => {


  return (
    <>
    <RouteGuard allowedRoles={['user', 'admin']}>
      <div className="flex justify-between items-center p-4">
        <div>
          <BackButton />
        </div>
        <h1 className="text-xl font-bold text-red-500">Chat de reclamos</h1>  
        <div>
          <Link href={'/'}>
          <button className="bg-red-500 rounded-full py-2 px-4 text-white font-semibold">
            Mensajes no leídos
          </button>
          </Link>
        </div>
        </div>
        <AdminChat/>
    </RouteGuard>
    </>
  );
};

export default AdminChatPage;