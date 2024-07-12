'use client'
import React from 'react';
import UserInfo  from '../components/ProfileComponents/UserInfo';
import { useAuth } from '../contexts/AuthContext';
import BackButton from '../components/ProductIdComponents/BackButton';
import { HiChevronRight } from "react-icons/hi";
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
       <div className="flex flex-col md:flex-row justify-center w-full">
      <Link href="/address" passHref>
      <div className= "md:mr-4  mt-4 px-6 py-3 bg-red-500 text-white text-lg font-semibold flex items-center justify-between cursor-pointer">
      <span>Nueva dirección</span>
      <HiChevronRight />
      </div>
      </Link> 
      <Link href="/orders" passHref>
      <div className= "md:mr-4  mt-4 px-6 py-3 bg-red-500 text-white text-lg font-semibold flex items-center justify-between cursor-pointer">
      <span>Mis Pedidos</span>
      <HiChevronRight />
      </div>
      </Link>
      <Link href="/change-password" passHref>
      <div className= "md:mr-4  mt-4 px-6 py-3 bg-red-500 text-white text-lg font-semibold flex items-center justify-between cursor-pointer">
      <span>Cambiar contraseña</span>
      <HiChevronRight />
      </div>
      </Link>
      </div>
    </div>
    </div>
  );
};

export default UserDashboard;