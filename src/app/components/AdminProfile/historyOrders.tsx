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

const hardcodedOrders: Order[] = [
  {
    id: '1',
    price: '$22.50',
    date: '2024-01-01',
    email: 'ejemplo1@gmail.com',
    status: 'Pendiente',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$5.00' },
      { name: 'Papas fritas', quantity: 2, price: '$7.50' },
    ],
  },
  {
    id: '2',
    price: '$16.00',
    date: '2024-08-02',
    email: 'ejemplo2@hotmail.com',
    status: 'Pendiente',
    products: [
      { name: 'Pizza', quantity: 1, price: '$12.00' },
      { name: 'Refresco', quantity: 1, price: '$4.00' },
    ],
  },
  {
    id: '3',
    price: '$10.00',
    date: '2024-07-03',
    email: 'ejemplo3@yahoo.com',
    status: 'Pendiente',
    products: [
      { name: 'Tacos', quantity: 1, price: '$8.00' },
      { name: 'Agua', quantity: 1, price: '$2.00' },
    ],
  },
  {
    id: '4',
    price: '$18.00',
    date: '2024-07-04',
    email: 'ejemplo4@gmail.com',
    status: 'En camino',
    products: [
      { name: 'Sushi', quantity: 1, price: '$15.00' },
      { name: 'Té verde', quantity: 1, price: '$3.00' },
    ],
  },
  {
    id: '5',
    price: '$14.50',
    date: '2024-07-05',
    email: 'ejemplo5@hotmail.com',
    status: 'En camino',
    products: [
      { name: 'Ensalada', quantity: 1, price: '$10.00' },
      { name: 'Jugo', quantity: 1, price: '$4.50' },
    ],
  },
  {
    id: '6',
    price: '$14.00',
    date: '2024-07-06',
    email: 'ejemplo6@gmail.com',
    status: 'En camino',
    products: [
      { name: 'Burrito', quantity: 1, price: '$9.00' },
      { name: 'Cerveza', quantity: 1, price: '$5.00' },
    ],
  },
  {
    id: '7',
    price: '$10.50',
    date: '2024-07-07',
    email: 'ejemplo7@yahoo.com',
    status: 'En preparación',
    products: [
      { name: 'Sándwich', quantity: 1, price: '$8.00' },
      { name: 'Café', quantity: 1, price: '$2.50' },
    ],
  },
  {
    id: '8',
    price: '$30.00',
    date: '2024-07-01',
    email: 'ejemplo8@gmail.com',
    status: 'En preparación',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '9',
    price: '$30.00',
    date: '2024-07-01',
    email: 'ejemplo9@hotmail.com',
    status: 'En preparación',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '10',
    price: '$30.00',
    date: '2024-07-01',
    email: 'ejemplo10@gmail.com',
    status: 'En preparación',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '11',
    price: '$30.00',
    date: '2024-07-01',
    email: 'ejemplo11@yahoo.com',
    status: 'Entregada',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '12',
    price: '$30.00',
    date: '2024-07-01',
    email: 'ejemplo12@gmail.com',
    status: 'Entregada',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '13',
    price: '$30.00',
    date: '2024-06-01',
    email: 'ejemplo13@hotmail.com',
    status: 'Entregada',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '14',
    price: '$30.00',
    date: '2024-08-01',
    email: 'ejemplo14@gmail.com',
    status: 'Pendiente',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '15',
    price: '$30.00',
    date: '2024-08-01',
    email: 'ejemplo15@hotmail.com',
    status: 'Pendiente',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
  {
    id: '16',
    price: '$30.00',
    date: '2024-08-01',
    email: 'ejemplo16@yahoo.com',
    status: 'Pendiente',
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
];

export function HistoryOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const statusOptions = [
    { value: 'En camino', label: 'En camino' },
    { value: 'Pendiente', label: 'Pendiente' },
    { value: 'En preparación', label: 'En preparación' },
    { value: 'Entregada', label: 'Entregada' },
  ];

  useEffect(() => {
    const sortedOrders = [...hardcodedOrders].sort(
      (a, b) => parseInt(b.id) - parseInt(a.id),
    );
    setOrders(sortedOrders);
  }, []);

  const handleSelectChange = (value: string) => {
    const filteredOrders = hardcodedOrders.filter(
      (order) => order.status === value,
    );
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
    const filteredOrders = hardcodedOrders.filter((order) =>
      order.email.toLowerCase().includes(query.toLowerCase()),
    );
    setOrders(filteredOrders);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

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

  return (
    <div className="flex flex-col min-h-screen m-2">
      <div className="flex m-2 flex-row justify-between ">
        <div className="m-2 p-2">
          {' '}
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
                    href="#"
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                ) : (
                  <button disabled>Anterior</button>
                )}
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
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
                    href="#"
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
            <TableHead>correo electronico</TableHead>
            <TableHead className="text-right">Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedOrders.map((order) => (
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
              {selectedOrders
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
