import React from 'react';
import DataField from './DataField';
import { useAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import { setCookie, getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

type Role = 'user' | 'admin' | 'superAdmin';

interface Credential {
  id: string;
  NIN: string;
  phone: string;
}

interface User {
  id: string;
  role: Role;
  name: string;
  NIN: string;
  email: string;
  googleAuth: boolean;
  phone: string;
  creditCardNumber: string;
  virtualWallet: string;
  preferredPaymentMethod: string;
  deletedAt: string | null;
  credential: Credential;
}


const UserInfo = ({user} : {user: User | null}) => {
  const {address} = useAuth();
  const[currentUser, setCurrentUser] = useState<User | null>(user);

  useEffect(() => {
    const storedUser = getCookie('user');
    if(storedUser) {
      setCurrentUser(JSON.parse(storedUser as string));
    }
  }, [])

  if(!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex justify-center items-center">
        <p className="text-red-500 text-xl"> Usuario no autenticado. Por favor inicie sesión</p>
      </div>
    );
  }

  const isPhoneEditable = currentUser.googleAuth;

  const handlePhoneChange = (newPhone: string) => {
    setCurrentUser({...currentUser, phone: newPhone});
    setCookie('user', JSON.stringify({...currentUser, phone:newPhone}));
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto mt-4 flex flex-col justify-center items-center space-y-4">
      <header className="flex items-center justify-center w-full mb-4">
        <h1 className="text-2xl font-bold text-red-500"> Mi Cuenta</h1>
      </header>
      <DataField label = "Nombre" value= {currentUser.name} editable = {false} />
      <DataField label = "Email" value= {currentUser.email} editable = {false} />
      <DataField label="Teléfono" value={currentUser.phone} type='tel' onChange={handlePhoneChange} editable={isPhoneEditable}/>

      {address && (
        <>
        <h2 className="text-1xl font-bold text-red-500">Tus direcciones</h2>
          <DataField label="Dirección" value={address.address} editable={false}/>

        </>
      )}

      <Link href="/req-reset" passHref>
      <button className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-700">
        Recuperar Contraseña
        </button>
      </Link>
    </div>
  );
};

export default UserInfo;