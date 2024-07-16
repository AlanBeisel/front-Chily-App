'use client'
import React from 'react';
import Link from 'next/link';
import RouteGuard from '@/helpers/routeGuard';

const DashboardPage: React.FC = () => {
  return(
    <RouteGuard allowedRoles={['superadmin']}>
      <div className="min-h-screen flex flex-col items-center bg-white w-full h-full">
      <h1 className="text-5xl font-bold text-red-500">¡Bienvenido!</h1>
      <div className="flex flex-col items-center mt-10 w-full self-start">
      <div className="w-full max-w-md">
        <Link href="/superadmin/products">
        <div className="bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Productos</div>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <Link href="/superadmin/categories">
        <div className=" bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Categorías de producto</div>
        </Link>
        </div>
        <div className="w-full max-w-md">
        <Link href="/admin-history">
        <div className="bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Órdenes</div>
        </Link>
      </div>
        <div className="w-full max-w-md">
        <Link href="/superadmin/transactions">
        <div className="bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Transacciones</div>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <Link href="/superadmin/users">
        <div className=" bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Cuentas</div>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <Link href="/cupons">
        <div className="bg-red-500 text-white px-4 py-2 mb-4 hover:bg-red-100 rounded mr-2 flex justify-between items-center">Gestionar Cupones de descuento</div>
        </Link>
      </div>
      
    </div>
    </div>
    </RouteGuard>
  );
};

export default DashboardPage;