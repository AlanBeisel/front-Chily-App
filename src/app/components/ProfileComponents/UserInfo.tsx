import React, { useState } from 'react';
import DataField from './DataField';
import { useAuth } from '@/app/contexts/AuthContext';
import PhoneModal from './PhoneModal';
import NameModal from './NameModal';

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
  const { address, isAuthenticated } = useAuth();
  const[isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const[isNameModalOpen, setIsNameModalOpen] = useState(false);

  const openPhoneModal = () => setIsPhoneModalOpen(true);
  const closePhoneModal = () => setIsPhoneModalOpen(false);

  const openNameModal = () => setIsNameModalOpen(true);
  const closeNameModal = () => setIsNameModalOpen(false);

  const handlePhoneSave = (newPhone: string) => {
    console.log('Nuevo teléfono guardado:', newPhone);
  };

  const handleNameSave = (newName: string) => {
    console.log('Nuevo teléfono guardado:', newName);
  };

 

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
      <DataField label="Nombre" value={user.name} editable={true}  onEdit={openNameModal}/>
      <DataField label="Email" value={user.email} editable={false}  />
      <DataField label="Teléfono" value={user.credential.phone} editable={true} onEdit={openPhoneModal}/>


      {address && (
        <div>
          <h2 className="text-lg font-semibold text-red-500">Tus direcciones:</h2>
          <div className="mt-2">
            <DataField label="Dirección" value={address.address} editable={false} />
          </div>
        </div>
      )}

      <PhoneModal
      isOpen={isPhoneModalOpen}
      onClose={closePhoneModal}
      onSave={handlePhoneSave}
      initialPhone = {user.credential.phone}
      userId={parseInt(user.id)}
      />
      <NameModal
      isOpen={isNameModalOpen}
      onClose={closeNameModal}
      onSave={handleNameSave}
      initialName = {user.name}
      userId={parseInt(user.id)}
      />
    </div>
  );
};

export default UserInfo;