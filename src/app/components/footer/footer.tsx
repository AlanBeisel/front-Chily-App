import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-500 lg:h-12  text-white  ">
      <hr className="border-t-2 border-red-300" />
      <div className="flex flex-col  lg:flex-row justify-between">
        <div>
          <a
            href="/about-us"
            className="mr-4 lg:ml-4 underline decoration-white hover:decoration-yellow-400"
          >
            Sobre Nosotros
          </a>
          <a
            href="/contact"
            className="mr-4 underline decoration-white hover:decoration-yellow-400"
          >
            Contactanos
          </a>
          <a
            href="/privacy-policy"
            className="mr-4 underline decoration-white hover:decoration-yellow-400"
          >
            Política de Privacidad
          </a>
        </div>
        <div className="">
          <h1 className="">Todos los derechos reservados.</h1>
        </div>
        <div className="lg:mr-4">&copy; Donde chily</div>
      </div>
    </footer>
  );
};

export default Footer;
