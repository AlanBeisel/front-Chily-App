import React, { useState } from 'react';
import { Button } from '../ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex ">
      <input
        type="text"
        placeholder="Buscar por email"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md focus:outline-none "
      />
      <Button
        onClick={handleSearch}
        className="bg-red-500 text-white  rounded-md"
      >
        Buscar
      </Button>
    </div>
  );
};
