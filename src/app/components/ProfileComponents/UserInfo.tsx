import React from 'react';
import DataField from './DataField';

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

  if(!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex justify-center items-center">
        <p className="text-red-500 text-xl"> Usuario no autenticado. Por favor inicie sesión</p>
      </div>
    );
  }



  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto mt-4 flex flex-col justify-center items-center space-y-4">
      <header className="flex items-center justify-center w-full mb-4">
        <h1 className="text-2xl font-bold text-red-500"> Mi Cuenta</h1>
      </header>
      <DataField label = "Nombre" value= {user.name} editable = {false} />
      <DataField label = "Email" value= {user.email} editable = {false} />
      <DataField label = "Teléfono" value= {user.phone} editable = {false} />
    </div>
  );
};

export default UserInfo;