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
      className="flex"
      onSubmit={(e) => {
        e.preventDefault;
      }}
    >
      <input
        type="text"
        placeholder="Buscar por email"
        value={query || searchValue}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md focus:outline-none "
      />
      <Button
        type="submit"
        onClick={handleSearch}
        className="bg-red-500 text-white  rounded-md"
      >
        Buscar
      </Button>
      <Button
        onClick={handleSearch}
        className="bg-red-500 text-white  rounded-md"
      >
        Reiniciar
      </Button>
    </form>
  );
};
