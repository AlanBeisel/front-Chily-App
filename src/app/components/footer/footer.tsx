import React from 'react';
import { SlSocialTwitter, SlSocialInstagram, SlSocialFacebook } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="bg-red-500">
     <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center -mx-4">
        <div className="px-4 py-2">
          <a
            href="/aboutUs" className="text-white hover:text-gray-300">
            Sobre Nosotros
          </a>
          </div>
          <div className="px-4 py-2">
          <a
            href="/contact" className="text-white hover:text-gray-300">
            Contáctanos
          </a>
          </div>
          <div className="px-4 py-2">
          <a
            href="/policy-privacy" className="text-white hover:text-gray-300">
            Política de Privacidad
          </a>
        </div>
        </div>
        <div className="text-center text-white mt-8">
        <div className="flex justify-center space-x-4">
        <a
            href="/policy-privacy" className="text-white hover:text-gray-300">
            <SlSocialInstagram className="w-6 h-6"/>
          </a>
        <a
            href="/policy-privacy" className="text-white hover:text-gray-300">
            <SlSocialTwitter className="w-6 h-6"/>
          </a>
        <a
            href="/policy-privacy" className="text-white hover:text-gray-300">
            <SlSocialFacebook className="w-6 h-6"/>
          </a>
          </div>
          <p className="mt-4">Todos los derechos reservados &copy; {new Date().getFullYear()} Donde Chily.</p>
        </div>
        </div>
    </footer>
  );
};

export default Footer;

