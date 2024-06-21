import Image from 'next/image';

export const Popular = () => {
  return (
    <div className="mb-4">
      <h2 className="text-xl text-yellow-400 font-bold mb-2">Popular</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-2 rounded-lg shadow">
          <Image src="/path-to-beef-burger.jpg" alt="Beef Burger" width={120} height={120} className="w-full h-24 object-cover rounded-lg mb-2" />
          <h3 className="font-bold">Beef Burger</h3>
          <p>$250</p>
        </div>
        <div className="bg-white p-2 rounded-lg shadow">
          <Image src="/path-to-pizza.jpg" alt="Pizza" width={120} height={120} className="w-full h-24 object-cover rounded-lg mb-2" />
          <h3 className="font-bold">Pizza</h3>
          <p>$350</p>
        </div>
      </div>
    </div>
  );
};