import React, { useState } from 'react';

interface MenuFiltersProps {
  applyFilters: (newFilters: Partial<{ min?: number; max?: number }>) => void;
  selectedFilters: string[];
  handleFilterChange: (filter: string) => void;
  hasChanges: boolean;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  applyFilters,
  selectedFilters,
  handleFilterChange,
  hasChanges,
}) => {
  const filterOptions = [
    { value: 'vegetariana', label: 'Vegetariana', category: 'Tipo de Comida' },
    { value: 'carnes', label: 'Carnes', category: 'Tipo de Comida' },
    { value: 'menorprecio', label: 'Menor precio', category: 'Precio' },
    { value: 'mayorprecio', label: 'Mayor precio', category: 'Precio' },
    { value: 'ofertas', label: 'Ofertas', category: 'Precio' },
    { value: 'conalcohol', label: 'Con alcohol', category: 'Bebidas' },
    { value: 'sinalcohol', label: 'Sin alcohol', category: 'Bebidas' },
    { value: 'cervezas', label: 'Cervezas', category: 'Bebidas' },
    { value: 'Gaseosas', label: 'Gaseosas', category: 'Bebidas' },
  ];

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMinPrice(value);
    } else {
      setMinPrice(undefined); 
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setMaxPrice(value);
    } else {
      setMaxPrice(undefined); 
    }
  };

  const handleApplyFilters = () => {
    applyFilters({ min: minPrice, max: maxPrice });
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">Filtros</h2>
      <div className="space-y-2">
        {['Tipo de Comida', 'Precio', 'Bebidas'].map((category) => (
          <div key={category}>
            <p className="text-sm font-semibold">{category}:</p>
            {filterOptions
              .filter((option) => option.category === category)
              .map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedFilters.includes(option.value)}
                    onChange={() => handleFilterChange(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            {category === 'Precio' && (
              <div className="">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice ?? ''}
                  onChange={handleMinPriceChange}
                  className="border p-2 rounded mt-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice ?? ''}
                  onChange={handleMaxPriceChange}
                  className="border p-2 rounded mb-2"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {hasChanges && (
        <button
          onClick={handleApplyFilters}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Aplicar filtros
        </button>
      )}
    </div>
  );
};

export default MenuFilters;
