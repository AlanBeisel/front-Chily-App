import React from 'react';
import DataField from './DataField';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}


const UserInfo = ({user} : {user: IUser | null}) => {

  if(!user) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex justify-center items-center">
        <p className="text-red-500 text-xl"> Usuario no autenticado. Por favor inicie sesión</p>
      </div>
    );
  }



  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex flex-col justify-center items-center space-y-4">
      <header className="flex items-center justify-center w-full max-w-md mb-4">
        <h1 className="text-2xl font-bold text-red-500"> Mi Cuenta</h1>
      </header>
      <DataField label = "Nombre" value= {user.name} editable = {false} />
      <DataField label = "Email" value= {user.email} editable = {true} />
      <DataField label = "Teléfono" value= {user.phone} editable = {true} />
      <DataField label = "Dirección" value= {user.address} editable = {false} />
      <DataField label = "Contraseña" value= {user.password} editable = {true} type = "password"/>
    </div>
  );
};

export default UserInfo;