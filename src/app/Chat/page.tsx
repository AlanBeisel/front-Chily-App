// vista de prueba, org como mostrar.

"use client"
import TestChat, { mockArr } from '../components/Chat/TestChat';
// import RouteGuard from '@/helpers/routeGuard';
import React from 'react';


const CheckoutPage: React.FC = () => {


  return (
    <>
    
      <TestChat orders={mockArr}/>
    </>
  );
};

export default CheckoutPage;