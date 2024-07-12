'use client';
import React, { useState } from 'react';

const WhatsAppForm = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    const phoneNumber = '527751412206'; // Reemplaza con el número de WhatsApp al que deseas enviar el mensaje
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-100 text-black flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
        Contáctanos por WhatsApp
      </h1>
      <p className="text-lg md:text-xl mb-6 text-center max-w-2xl">
        Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes
        en enviarnos un mensaje a través de WhatsApp. Estamos aquí para ayudarte
        y responder a todas tus inquietudes.
      </p>
      <form className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <label
          htmlFor="message"
          className="block text-black mb-4 text-lg md:text-xl font-semibold"
        >
          Escribe tu mensaje:
        </label>
        <textarea
          id="message"
          className="w-full p-4 border border-gray-300 rounded-lg mb-4 resize-none"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
        />
        <button
          type="button"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-semibold text-lg md:text-xl"
          onClick={handleSendMessage}
        >
          Enviar por WhatsApp
        </button>
      </form>
      <p className="text-center mt-6 text-base md:text-lg">
        Nos comprometemos a responder lo antes posible. ¡Gracias por
        contactarnos!
      </p>
    </div>
  );
};

export default WhatsAppForm;
