'use client';
import {FC} from 'react';
import ProductIDCard from "@/app/components/ProductIdComponents/ProductCardId";
import BackButton from '@/app/components/ProductIdComponents/BackButton';

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetail: FC<ProductDetailsProps> = ({params}) => {
  const {productId} = params;

    return(

        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <BackButton className= "self-start ml-4 mt-4" />
            <div className="flex flex-col items-center justify-center">
            <ProductIDCard params={{productId}}/>
            </div>
        </div>
    );
};

export default ProductDetail;