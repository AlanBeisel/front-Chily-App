'use client'
import {FC} from 'react';
import ProductIDCard from "@/app/components/ProductIdComponents/ProductCardId";

interface ProductDetailsProps {
  params: {
    productId: string;
  };
}

const ProductDetail: FC<ProductDetailsProps> = ({params}) => {
  const {productId} = params;

    return(

        <div className="flex items-center justify-center min-h-screen bg-white">
            <ProductIDCard params={{productId}} />
        </div>
    );
};

export default ProductDetail;