'use client'
import React from 'react';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  return(
    <div>
      <h1 className="text-2xl font-bold">Dashboard Super Admin</h1>
      <div className="mt-4">
        <Link href="/superadmin/products">
        <div className="bg-red-500 text-white px-4 py-2 rounded mr-2">Gestionar Productos</div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;

