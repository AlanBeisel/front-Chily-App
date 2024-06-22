import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = () => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Buscar comidas, bebidas..."
        className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300"
      />
      <AiOutlineSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};
