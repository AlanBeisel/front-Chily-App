import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-500 p-4 rounded-lg text-white flex justify-between max-lg:flex-col max-lg:justify-center items-center">
      <div className="flex max-lg:flex-col items-center justify-center">
        <a
          href="/aboutUs"
          className="p-2 lg:p-4 underline decoration-white hover:decoration-yellow-400"
        >
          Sobre Nosotros
        </a>
        <a
          href="/contact"
          className="p-2 lg:ml-6 underline decoration-white hover:decoration-yellow-400"
        >
          Contáctanos
        </a>
        <a
          href="/privacy-policy"
          className="p-2 lg:ml-6 underline decoration-white hover:decoration-yellow-400"
        >
          Política de Privacidad
        </a>
      </div>
      <h1>Todos los derechos reservados.</h1>
      <h2>&copy; Donde Chily</h2>
    </footer>
  );
};

export default Footer;
