import { AiOutlineSearch } from 'react-icons/ai';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Llamar a la función onSearch con el término de búsqueda
      onSearch(searchText);

      // Limpiar el input después de la búsqueda
      setSearchText('');

      // Redirigir a la ruta del menú sin parámetros de búsqueda en la URL
      router.push('/menu');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Buscar comidas, bebidas..."
        className="w-full p-2 pl-10 pr-4 rounded-full border border-gray-300"
        value={searchText}
        onChange={handleInputChange}
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
