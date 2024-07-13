'use client';
import Image from 'next/image';
import PriceTag from './PriceTag';
import CartButtons from './CartButtons';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getProductById } from '@/helpers/peticiones';
import { Product } from '@/types';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProductIDCardProps {
  params: {
    productId: string;
  };
}

const ProductIDCard: React.FC<ProductIDCardProps> = ({ params }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(params.productId);
        console.log('Product Data', productData);
        setProduct(productData);

        const storedCart = localStorage.getItem('cartItems');
        const cartItems = storedCart ? JSON.parse(storedCart) : [];
        const existingItem = cartItems.find(
          (item: any) => item.id === productData.id,
        );
        if (existingItem) {
          setQuantity(existingItem.quantity);
        }
      } catch (error) {
        toast.error('Error al cargar los datos del producto.');
      }
    };

    fetchData();
  }, [params.productId]);

  const handleIncrease = () => {
    if (product && product.stock !== undefined && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.warn('No hay suficiente stock disponible.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleDecrease = () => {
    setQuantity(Math.max(quantity - 1, 1));
  };

  const addToCart = () => {
    if (!isAuthenticated) {
      toast.warn('Debes iniciar sesión para agregar productos al carrito.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const storedCart = localStorage.getItem('cartItems');
    const existCart = storedCart ? JSON.parse(storedCart) : [];

    const updateCart = existCart.some(
      (item: Product) => item.id === product?.id,
    )
      ? existCart.map((item: Product) =>
          item.id === product?.id ? { ...item, quantity: quantity } : item,
        )
      : [...existCart, { ...product, quantity }];

    localStorage.setItem('cartItems', JSON.stringify(updateCart));
    toast.success('Producto añadido al carrito.', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!product) {
    return <div className="text-center py-10">Cargando...</div>;
  }

  if (product.stock <= 0) {
    return (
      <div className="text-center py-10">
        <p>Producto no disponible.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 bg-white rounded-lg shadow-md p-12 lg:max-w-6xl mx-auto h-auto lg:h-full">
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:max-w-md h-auto lg:h-full">
        <Image
          src={product.img}
          alt={product.name}
          width={1200}
          height={1000}
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="flex flex-col justify-between w-full lg:w-auto p-6">
        <div className="mb-4 lg:mb-0 flex flex-col items-start">
          <PriceTag price={product.price} />
          <h2 className="text-2xl font-bold mb-1 lg:mb-2">{product.name}</h2>
          <p className="text-gray-600 text-sm mb-2 lg:mb-4">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start lg:mb-0 mr-4 mb-4">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl">
            Stock : {product.stock}
          </p>
          <CartButtons
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            addToCart={addToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductIDCard;
