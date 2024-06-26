export default function CartButtons ({quantity, onIncrease, onDecrease} : {quantity:any, onIncrease: any, onDecrease:any}) {
  return(
      <div className="flex items-center justify-between">
          <button onClick= {onDecrease} className="bg-red-500 rounded-full p-2 ">-</button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button onClick= {onIncrease} className="bg-red-500 rounded-full p-2 ">+</button>
          <button className="bg-red-500 text-white rounded-lg px-4 py-2">Añadir al carrito</button>
      </div>
  );
}
