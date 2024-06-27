import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { FaPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 relative">
        <Image
          src={product.img}
          alt={product.name}
          width={240}
          height={240}
          className="w-full h-32 sm:h-40 md:h-48 lg:h-56 object-cover rounded-lg mb-2"
        />
        <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
          {product.name}
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          ${product.price.toFixed(2)}
        </p>
        <button
          className="absolute bottom-2 right-2 bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
        >
          <FaPlus />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
