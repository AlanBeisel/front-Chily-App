import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-500 w-full py-4 text-white items-end">
      <hr className="border-t-2 border-red-300 mb-4" />
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4 lg:mb-0">
          <a
            href="/aboutUs"
            className="underline decoration-white hover:decoration-yellow-400 mb-2 lg:mb-0"
          >
            Sobre Nosotros
          </a>
          <a
            href="/contact"
            className="underline decoration-white hover:decoration-yellow-400 mb-2 lg:mb-0"
          >
            Contáctanos
          </a>
          <a
            href="/privacy-policy"
            className="underline decoration-white hover:decoration-yellow-400"
          >
            Política de Privacidad
          </a>
        </div>
        <div className="text-center mb-4 lg:mb-0">
          <h1>Todos los derechos reservados.</h1>
        </div>
        <div className="lg:mr-4">
          &copy; {new Date().getFullYear()} Donde Chily
        </div>
      </div>
    </footer>
  );
};

export default Footer;
