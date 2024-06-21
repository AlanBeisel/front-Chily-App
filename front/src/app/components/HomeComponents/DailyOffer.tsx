import Image from 'next/image';

export const DailyOffer = () => {
    return (
    <div className="bg-red-400 rounded-lg p-4 mb-4 flex items-center justify-between">
    <div>
        <h3 className="text-lg text-yellow-400 font-bold">Ofertas del dia</h3>
        <p>Free soft drink</p>
        <p>On all orders above $199</p>
    </div>
    <Image src="/path-to-burger-image.jpg" alt="Burger" width={80} height={80} className="rounded-full" />
    </div>
);
};