import Image from "next/image";
import { Product } from "@/types";
import { FaPlus } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}


const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 relative">
      <Image
        src={product.img}
        alt={product.name}
        width={120}
        height={120}
        className="w-full h-24 object-cover rounded-lg mb-2"
      />
      <h3 className="font-bold">{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button
        className="absolute bottom-2 right-2 bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 focus:outline-none"
        onClick={() => onAddToCart(product)}
      >
        <FaPlus />
      </button>
    </div>
  );
};
export default ProductCard;
