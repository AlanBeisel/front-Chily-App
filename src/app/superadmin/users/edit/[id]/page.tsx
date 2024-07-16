import React from 'react';
import RouteGuard from '@/helpers/routeGuard';
import EditUser from '@/app/components/SuperAdminUsers/userEdit';
import BackButton from '@/app/components/ProductIdComponents/BackButton';

interface UserEditPageProps {
  params: {id: number};
}

const UserEditPage: React.FC<UserEditPageProps>= ({ params } : UserEditPageProps) => {
  const {id} = params as {id:number};
  
  return (
    <RouteGuard allowedRoles={['superadmin', 'admin']}>
      <div className="w-full flex flex-col items-center justify-start min-h-screen bg-white p-4">
        <div className="mt-4 w-full">
          <BackButton/>
          <EditUser userId={id} />
        </div>
      </div>
    </RouteGuard>
  );
};

export default UserEditPage;