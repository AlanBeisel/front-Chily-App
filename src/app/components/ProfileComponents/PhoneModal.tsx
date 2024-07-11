import React from 'react';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePhoneChange: (newPhone: string) => void;
  handlePhoneSubmit: () => void;
  tempPhone: string;
}

const PhoneModal: React.FC<PhoneModalProps> = ({
  isOpen,
  onClose,
  handlePhoneChange,
  handlePhoneSubmit,
  tempPhone,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Editar Teléfono</h2>
        <input
          type="tel"
          value={tempPhone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          className="w-full p-2 mb-4"
          placeholder="Ingresa tu nuevo teléfono"
        />
        <button
          onClick={handlePhoneSubmit}
          className="bg-red-500 text-white rounded-md hover:bg-red-700 p-2 w-full"
        >
          Guardar teléfono
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white rounded-md hover:bg-gray-700 p-2 w-full mt-4"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PhoneModal;