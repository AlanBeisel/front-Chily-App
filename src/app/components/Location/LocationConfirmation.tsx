'use client';
import { useState, useEffect, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Address } from '@/types';

interface Location {
  lat: number;
  lng: number;
}

const LocationConfirmation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [addressInput, setAddressInput] = useState('');
  const [note, setNote] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { user, setAddress, accessToken } = useAuth();
  const router = useRouter();
  const token = accessToken;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          reverseGeocode(newLocation);
        },
        (error) => console.error(error),
      );
    }
  }, []);

  const reverseGeocode = async (location: Location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();

      if (data.status === 'OK') {
        const address = data.results[0].formatted_address;
        setAddressInput(address);
      } else {
        console.error(
          'Geocode was not successful for the following reason: ' + data.status,
        );
      }
    } catch (error) {
      console.error('Error reverse geocoding location: ', error);
    }
  };

  const handleConfirmLocation = async () => {
    if (location && addressInput) {
  
    const newAddress: Address = {
      id: '', 
      location,
      address: addressInput,
      note,
    };

    try {
      setAddress(newAddress);

      const addressData = {
        id: Number(user?.id),
        location,
        address: addressInput,
        note,
      };


        const response = await fetch('http://localhost:3002/addresses/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        });
        if (response.ok) {
          toast.success('Ubicación confirmada y dirección guardada.');
          const fromCart = localStorage.getItem('fromCart');
          if (fromCart) {
            localStorage.removeItem('fromCart');
            router.push('/cart');
          } else {
            router.push('/');
          }
        } else {
          toast.error('Error al guardar la dirección. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al hacer el POST:', error);
        toast.error('Error al guardar la dirección. Inténtalo de nuevo.');
      }
    } else {
      toast.error('Por favor, proporciona una dirección válida.');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressInput(e.target.value);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setLocation(newLocation);
      reverseGeocode(newLocation);
    }
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Confirma tu ubicación (Mueve el puntero hasta tu ubicacion)
      </h2>
      <div className="mb-4" style={{ height: '400px', width: '100%' }}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          libraries={['places']}
          onLoad={handleMapLoad}
        >
          {location && isMapLoaded && (
            <GoogleMap
              center={location}
              zoom={17}
              mapContainerStyle={{ height: '100%', width: '100%' }}
            >
              <Marker
                position={location}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>
          )}
        </LoadScript>
      </div>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        libraries={['places']}
      >
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            value={addressInput}
            onChange={handleAddressChange}
            placeholder="Confirma tu dirección"
            className="w-full p-2 border rounded mb-4"
          />
        </Autocomplete>
      </LoadScript>
      <input
        type="text"
        value={note}
        onChange={handleNoteChange}
        placeholder="Instrucciones de entrega"
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleConfirmLocation}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Confirmar ubicación
      </button>
    </div>
  );
};

export default LocationConfirmation;
