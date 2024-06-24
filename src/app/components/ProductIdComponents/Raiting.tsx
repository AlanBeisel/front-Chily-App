export default function Rating ({value} : {value: number}) {
  return(
    <div className="flex items-center justify-center mb-2">
      <span className="text-yellow-500 text-xl">⭐</span>
      <span className="ml-2 text-xl font-semibold"> {value} </span> 
    </div>
  );
}