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

        <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
            <BackButton className= "self-start ml-4 mt-4" />
            <div className="mt-4">
            <ProductIDCard params={{productId}}/>
            </div>
        </div>
    );
};

export default ProductDetail;