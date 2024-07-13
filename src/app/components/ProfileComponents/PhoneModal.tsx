import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/contexts/AuthContext';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPhone: string) => void;
  initialPhone: string;
  userId: number;
  accessToken: string;

}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PhoneModal: React.FC<PhoneModalProps> = ({isOpen, onClose, onSave, initialPhone, userId }) => {
  const [tempPhone, setTempPhone] = useState(initialPhone || '');

  const {accessToken} = useAuth();

  useEffect(() =>{
    setTempPhone(initialPhone);
  },[initialPhone]);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempPhone(event.target.value);
  };

  const handleSave = async () => {
    try {
      console.log('Token de acceso:', accessToken);
        const response = await fetch(`${API_URL}/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${accessToken}` 
          },
          body: JSON.stringify({ phone: tempPhone}),
          
          });

          console.log('Response status:', response.status);
       
          if (response.headers.get('content-type')?.includes('application/json')) {
            const responseData = await response.json();
            console.log('Response body:', responseData);
          } else {
            console.log('Response body:', await response.text());
          }


           if (!response.ok) {
          throw new Error('Error en el servidor'); 
          }

          toast.success('Teléfono actualizado con éxito', {
            position: 'top-center',
         autoClose: 3000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         });
          onSave(tempPhone);
          onClose();
        } catch (error) {
        toast.error('Error al actualizar el usuario:', {
          position: 'top-center',
       autoClose: 3000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       });
      };
    };

  if(!isOpen) return null;


  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-200 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-red-500">Editar Teléfono</h2>
        <input
          type="tel"
          value={tempPhone}
          onChange={handlePhoneChange}
          className="w-full p-2 mb-4 text-gray-300"
          placeholder="Ingresa tu nuevo teléfono"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 text-white rounded-md hover:bg-green-700 p-2 w-full"
        >
          Guardar teléfono
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white rounded-md hover:bg-red-700 p-2 w-full mt-4"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default PhoneModal;

