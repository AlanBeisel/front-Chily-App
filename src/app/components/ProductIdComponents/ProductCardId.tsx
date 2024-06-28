'use client'
import Image from 'next/image';
import Rating from './Raiting';
import PriceTag from './PriceTag';
import AddItem from './AddItem';
import CartButtons from './CartButtons';
import {useState, useEffect} from 'react';
import { getProductById } from '@/helpers/peticiones';
import { Product } from '@/types';
import { useAuth } from '@/app/contexts/AuthContext';


interface ProductIDCardProps{
  params: {
    productId:string;
  };
}


const ProductIDCard: React.FC<ProductIDCardProps> = ({params}) => {  
const [quantity, setQuantity]= useState(1);
const [product, setProduct] = useState<Product | null> (null);
const {isAuthenticated} = useAuth();

useEffect(() => {
  const fetchData = async () => {
  try{
    const productData = await getProductById(params.productId);
    console.log('Product Data', productData)
    setProduct(productData);
  } catch (error) {
    console.error('Error fetching product data', error);
  }
};

fetchData();

}, [params.productId]);

const handleIncrease = () => {
    setQuantity (quantity +1);
};

const handleDecrease = () => {
   setQuantity(Math.max(quantity -1, 1));
};

const addToCart = () => {
  if (!isAuthenticated) {
    alert('Debes iniciar sesión para agregar productos al carrito');
    return;
  }

const existCart = JSON.parse(localStorage.getItem('cartItem') || '[]') as Product [];
const updateCart = existCart.some((item) => item.id === product?.id)
? existCart.map((item) => (item.id === product?.id ? {...item, quantity: quantity} : item))
: [...existCart, {...product, quantity}];

localStorage.setItem('cartItem', JSON.stringify(updateCart));
alert ('Producto añadido al carrito');

};

if (!product) {
  return<div> Cargando...</div>
}


return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-5">
        <Image
         src={product.img}
         alt= {product.name}
         width= {300}
         height={200}
         className="w-full h-auto rounded-md mb-4"
         />
         <div className="flex justify-between items-center mb-4">
          <Rating value={4.8}/>
          <PriceTag price={product.price} />
         </div>
         <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
         <p className="text-gray-600 text-sm mb-4">{product.description}</p>
         <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Ons</h3>
            <div className="flex space-x-4">
            <AddItem src="/bebidas.png" label= "cheese" price={9}/>
            <AddItem src="/papas.png" label= "sauce" price={9}/>
            <AddItem src="/burger.png" label= "pepperoni" price={9}/>
            </div>
         </div>
         <CartButtons
           quantity={quantity}
           onIncrease={handleIncrease}
           onDecrease={handleDecrease}
           addToCart = {addToCart}
          />
    </div>
);
}

export default ProductIDCard;