import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-red-500 bg-opacity-90 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-red-500">
          Página no encontrada
        </h2>
        <p className="mb-6 text-gray-600">
          Lo sentimos, la página que buscas no existe o está en construcción.
        </p>
        <Link href="/" passHref>
          <button className="bg-red-500 text-white py-3 px-6 rounded-full hover:bg-red-600 transition-colors duration-300 text-lg font-semibold">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
