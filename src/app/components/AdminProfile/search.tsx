import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchValue?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchValue = '',
}) => {
  const [query, setQuery] = useState(searchValue);

  useEffect(() => {
    setQuery(searchValue);
  }, [searchValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form
      className="flex flex-wrap"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        type="text"
        placeholder="Buscar por email"
        value={query}
        onChange={handleInputChange}
        className="border pl-2 border-gray-300 rounded-md "
      />
      <Button
        type="submit"
        className="bg-white hover:bg-gray-300 text-black border-2 border-gray-400 rounded-md m-2"
      >
        Buscar
      </Button>
      <Button
        onClick={handleClear}
        className="bg-white text-black border-2 border-gray-400 rounded-md m-2 hover:bg-gray-300"
      >
        Limpiar filtros
      </Button>
    </form>
  );
};
