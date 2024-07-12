import React, { useState } from 'react';
import { Button } from '../ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchValue,
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <form
      className="flex flex-wrap"
      onSubmit={(e) => {
        e.preventDefault;
      }}
    >
      <input
        type="text"
        placeholder="Buscar por email"
        value={query || searchValue}
        onChange={handleInputChange}
        className="border pl-2 border-gray-300 rounded-md "
      />
      <Button
        type="submit"
        onClick={handleSearch}
        className="bg-white hover:bg-gray-300 text-black border-2 border-gray-400  rounded-md  m-2"
      >
        Buscar
      </Button>

      <Button
        onClick={handleSearch}
        className="bg-white text-black border-2 border-gray-400  rounded-md m-2 hover:bg-gray-300"
      >
        Limpiar filtros
      </Button>
    </form>
  );
};
