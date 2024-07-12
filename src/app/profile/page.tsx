'use client'
import React from 'react';
import UserInfo  from '../components/ProfileComponents/UserInfo';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/ProductIdComponents/BackButton';
import Link from 'next/link';



const UserDashboard: React.FC = () => {

  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white w-full h-full">
        <p className="text-gray-500 text-xl">Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white w-full h-full">
        <p className="text-red-500 text-xl">
          Usuario no autenticado. Por favor inicie sesión.
        </p>
      </div>
    );
  }




  return(
    <div className="min-h-screen flex flex-col items-center bg-white w-full h-full">
      <BackButton className= "self-start ml-4 mt-4" />
      <div className="flex flex-col items-center mt-10 w-full">
      {user ? (
        <UserInfo user={user} />
      ):(
        <div className="text-center mt-20"> Cargando...</div>
      )}
      <Link href="/orders" passHref>
      <button className= "mt-6 px-6 py-3 bg-red-500 text-white text-lg font semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
      Mis pedidos
      </button>
      </Link>
      </div>
    </div>
  );
};

export default UserDashboard;