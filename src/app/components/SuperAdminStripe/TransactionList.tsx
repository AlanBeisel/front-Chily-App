'use client'
import React, {useEffect, useState} from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { fetchTransactionInfo, TransactionResponse } from '@/helpers/peticionesSuperAdmin';
import BackButton from '../ProductIdComponents/BackButton';

export interface TransactionInfo {
  id: string,
  amount: number,
  currency: string,
  status: string,
  created: string,
  card_brand: string,
}

const TransactionInfoPage: React.FC =  () => {
  const [transactions, setTransactions] = useState<TransactionInfo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [date, setDate] = useState<string | undefined> (undefined);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null> (null);

  const {accessToken} = useAuth();
  const token = accessToken;

  useEffect(() => {
    const fetchTransactions = async () => {
      try{
        if(token) {
          console.log('Token válido:', token);
        const data: TransactionResponse = await fetchTransactionInfo(token, page, limit, date,amount ? parseFloat(amount) : undefined);
        console.log('Datos de transacciones recibidos:', data);
        setTransactions(data.orders);
        }else {
          throw new Error('Token no válido');
        }
      } catch (error:any) {
        console.error('Error al obtener transacciones:', error);
        setError(error.message);
      }
    };

    fetchTransactions();
  },[token, page, limit, date, amount]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };


  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(',','.');
    setAmount(value);
  };

  const handleClearFilters = () => {
    setDate(undefined);
    setAmount(undefined);
  }

  return(
    <div className="flex flex-col min-h-screen container mx-auto px-4 w-full mt-8">
      <div className="flex justify-between items-center mb-4">
      <BackButton className="mr-4"/>
      <h2 className="text-2xl font-bold text-red-500">Transacciones</h2>
      <div className="flex items-center">
      <div className="mr-4">
        <label className="mr-2 text-gray-600 font-light text-md">
          FECHA:
          </label> 
          <input type="date" value= {date ?? ''} onChange={handleDateChange} className="border border-gray-300 px-2 py-1 rounded-md w-36"/>
          </div>
          <div>
        <label className="mr-2 text-gray-600 font-light text-md">
          MONTO:
        </label>
        <input type="number" value={amount ?? ''} onChange={handleAmountChange} className="border border-gray-300 px-2 py-1 rounded-md w-36"/>
        </div>
        <button
        onClick ={handleClearFilters}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded">
          Limpiar filtros
        </button>
        </div>
      </div>
    {error && <div style = {{ color: 'red'}}>{error}</div>}
    <div className="mx-auto flex-grow max-w-4xl">
      {transactions.length > 0 ? (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden my-6">
      <thead className="bg-white text-gray-600 uppercase text-sm leading-normal">
        <tr>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">ID</th>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Cantidad</th>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Moneda</th>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Estado</th>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Creado</th>
          <th className="px-6 py-3 text-gray-600 font-light text-md uppercase tracking-wide">Tarjeta</th>
          </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {transactions.map((transaction, index) => (
          <tr key= {transaction.id} className="border-b border-gray-200 hover: bg-white">
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.id}</td>
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.amount}</td>
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.currency}</td>
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.status}</td>
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.created}</td>
            <td className={`border-t ${index === 0 ? 'border-b' : ''} px-4 py-2 space-x-2`}>{transaction.card_brand}</td>
          </tr>
        ))}
      </tbody>
    </table>
      ):(
        <div className="text-center text-gray-400 py-4"> No hay transacciones que coincidan con los filtros.</div>
      )}
    </div>
    <div className="mt-auto flex justify-center items-center mb-8">
        <button
        onClick={() => setPage(page - 1)}
        disabled= {page === 1}
        className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
        >
          Anterior
        </button>
        <button
        onClick={() => setPage(page + 1)}
        disabled= {transactions.length < limit}
        className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default TransactionInfoPage;
