'use client'
import React from 'react';

import RouteGuard from '@/helpers/routeGuard';
import UsersList from '@/app/components/SuperAdminUsers/userList';

const UserListPage: React.FC = () => {
  return(
    <RouteGuard allowedRoles={['superadmin', 'admin']}>
      <div className="w-full flex flex-col items-center justify-start min-h-screen bg-white p-4">
      <div className="mt-4 w-full">
      <UsersList />
    </div>
  </div>
    </RouteGuard>
  );
};
export default UserListPage;