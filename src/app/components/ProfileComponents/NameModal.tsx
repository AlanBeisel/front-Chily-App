import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';


interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  initialName: string;
  userId: number

}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const NameModal: React.FC<NameModalProps> = ({isOpen, onSave, onClose, initialName, userId }) => {
  const [tempName, setTempName] = useState(initialName || '');

  useEffect(() =>{
    setTempName(initialName);
  },[initialName]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(event.target.value);
  };

  const handleSave = async () => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: tempName}),
          });

          console.log('Response status:', response.status);
          console.log('Response body:', await response.json());

    
           if (!response.ok) {
          throw new Error('Error en el servidor'); 
          }
          toast.success('Nombre actualizado con éxito', {
            position: 'top-center',
         autoClose: 3000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         });
          onSave(tempName);
          onClose();
        } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        toast.error('Error al actualizar el usuario', {
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
    <div className="fixed top-0 left-0 w-full h-screen bg-red-200 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-red-500">Editar Nombre</h2>
        <input
          type="tel"
          value={tempName}
          onChange={handleNameChange}
          className="w-full p-2 mb-4 text-gray-300"
          placeholder="Ingresa tu nuevo nombre"
        />
        <button
          onClick={handleSave}
          className="bg-green-500 text-white rounded-md hover:bg-green-700 p-2 w-full"
        >
          Guardar nombre
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

export default NameModal;