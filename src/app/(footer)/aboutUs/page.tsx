import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="bg-red-500 text-white flex flex-col w-full min-h-full  mx-auto p-6">
      <div className=" w-full mb-6">
        <div className="relative w-full h-60 lg:h-96">
          <Image
            src="/chillyyyy.jpg"
            alt="chily"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Sobre Nosotros</h2>
      <p className="mb-4">
        En nuestro acogedor establecimiento, nos enorgullece ofrecer mucho más
        que una experiencia gastronómica. Somos una empresa familiar arraigada
        en valores de accesibilidad y servicio excepcional desde nuestro inicio.
        Comenzamos con el compromiso de proporcionar un espacio accesible para
        todas las personas, asegurando que todos puedan disfrutar de nuestras
        delicias culinarias con comodidad.
      </p>
      <p className="mb-4">
        Desde el primer día, hemos estado comprometidos con la entrega, el
        servicio a domicilio y la opción de llevar nuestrosplatillos,
        garantizando conveniencia y seguridad para todos nuestros clientes.
        Nuestro compromiso con la excelencia se refleja en cada plato que
        servimos, desde aperitivos cuidadosamente seleccionados hasta una
        variedad de cervezas artesanales para acompañar cualquier ocasión.
      </p>
      <p className="mb-4">
        Lo que nos distingue es nuestro ambiente acogedor e informal, ideal para
        reuniones de grupos y familias con niños. Desde almuerzos reconfortantes
        hasta cenas que culminan con irresistibles postres, cada visita es una
        oportunidad para disfrutar de momentos memorables en un entorno diseñado
        para el disfrute de todos.
      </p>
      <p className="mb-4">
        Como parte de nuestra visión de futuro, nos complace ofrecer servicios
        sanitarios impecables y la opción de reservar mesa, facilitando la
        planificación de eventos especiales y garantizando una experiencia
        placentera para todos nuestros visitantes.
      </p>
      <p className="mb-4">
        En resumen, somos más que un restaurante; somos un punto de encuentro
        para la comunidad, donde la calidad, la accesibilidad y el servicio
        excepcional se fusionan para crear momentos inolvidables. Estamos
        comprometidos con la innovación continua y la satisfacción del cliente,
        asegurando que cada visita a nuestro establecimiento sea una experiencia
        verdaderamente gratificante.
      </p>
    </div>
  );
};

export default AboutUs;
