'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Landing() {
  const [locationPermission, setLocationPermission] = useState<boolean | null>(
    null,
  );
  const router = useRouter();

  useEffect(() => {
    if ('geolocation' in navigator) {
      setLocationPermission(true);
    } else {
      setLocationPermission(false);
    }
  }, []);

  const requestLocationPermission = () => {
    if (locationPermission) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Ubicación obtenida:', { latitude, longitude });
          router.push('/home');
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          alert(
            'No se pudo obtener la ubicación. Por favor, inténtalo de nuevo.',
          );
        },
      );
    }
  };

  return (
    <div className="bg-red-500 min-h-screen h-full flex flex-col items-center justify-between p-8 w-full">
      <h1 className="text-4xl font-bold text-white mb-4">Donde Chily</h1>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">
          ¡Bienvenido!
        </h2>
        <Image
          src="/LogoLay.png"
          alt="Chily Mascot"
          width={200}
          height={200}
          className="mb-8"
        />
        {locationPermission === null ? (
          <p>Comprobando soporte de geolocalización...</p>
        ) : locationPermission ? (
          <button
            onClick={requestLocationPermission}
            className="bg-white text-red-500 font-bold py-3 px-6 rounded-full text-xl"
          >
            Activar ubicación
          </button>
        ) : (
          <p className="text-white text-center">
            Lo sentimos, tu navegador no soporta geolocalización.
          </p>
        )}
      </div>
    </div>
  );
}
