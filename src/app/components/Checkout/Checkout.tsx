'use client';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import CustomModal from './modals';
import { useRouter } from 'next/navigation';
import CouponInput from './CuponInput';
import { Address } from '@/types';
import { useAuth } from '@/app/contexts/AuthContext';





const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`); 

interface ProductsInOrder {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  userId: string;
  productsInOrder: ProductsInOrder[];
  orderInstructions?: string;
  address: Address;
  total: number;
  couponId?: string | null;
  couponDiscount?: number;
  metodoDePago: 'efectivo' | 'tarjeta';
}

const Checkout: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('efectivo');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const router = useRouter();
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const {accessToken} = useAuth();
  const token = accessToken;


  useEffect(() => {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  useEffect(() => {
    if (order) {
      const amount = order.total *1000; 

      const fetchClientSecret = async () => {
        console.log("este es el monto:", amount)
        const response = await fetch(
          'http://localhost:3002/payments/payment-intent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ amount }),
          },
        );
        const data = await response.json();
        console.log(data)
        setClientSecret(data.clientSecret);
      };

      fetchClientSecret();
    }
  }, [order]);

  if (!order) {
    return <p>Cargando...</p>;
  }

const handlePaymentMethodChange = (method: 'efectivo' | 'tarjeta') => {
  if (!order) return;

  setOrder((prevOrder) => {
    if (!prevOrder) return prevOrder;

    return {
      ...prevOrder,
      metodoDePago: method,
    };
  });
  setSelectedPaymentMethod(method);
};

  

  const handlePayment = async () => {
    try {
      if (!order) return;

      const response = await fetch('http://localhost:3002/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la orden.');
      }

      localStorage.removeItem('cartItems');
      localStorage.removeItem('order');

      setModalType('success');
      setModalMessage('Pedido realizado con éxito!');
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error al procesar el pago en efectivo:', error);
      setModalType('error');
      setModalMessage('Algo falló al procesar el pago en efectivo.');
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push('/checkout');
      }, 3000);
    }
  };

  const handleApplyCoupon = async (couponCode: string) => {
    if (!order) return;

    try {
      const response = await fetch(
        `http://localhost:3002/discount/invalid?code=${encodeURIComponent(couponCode)}&userId=${order.userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Error al validar el cupón');
      }

      const data = await response.json();

      if (data.isValid) {
        setCouponDiscount(data.discount);
        setOrder((prevOrder) => {
          if (!prevOrder) return prevOrder;

          return {
            ...prevOrder,
            couponDiscount: data.discount,
            couponId: couponCode,
            total: prevOrder.total - data.discount,
          };
        });
        setModalType('success');
        setModalMessage('Cupón aplicado con éxito!');
      } else {
        throw new Error('Cupón no válido');
      }
    } catch (error) {
      console.error('Error al aplicar el cupón:', error);
      setModalType('error');
      setModalMessage('Cupón no válido o expirado.');
    } finally {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
      <div className="mb-4">
        {order.productsInOrder.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span>Costos de entrega:</span>
          <span>$5.5</span>
        </div>
        <CouponInput onApplyCoupon={handleApplyCoupon} />
        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuento del cupón:</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-gray-300 pt-2 mt-2">
          <span className="font-bold">Total:</span>
          <span className="font-bold">
            ${(order.total +5.5)}
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          <div className="flex justify-between">
            <span>Dirección:</span>
            <span>{order.address.address}</span>
          </div>
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

      {selectedPaymentMethod === 'tarjeta' && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm handlePayment={handlePayment} />
        </Elements>
      )}

      {selectedPaymentMethod === 'efectivo' && (
        <button
          onClick={handlePayment}
          className="w-full bg-red-500 text-white text-center py-3 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        >
          Pagar ahora
        </button>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default Checkout;
