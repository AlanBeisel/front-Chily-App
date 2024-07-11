'use client'
import React from "react";
import ChangePasswordForm from "../components/ProfileComponents/changePasswordForm";
import { useAuth } from "../contexts/AuthContext";

const ChangePasswordPage: React.FC=()=>{
  const {user} = useAuth();

  return(
    <div className="flex flex-col min-h-screen w-full bg-red-500 items-center justify-start rounded-xl text-white font-semibold pt-[64px]">
      <h1 className="text-[40px]">Cambiar contraseña</h1>
      <ChangePasswordForm token={user?.credential.id ?? ''}/>
    </div>
  ); 
};

export default ChangePasswordPage;