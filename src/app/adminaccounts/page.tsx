import React from 'react';
import AdminAccountForm from '../components/SuperAdmin/AdminAccountForm';
import RouteGuard from '@/helpers/routeGuard';

const AdminAccountPage: React.FC = () => {
  return (
    <RouteGuard allowedRoles={['admin', 'superadmin']}>
      <div className="container mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold mb-4">
          Crear Cuenta de Administrador
        </h1>
        <AdminAccountForm />
      </div>
    </RouteGuard>
  );
};

export default AdminAccountPage;
