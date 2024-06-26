export default function PriceTag ({price} : {price: number}) {
  return (
    <div className="text-2xl text-red-500 font-bold mb-4">
      ${price}
    </div>
  );
}