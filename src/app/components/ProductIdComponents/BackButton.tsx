'use client';
import {FC} from 'react';
import {HiArrowNarrowLeft} from 'react-icons/hi';


interface BackButtonProps {
  className?: string;
}

const BackButton: FC<BackButtonProps> = ({className}) => {

  const handleBack = () => {
    if(typeof window !== 'undefined'){
      window.history.back();
    }  
  };

  return (
    <button
    onClick= {handleBack}
    className={`flex items-center justify-center p-2 bg-white rounded-full hover: bg-red-100 focus:outline-none ${className}`}
      >
      <HiArrowNarrowLeft className="text-red-500 text-xl" />
      <span className="text-red-500 text-xl">Volver</span>
    </button>
  );
};

export default BackButton;