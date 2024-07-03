'use client';

import React, { useEffect, useState } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  items: OrderItem[];
  taxes: number;
  deliveryFees: number;
  total: number;
}

const Checkout: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('efectivo');
  const [saveCardDetails, setSaveCardDetails] = useState<boolean>(true);

  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return <p>Cargando...</p>;
  }

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    // Lógica para procesar el pago
    localStorage.removeItem('cartItems');
    localStorage.removeItem('order');
    // Puedes agregar lógica adicional aquí, como redireccionar a una página de confirmación
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6 ">
      <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
      <div className="mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span>Costos de entrega</span>
          <span>${(order.deliveryFees ?? 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${order.total.toFixed(2)}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Tiempo estimado: 15 – 30mins
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Métodos de pago</h2>
      <div className="space-y-2 mb-4">
        <div
          className={`flex items-center p-4 border rounded-lg cursor-pointer ${
            selectedPaymentMethod === 'efectivo'
              ? 'border-black'
              : 'border-gray-300'
          }`}
          onClick={() => handlePaymentMethodChange('efectivo')}
        >
          <div className="w-8 h-8 mr-4 bg-green-500 rounded-full flex items-center justify-center text-white">
            $
          </div>
          <div>
            <h3 className="font-semibold">Efectivo</h3>
          </div>
          {selectedPaymentMethod === 'efectivo' && (
            <div className="ml-auto">
              <div className="w-4 h-4 rounded-full border-2 border-black"></div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex items-center p-4 border rounded-lg cursor-pointer ${
          selectedPaymentMethod === 'tarjeta'
            ? 'border-black'
            : 'border-gray-300'
        }`}
        onClick={() => handlePaymentMethodChange('tarjeta')}
      >
        <div className="w-8 h-8 mr-4 bg-blue-500 rounded-full flex items-center justify-center text-white">
          💳
        </div>
        <div>
          <h3 className="font-semibold">Tarjeta de débito/crédito</h3>
        </div>
        {selectedPaymentMethod === 'tarjeta' && (
          <div className="ml-auto">
            <div className="w-4 h-4 rounded-full border-2 border-black"></div>
          </div>
        )}
      </div>

      {selectedPaymentMethod === 'tarjeta' && (
        <div className="mb-4">
          <label className="block mb-2">Número de tarjeta</label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Número de tarjeta"
          />

          <label className="block mb-2">Fecha de expiración</label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="MM/AA"
          />

          <label className="block mb-2">Nombre completo</label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="Nombre completo"
          />

          <label className="block mb-2">DNI</label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="DNI"
          />

          <label className="block mb-2">Código de seguridad</label>
          <input
            type="text"
            className="w-full px-3 py-2 mb-4 border rounded"
            placeholder="CVC"
          />

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={saveCardDetails}
              onChange={() => setSaveCardDetails(!saveCardDetails)}
            />
            <span className="ml-2 text-sm">
              Guardar detalles de la tarjeta para futuros pagos
            </span>
          </label>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">Precio total</span>
        <span className="text-xl font-bold">${order.total.toFixed(2)}</span>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-red-500 text-white text-center py-3 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
      >
        Pagar ahora
      </button>
    </div>
  );
};

export default Checkout;
