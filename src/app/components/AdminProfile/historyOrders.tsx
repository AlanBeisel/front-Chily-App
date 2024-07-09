'use client';

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
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
import { useQuery } from '@tanstack/react-query';

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
  status: 'En camino' | 'Pendiente' | 'En preparación' | 'Entregada';
  products: Product[];
}

const ITEMS_PER_PAGE = 5;

export function HistoryOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [totalOrders, setTotalOrders] = useState(0);

  const statusOptions = [
    { value: 'En camino', label: 'En camino' },
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En preparación', label: 'En preparación' },
    { value: 'Entregada', label: 'Entregada' },
  ];

  const handleSelectChange = (value: string) => {
    const filteredOrders = orders.filter((order) => order.status === value);
    setOrders(filteredOrders);
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
    const filteredOrders = orders.filter((order) =>
      order.email.toLowerCase().includes(query.toLowerCase()),
    );
    setOrders(filteredOrders);
  };

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

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
        `${process.env.NEXT_PUBLIC_API_URL}/orders/all-orders?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then((res) => res.json());

      return response;
    },
    queryKey: ['orders', currentPage],
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
      setTotalOrders(data?.total ? data.total : 1);
    }
  }, [data]);

  if (isLoading) return <div>Cargando órdenes...</div>;
  if (isError) return <div>Hubo un error, intenta nuevamente</div>;

  return (
    <div className="flex flex-col min-h-screen m-2">
      <div className="flex m-2 flex-row justify-between">
        <div className="m-2 p-2">
          <Select
            options={statusOptions}
            onChange={handleSelectChange}
            placeholder="Selecciona un estado"
          />
        </div>
        <div className="">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="">
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
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    className={
                      index + 1 === currentPage ? 'bg-red-500 text-white' : ''
                    }
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
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
      <Table>
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
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className={getStatusStyle(order.status)}>
                {order.status}
              </TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell className="text-right">
                <Button
                  className="bg-red-500"
                  onClick={() => detailOrderAdmin(order.id)}
                >
                  Ver Detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="">
              $
              {orders
                .reduce(
                  (total, order) => total + parseFloat(order.price.slice(1)),
                  0,
                )
                .toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
    </div>
  );
}
