import Image from 'next/image';

export default function AddItem ({ src, label, price} : {src:any, label:any, price: number}) {
    return(
        <div className="flex items-center mb-2">
            <div className= "rounded- full border border-gray-200 p-1">
            <Image src={src} alt= {label} width= {40} height= {40}/>
            </div>
            <span className="ml-2">${price}</span>
        </div>
    );
}
