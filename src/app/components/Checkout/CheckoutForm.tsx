import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import CustomModal from './modals';

interface CheckoutFormProps {
  handlePayment: (success: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ handlePayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // return_url: 'http://localhost:3000',
        },
        redirect: 'if_required',
      });

      if (result.error) {
        console.error(result.error.message);
        setModalType('error');
        setModalMessage('Algo falló en el pago.');
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          router.push('/checkout');
        }, 3000);
      } else {
        handlePayment(true);
        setModalType('success');
        setModalMessage('Pedido realizado con éxito!');
        setIsModalOpen(true);
        setTimeout(() => {
          setIsModalOpen(false);
          router.push('/');
        }, 4000);
      }
    } catch (error) {
      console.error('Error al confirmar el pago:', error);
      handlePayment(false);
      setModalType('error');
      setModalMessage('Algo falló en el pago.');
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        router.push('/checkout');
      }, 3000);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-red-500 text-white text-center py-3 rounded-lg hover:bg-red-600 transition duration-300 mt-4"
        >
          Pagar ahora
        </button>
      </form>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        type={modalType}
      />
    </>
  );
};

export default CheckoutForm;
