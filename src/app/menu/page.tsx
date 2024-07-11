'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar/searchBar';
import { getProducts } from '@/helpers/peticiones';
import ProductCard from '@/app/components/Cards/ProductCard';
import Pagination from '@/app/components/HomeComponents/Pagination';
import MenuFilters from '../components/MenuComponents/MenuFilter';
import { Product } from '@/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const PRODUCTS_PER_PAGE = 8;

interface Filters {
  filter?: number;
  search: string;
  min?: number;
  max?: number;
  appliedFilters: string[];
  price?: 'min' | 'max';
}

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    filter: undefined,
    search: '',
    min: undefined,
    max: undefined,
    appliedFilters: [],
  });
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(
          currentPage,
          PRODUCTS_PER_PAGE,
          filters,
        );
        setProducts(fetchedProducts);
        const totalPagesCount = Math.ceil(
          fetchedProducts.length / PRODUCTS_PER_PAGE,
        );
        setTotalPages(totalPagesCount || 1);
        setHasMore(fetchedProducts.length === PRODUCTS_PER_PAGE);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setHasMore(false);
      }
    };

    fetchProducts();
  }, [currentPage, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Añadir al carrito:', product);
  };

  const handleApplyFilters = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    setCurrentPage(1);
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() !== '') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchTerm.trim(),
      }));
      setCurrentPage(1);
    }
  };

  const removeSearchTerm = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: '',
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: string) => {
    let updatedFilters = [...selectedFilters];

    // Toggle selected filter
    if (updatedFilters.includes(filter)) {
      updatedFilters = updatedFilters.filter((f) => f !== filter);
    } else {
      updatedFilters.push(filter);
    }

    setSelectedFilters(updatedFilters);

    // Aplicar filtros sin incluir 'min' y 'max'
    const categoryFilters = updatedFilters.filter(
      (f) => f !== 'min' && f !== 'max',
    );

    const priceFilter = updatedFilters.includes('min')
      ? 'min'
      : updatedFilters.includes('max')
        ? 'max'
        : undefined;

    handleApplyFilters({ appliedFilters: categoryFilters, price: priceFilter });
  };

  return (
    <div className="p-4 md:p-6">
      <SearchBar onSearch={handleSearch} />
      {filters.search && (
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center">
            <span>{filters.search}</span>
            <button
              onClick={removeSearchTerm}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="md:flex w-full h-full">
        {/* Botón de filtros para móviles */}
        <button
          className="md:hidden w-full py-2 px-4 bg-gray-200 text-left flex justify-between items-center mb-4"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          Filtros
          {isFilterOpen ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>

        <div
          className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:w-1/4 p-4 border-b md:border-r border-gray-200 mb-4 md:mb-0`}
        >
          <MenuFilters
            applyFilters={handleApplyFilters}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />
        </div>

        {/* Contenedor de productos */}
        <div className="md:flex-grow md:p-4">
          {products.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No tenemos productos en esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  );
}
