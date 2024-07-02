import React, { useState } from 'react';

interface MenuFiltersProps {
  applyFilters: (
    newFilters: Partial<{ min?: number; max?: number; price?: 'min' | 'max' }>,
  ) => void;
  selectedFilters: string[];
  handleFilterChange: (filter: string) => void;
}

const MenuFilters: React.FC<MenuFiltersProps> = ({
  applyFilters,
  selectedFilters,
  handleFilterChange,
}) => {
  const filterOptions = [
    { value: '18', label: 'Vegetariana', category: 'Tipo de Comida' },
    { value: '16', label: 'Carnes', category: 'Tipo de Comida' },
    { value: '3', label: 'Entradas', category: 'Tipo de Comida' },
    { value: '6', label: 'Quesadillas', category: 'Tipo de Comida' },
    { value: '7', label: 'Tacos', category: 'Tipo de Comida' },
    { value: '14', label: 'Burritos', category: 'Tipo de Comida' },
    { value: '27', label: 'Papas', category: 'Tipo de Comida' },
    { value: '28', label: 'Ensaladas', category: 'Tipo de Comida' },
    { value: 'min', label: 'Menor precio', category: 'Precio' },
    { value: 'max', label: 'Mayor precio', category: 'Precio' },
    { value: '19', label: 'Con alcohol', category: 'Bebidas' },
    { value: '20', label: 'Sin alcohol', category: 'Bebidas' },
    { value: '25', label: 'Jugos', category: 'Bebidas' },
    { value: '24', label: 'Vinos', category: 'Bebidas' },
    { value: '22', label: 'Cervezas', category: 'Bebidas' },
    { value: '21', label: 'Gaseosas', category: 'Bebidas' },
  ];

  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newMinPrice = !isNaN(value) ? value : undefined;
    setMinPrice(newMinPrice);
    applyFilters({ min: newMinPrice, max: maxPrice, price: getPriceFilter() });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newMaxPrice = !isNaN(value) ? value : undefined;
    setMaxPrice(newMaxPrice);
    applyFilters({ min: minPrice, max: newMaxPrice, price: getPriceFilter() });
  };

  const getPriceFilter = () => {
    return selectedFilters.includes('min')
      ? 'min'
      : selectedFilters.includes('max')
        ? 'max'
        : undefined;
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
    </div>
  );
};

export default MenuFilters;
