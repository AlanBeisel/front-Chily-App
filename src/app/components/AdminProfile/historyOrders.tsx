'use client';
import React, { useState } from 'react';
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

interface Product {
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  price: string;
  date: string;
  products: Product[];
}

const ITEMS_PER_PAGE = 5;

const hardcodedOrders: Order[] = [
  {
    id: '1',
    price: '$22.50',
    date: '2024-01-01',
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
    products: [
      { name: 'Pizza', quantity: 1, price: '$12.00' },
      { name: 'Refresco', quantity: 1, price: '$4.00' },
    ],
  },
  {
    id: '3',
    price: '$10.00',
    date: '2024-07-03',
    products: [
      { name: 'Tacos', quantity: 1, price: '$8.00' },
      { name: 'Agua', quantity: 1, price: '$2.00' },
    ],
  },
  {
    id: '4',
    price: '$18.00',
    date: '2024-07-04',
    products: [
      { name: 'Sushi', quantity: 1, price: '$15.00' },
      { name: 'Té verde', quantity: 1, price: '$3.00' },
    ],
  },
  {
    id: '5',
    price: '$14.50',
    date: '2024-07-05',
    products: [
      { name: 'Ensalada', quantity: 1, price: '$10.00' },
      { name: 'Jugo', quantity: 1, price: '$4.50' },
    ],
  },
  {
    id: '6',
    price: '$14.00',
    date: '2024-07-06',
    products: [
      { name: 'Burrito', quantity: 1, price: '$9.00' },
      { name: 'Cerveza', quantity: 1, price: '$5.00' },
    ],
  },
  {
    id: '7',
    price: '$10.50',
    date: '2024-07-07',
    products: [
      { name: 'Sándwich', quantity: 1, price: '$8.00' },
      { name: 'Café', quantity: 1, price: '$2.50' },
    ],
  },
  {
    id: '8',
    price: '$30.00',
    date: '2024-07-01',
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
    products: [
      { name: 'Hamburguesa', quantity: 1, price: '$10.00' },
      { name: 'Refresco', quantity: 1, price: '$10.00' },
      { name: 'Papas fritas', quantity: 1, price: '$10.00' },
    ],
  },
];

export function HistoryOrders() {
  const [orders, setOrders] = useState<Order[]>(hardcodedOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
  const filterOrdersLast24Hours = () => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const filteredOrders = hardcodedOrders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= twentyFourHoursAgo;
    });
    setOrders(filteredOrders);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Button className="bg-red-500" onClick={filterOrdersLast24Hours}>
          Ver órdenes de las últimas 24 horas
        </Button>
      </div>
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

      <Table>
        <TableCaption>Historial de órdenes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-right">Detalles</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.price}</TableCell>
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
            <TableCell className="text-right">
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
