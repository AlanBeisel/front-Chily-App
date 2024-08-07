'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { OrderDetailModal } from './detailOrderAdmin';
import Select from './select';
import { SearchBar } from './search';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface Product {
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  price: string;
  date: string;
  email: string;
  formBuy: string;
  orderInstructions: string;
  status:
    | 'En camino'
    | 'Pendiente'
    | 'En preparación'
    | 'Entregada'
    | 'Confirmada';
  products: Product[];
}

const ITEMS_PER_PAGE = 5;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-CA');
};

export function HistoryOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false); // Estado para manejar sin resultados
  const queryClient = useQueryClient();

  const statusOptions = [
    { value: 'En camino', label: 'En camino' },
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En preparación', label: 'En preparación' },
    { value: 'Entregada', label: 'Entregada' },
    { value: 'Confirmada', label: 'Confirmada' },
  ];

  const handleSelectChange = (value: string) => {
    const filtered = orders.filter((order) => order.status === value);
    setFilteredOrders(filtered);
    setNoResults(filtered.length === 0);
  };

  const handleStatusEditChange = async (value: string, id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/update`, {
      method: 'PUT',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: parseInt(id),
        status: value,
      }),
    })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['orders'] });
      })
      .catch((e) => console.error(e));
  };

  const detailOrderAdmin = (orderId: string) => {
    const order = orders.find((order) => order.id === orderId);
    setSelectedOrder(order || null);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'En camino':
        return 'text-blue-500';
      case 'Pendiente':
        return 'text-yellow-500';
      case 'En preparación':
        return 'text-orange-500';
      case 'Entregada':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/all-orders?page=${currentPage}&limit=${ITEMS_PER_PAGE}&email=${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.json());

      console.log("esto llega", response)
      return response;
    },
    queryKey: ['orders', currentPage, searchQuery],

    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setOrders(data.orders);
      setFilteredOrders(data.orders);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setNoResults(data.orders.length === 0);
    }
  }, [data]);

  if (isLoading) return <div className="min-h-screen">Cargando órdenes...</div>;
  if (isError)
    return (
      <div className="min-h-screen">Hubo un error, intenta nuevamente</div>
    );

  return (
    <div className="flex flex-col min-h-screen m-2">
      <div className="flex flex-wrap md:flex-row m-2 justify-between">
        <div className="m-2 p-2">
          <Select
            options={statusOptions}
            onChange={handleSelectChange}
            placeholder="Selecciona un estado"
          />
        </div>
        <div className="m-2 p-2">
          <SearchBar onSearch={handleSearch} searchValue={searchQuery} />
        </div>
      </div>
      <div className="overflow-x-auto">
        {noResults ? (
          <div className="text-red-600 text-center my-4">
            <pre>
              {' '}
              No se han encontrado resultados para tu búsqueda. Asegúrate de que
              todas las palabras estén escritas correctamente.
            </pre>
          </div>
        ) : (
          <Table className="min-w-full">
            <TableCaption>Historial de órdenes</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#ID</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Correo electrónico</TableHead>
                <TableHead className="text-right">Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell className={getStatusStyle(order.status)}>
                    <Select
                      options={statusOptions}
                      onChange={(e) => handleStatusEditChange(e, order.id)}
                      placeholder={order.status}
                    />
                  </TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell className="text-right">
                    {order?.products?.length > 0 && (
                      <Button
                        className="bg-red-500 hover:bg-gray-500"
                        onClick={() => detailOrderAdmin(order.id)}
                      >
                        Ver Detalle
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="m-2 p-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 1 ? (
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                ) : (
                  <button disabled>Anterior</button>
                )}
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => {
                if (currentPage - 3 <= index && index < currentPage + 2)
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        className={
                          index + 1 === currentPage
                            ? 'bg-red-500 text-white'
                            : ''
                        }
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                return null;
              })}
              <PaginationItem>
                {currentPage < totalPages ? (
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                ) : (
                  <button disabled>Siguiente</button>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
    </div>
  );
}
