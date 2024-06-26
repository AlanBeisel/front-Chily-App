import { AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Redirigir a la ruta del menú con searchText como appliedFilters
      router.push(`/menu?filters=${searchText}`);
    }
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Buscar comidas, bebidas..."
        className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300"
       value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={handleSearch}
      />
      <AiOutlineSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchBar;