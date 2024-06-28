
import React from 'react';

interface FiltersProps {
  onFilterChange: (filters: string[]) => void; 
}

const MenuFilters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState<string[]>([]);

  // Función para manejar el cambio en los filtros
  const handleFilterChange = (filter: string) => {
    if (filters.includes(filter)) {
      setFilters(filters.filter((f) => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }

    onFilterChange([...filters, filter]);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">Filtros</h2>
      <div className="space-y-2">
        <p className="text-sm font-semibold">Tipo de Comida:</p>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="vegetariana"
            checked={filters.includes('vegetariana')}
            onChange={() => handleFilterChange('vegetariana')}
            className="mr-2"
          />
          Vegetariana
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="carnes"
            checked={filters.includes('carnes')}
            onChange={() => handleFilterChange('carnes')}
            className="mr-2"
          />
          Carnes
        </label>
        <p className="text-sm font-semibold">Precio</p>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="precio"
            checked={filters.includes('menorprecio')}
            onChange={() => handleFilterChange('menorprecio')}
            className="mr-2"
          />
          Menor precio
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="mayorprecio"
            checked={filters.includes('mayorprecio')}
            onChange={() => handleFilterChange('mayorprecio')}
            className="mr-2"
          />
          Mayor precio
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="ofertas"
            checked={filters.includes('ofertas')}
            onChange={() => handleFilterChange('ofertas')}
            className="mr-2"
          />
          Ofertas
        </label>
        <p className="text-sm font-semibold">Bebidas</p>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="conalcohol"
            checked={filters.includes('conalcohol')}
            onChange={() => handleFilterChange('conalcohol')}
            className="mr-2"
          />
          Con alcohol
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="sinalcohol"
            checked={filters.includes('sinalcohol')}
            onChange={() => handleFilterChange('sinalcohol')}
            className="mr-2"
          />
          Sin alcohol
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="cervezas"
            checked={filters.includes('cervezas')}
            onChange={() => handleFilterChange('cervezas')}
            className="mr-2"
          />
          Cervezas
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="Gaseosas"
            checked={filters.includes('Gaseosas')}
            onChange={() => handleFilterChange('Gaseosas')}
            className="mr-2"
          />
          Gaseosas
        </label>
      </div>
    </div>
  );
};

export default MenuFilters;
