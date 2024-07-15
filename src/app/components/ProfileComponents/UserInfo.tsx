import React, { useEffect, useState } from 'react';
import DataField from './DataField';
import { useAuth, AuthContextType } from '@/app/contexts/AuthContext';
import PhoneModal from './PhoneModal';


type Role = 'user' | 'admin' | 'superadmin';

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

const UserInfo = ({ user }: { user: User | null }) => {
  const { address, isAuthenticated, updateUser } = useAuth() as AuthContextType;
  const[isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [, setUserPhone] =useState('');

  const {accessToken, isAdmin, isSuperAdmin} = useAuth();

  useEffect(() =>{
    if(user) {
      setUserPhone(user.phone);
    }
  }, [user])

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);

  const handlePhoneSave = async (newPhone: string) => {
    try{
      if(!user) return;
      const response = await fetch(`process.env.NEXT_PUBLIC_API_URL/user/${user.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({phone:newPhone}),
      });
      
      if(!response.ok) {
        throw new Error(`Error al actualizar el teléfono: ${response.status} - ${response.statusText}`);
      }

      
        const updatedUser: User = {
          ...user, 
          phone: newPhone
        };
      updateUser(updatedUser);
      setUserPhone(newPhone);
      closePhoneModal();
    } catch (error) {
      console.error('Error al actualizar el teléfono:', error);
    }
  };

  console.log('Usuario:', user);
  console.log('Dirección:', address);
  console.log('¿Autenticado?', isAuthenticated);
 

  if (!user || !isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">Usuario no autenticado. Por favor inicie sesión.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto mt-4 space-y-4">
      <header className="flex items-center justify-center w-full mb-4">
        <h1 className="text-2xl font-bold text-red-500">Mi Cuenta</h1>
      </header>
      <DataField label="Nombre" value={user.name} editable={false} />
      <DataField label="Email" value={user.email} editable={false}  />
      <DataField label="Teléfono" value={user.phone} editable={true} onEdit={openPhoneModal}/>

      {!isAdmin() && !isSuperAdmin() && (
      <>
      {address && (
        <div>
          <h2 className="text-lg font-semibold text-red-500">Tus direcciones:</h2>
          <div className="mt-2">
            <DataField label="Dirección" value={address.address} editable={false} />
          </div>
        </div>
      )}
      </>
      )}

      <PhoneModal
      isOpen={isPhoneModalOpen}
      onClose={closePhoneModal}
      onSave={handlePhoneSave}
      initialPhone = {user.phone}
      userId={parseInt(user.id)}
      accessToken = {accessToken || ''}
      />
    </div>
  );
};

export default UserInfo;
