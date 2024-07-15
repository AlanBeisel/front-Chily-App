// vista de prueba, org como mostrar.

"use client"
import ChatBox from '../components/Chat/ChatBox';
import ChatWindow from '../components/Chat/UserChat';
import AdminChat from '../components/Chat/AdminChat';
import RouteGuard from '@/helpers/routeGuard';
import React from 'react';


const CheckoutPage: React.FC = () => {


  return (
    <>
    <RouteGuard allowedRoles={['user']}>
      <AdminChat/>
      <ChatWindow orderId={0}/>
      <ChatBox/>
    </RouteGuard>
    </>
  );
};

export default CheckoutPage;