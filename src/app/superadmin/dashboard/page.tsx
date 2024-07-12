'use client'
import React from 'react';
import Link from 'next/link';
import RouteGuard from '@/helpers/routeGuard';

const DashboardPage: React.FC = () => {
  return(
    <RouteGuard allowedRoles={['superadmin']}>
      <div className="min-h-screen flex flex-col items-center bg-white w-full h-full">
      <h1 className="text-2xl font-bold text-red-500">¡Bienvenido!</h1>
      <div className="flex flex-col items-center mt-10 w-full">
      <div className="mt-4">
        <Link href="/superadmin/products">
        <div className="bg-white text-red-500 px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Productos</div>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/superadmin/categories">
        <div className="bg-white text-red-500 px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Categorías de producto</div>
        </Link>
        </div>
        <div className="mt-4">
        <Link href="/superadmin/user">
        <div className="bg-white text-red-500 px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Cuentas</div>
        </Link>
      </div>
      <div className="mt-4">
        <Link href="/cupons">
        <div className="bg-white text-red-500 px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Cupones de descuento</div>
        </Link>
      </div>
    </div>
    </div>
    </RouteGuard>
  );
};

export default DashboardPage;