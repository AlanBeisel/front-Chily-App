"use client"
import Checkout from '@/app/components/Checkout/Checkout';
import RouteGuard from '@/helpers/routeGuard';
import React from 'react';


const CheckoutPage: React.FC = () => {


  return (
    <>
    <RouteGuard allowedRoles={['user']}>
      <Checkout/>
    </RouteGuard>
    </>
  );
};

export default CheckoutPage;

