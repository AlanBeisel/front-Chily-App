import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasMore,
}) => {
  return (
    <div className="pagination flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Anterior
      </button>

      <span className="text-gray-700">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className={`px-3 py-1 bg-gray-200 rounded ${!hasMore ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
