'use client';
import { useEffect, useState } from 'react';
import LocationConfirmation from '../components/Location/LocationConfirmation';
import { useAuth } from '@/app/contexts/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Address } from '@/types';

const ConfirmLocationPage = () => {
  const { user, setAddress, accessToken } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null,
  );
  const [showLocationConfirmation, setShowLocationConfirmation] =
    useState<boolean>(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const router = useRouter();
  const token = accessToken;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/addresses/user?id=${user?.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAddresses(data);

          // Preseleccionar la primera dirección si hay direcciones guardadas
          if (data.length > 0) {
            setSelectedAddressId(data[0].id);
          }
        } else {
          toast.error('Error al obtener las direcciones guardadas.');
        }
      } catch (error) {
        console.error('Error al obtener las direcciones guardadas:', error);
        toast.error('Error al obtener las direcciones guardadas.');
      }
    };

    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const handleAddressSelect = (id: number) => {
    setSelectedAddressId(id);
  };

  const handleConfirmLocation = async () => {
    if (selectedAddressId) {
      const selectedAddress = addresses.find(
        (address) => address.id === selectedAddressId,
      );
      if (selectedAddress) {
        try {
          await setAddress(selectedAddress);

          router.push('/');
        } catch (error) {
          console.error('Error al establecer la dirección:', error);
          toast.error('Error al establecer la dirección.');
        }
      } else {
        toast.error('Dirección seleccionada no encontrada.');
      }
    } else {
      toast.error('Por favor selecciona una dirección.');
    }
  };

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(!isAddingNewAddress);
    setShowLocationConfirmation(!showLocationConfirmation);
  };

  return (
    <div className="container mx-auto mt-8">
      {!isAddingNewAddress && addresses.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Selecciona una dirección guardada
          </h2>
          <div className="mb-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border rounded mb-2 cursor-pointer ${selectedAddressId === address.id ? 'border-red-500' : ''}`}
                onClick={() => handleAddressSelect(address.id)}
              >
                <p>
                  <strong>Dirección:</strong> {address.address}
                </p>
                <p>
                  <strong>Nota:</strong> {address.note}
                </p>
              </div>
            ))}
          </div>
          {selectedAddressId && (
            <div className="mb-4">
              <button
                onClick={handleConfirmLocation}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mb-2"
              >
                Confirmar ubicación
              </button>
              <p className="text-center text-sm">O agrega otra:</p>
            </div>
          )}
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            onClick={handleAddNewAddress}
          >
            {isAddingNewAddress ? 'Cerrar' : 'Agregar nueva dirección'}
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            No tienes direcciones guardadas
          </h2>
          <button
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mb-4"
            onClick={handleAddNewAddress}
          >
            {isAddingNewAddress ? 'Cerrar' : 'Agregar dirección'}
          </button>
        </div>
      )}

      {isAddingNewAddress && <LocationConfirmation />}
    </div>
  );
};

export default ConfirmLocationPage;
