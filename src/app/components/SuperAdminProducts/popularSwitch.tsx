import React, {useEffect, useState} from 'react';
import { PopularProduct } from '@/helpers/peticionesSuperAdmin';

interface PopularProductSwitchProps {
  productId: string;
  isInitiallyPopular: boolean;
  onUpdatePopular: (isPopular: boolean) => void;
}

const PopularProductSwitch: React.FC<PopularProductSwitchProps> = ({productId, isInitiallyPopular, onUpdatePopular}) => {
  const [isPopular, setIsPopular] = useState<boolean>(isInitiallyPopular);

  useEffect(() =>{
    setIsPopular(isInitiallyPopular);
  },[isInitiallyPopular]);

  const handlePopularSwitch = async () => {
    try{
      const updateIsPopular = !isPopular;
      setIsPopular(updateIsPopular);
      await PopularProduct(productId, updateIsPopular);
      onUpdatePopular(updateIsPopular);
    } catch (error) {
      console.error('Error al cambiar la popularidad del producto', error);
      setIsPopular(!isPopular);
    }
  };

  return(
    <div className="flex items-center">
      <label htmlFor={`product-popular-${productId}`} className="cursor-pointer">
        <input
        id={`product-popular-${productId}`}
        type="checkbox"
        checked={isPopular}
        onChange={handlePopularSwitch}
        className="hidden"
      />
      <div className={`${isPopular ? 'bg-green-400' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}>
            <span className="sr-only">Marcar como popular</span>
            <span
            aria-hidden="true"
            className={`${isPopular ? 'translate-x-5' : 'translate-x-0'}
              pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
          />
          </div>
      </label>
      <span className="ml-2">{isPopular ? 'Popular' : 'No popular'}</span>
    </div>
  );
};

export default PopularProductSwitch;