import React from 'react';
import {HiOutlineUser, HiOutlineClipboardCheck } from 'react-icons/hi';
import Link from 'next/link';
//import { useAuth } from '@/app/contexts/AuthContext';


const MenuNavigation = () => {

  //const {logout} = useAuth();


  return (
    <div className="bg-white rounded-lg shadow-lg p-8 h-screen w-screen flex flex-col justify-center items-center space-y-4">
      <div className="mb-6">
      <header className="flex items-center justify-center w-full max-w-md mb-4">
        <h1 className="text-4xl font-bold text-red-500"> Perfil</h1>
      </header>
        <ul className="space-y-3">
          <li className="mb-3">
            <Link href="/profile">
              <button className="w-full text-left text-red-500 hover:bg-red-100 p-5 rounded-md flex items-center">
                <span className="inline-block w-20 h-20 mr-2 text-red-500 flex items-center justify-center">
                  <HiOutlineUser/>
                </span>
                Mi Cuenta
              </button>
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/orders">
              <button className="w-full text-left text-red-500 hover:bg-red-100 p-5 rounded-md flex items-center">
                <span className="inline-block w-20 h-20 mr-2 text-red-500 flex items-center justify-center">
                  <HiOutlineClipboardCheck/>
                </span>
                Mis Pedidos
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <button 
         // onClick={() => logout()} 
          className=" border-2 border-red-500 text-red-500 rounded-full px-5 py-2 hover:bg-red-500 hover:text-white"
        >
          Cerrar Sesión
        </button>
      </div>
  );
};

export default MenuNavigation;