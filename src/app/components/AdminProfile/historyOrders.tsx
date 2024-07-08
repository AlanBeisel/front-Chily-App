'use client';
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

const orders = [
  {
    id: 'ORD001',
    date: '2024-07-01',
    price: '$250.00',
  },
  {
    id: 'ORD002',
    date: '2024-07-02',
    price: '$150.00',
  },
  {
    id: 'ORD003',
    date: '2024-07-03',
    price: '$350.00',
  },
  {
    id: 'ORD004',
    date: '2024-07-04',
    price: '$450.00',
  },
  {
    id: 'ORD005',
    date: '2024-07-05',
    price: '$550.00',
  },
  {
    id: 'ORD006',
    date: '2024-07-06',
    price: '$200.00',
  },
  {
    id: 'ORD007',
    date: '2024-07-07',
    price: '$300.00',
  },
];

export function HistoryOrders() {
  const handleViewDetail = (id: any) => {
    // Lógica para manejar la vista de detalles
    console.log(`Ver detalle de la orden ${id}`);
  };

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell className="text-right">
              <Button onClick={() => handleViewDetail(order.id)}>
                Ver Detalle
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
