'use client';
import Image from 'next/image';

interface CardProps {
  image: string;
  name: string;
  price: number;
  orderId: string;
  status: string;
}

const OrderCard: React.FC<CardProps> = ({
  image,
  name,
  price,
  orderId,
  status,
}) => {
  return (
    <div className="flex flex-col text-sm font-normal leading-6 text-left border p-[16px] my-4 text-white rounded-lg bg-red-400">
      <div className="flex flex-row justify-between w-full mb-4">
        <div className="flex flex-col p-2">
          <h3 className="text-xl font-bold mb-1">Order #{orderId}</h3>
          <p className="mb-2">Total: ${price}</p>
          <p className="mb-2">Status: {status}</p>
        </div>
        <div className="flex flex-row p-2">
          <Image src={'/burger.png'} alt={name} width={80} height={70} />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <hr className="border-t-2 border-white mb-2" />
        <button className="underline">View details</button>
      </div>
    </div>
  );
};

export default OrderCard;
