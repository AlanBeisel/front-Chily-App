import React, { useState, useEffect } from 'react';
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

const UserInfo = ({ user: initialUser }: { user: User | null }) => {
  const { address, isAuthenticated, updateUser, accessToken, isAdmin, isSuperAdmin } = useAuth() as AuthContextType;
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [phoneFieldKey, setPhoneFieldKey] = useState<number>(0);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  const openPhoneModal = () => {
    setIsPhoneModalOpen(true);
    setEditMode(true); 
  };

  const closePhoneModal = () => {
    setIsPhoneModalOpen(false);
    setEditMode(false); 
  };

  const handlePhoneSave = (newPhone: string) => {
    if (user) {
      const updatedUser = { ...user, phone: newPhone };
      setUser(updatedUser);
      updateUser(updatedUser);
      setPhoneFieldKey((prevKey) => prevKey + 1);
    }
  };

  if (!user || !isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 h-screen w-screen flex justify-center items-center">
        <p className="text-red-500 text-xl">
          Usuario no autenticado. Por favor inicie sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full mx-auto mt-4 space-y-4">
      <header className="flex items-center justify-center w-full mb-4">
        <h1 className="text-2xl font-bold text-red-500">Mi Cuenta</h1>
      </header>
      <div key={phoneFieldKey}>
        <DataField label="Nombre" value={user.name} editable={false} />
        <DataField label="Email" value={user.email} editable={false} />
        <DataField
          label="Teléfono"
          value={user.phone}
          editable={!editMode}
          onEdit={openPhoneModal}
        />
      </div>

      {!isAdmin() && !isSuperAdmin() && (
        <>
          {address && (
            <div>
              <h2 className="text-lg font-semibold text-red-500">
                Tus direcciones:
              </h2>
              <div className="mt-2">
                <DataField
                  label="Dirección"
                  value={address.address}
                  editable={false}
                />
              </div>
            </div>
          )}
        </>
      )}

      <PhoneModal
        isOpen={isPhoneModalOpen}
        onClose={closePhoneModal}
        onSave={handlePhoneSave}
        initialPhone={user.phone}
        userId={parseInt(user.id)}
        accessToken={accessToken || ''}
      />
    </div>
  );
};

export default UserInfo;

