'use client';
import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '@/helpers/peticionesSuperAdmin';
import ConfirmModal from './confirmModal';
import { Product } from '@/types';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useAuth } from '@/app/contexts/AuthContext';
import { HiOutlineTrash } from 'react-icons/hi';

const PAGE_SIZE = 10;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {accessToken} = useAuth();
  const token = accessToken;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      const productsData = await fetchProducts();
      const slicedProducts = productsData.slice(startIndex, endIndex);
      setProducts(slicedProducts);
      setTotalPages(Math.ceil(productsData.length / PAGE_SIZE));
    } catch (error) {
      console.error('Error al obtener los productos', error);
    } finally {
      setLoading(false);
      closeModal();
      setProductToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    closeModal();

    if (!token) {
      console.error('Token no disponible');
      toast.error('Token no disponible', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      await deleteProduct(productToDelete, token);
      setProducts(products.filter((product) => product.id !== productToDelete));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar el producto', error);
      toast.error('Error al eliminar el producto', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (products.length === 0) return <div>No hay productos disponibles.</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-500">Productos</h2>
        <Link href="/superadmin/products/create">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Crear Producto
          </button>
        </Link>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-600 font-light text-md">Producto</th>
            <th className="px-4 py-2 text-gray-600 font-light text-md">Categoría</th>
            <th className="px-4 py-2 text-gray-600 font-light text-md">Precio</th>
            <th className="px-4 py-2 text-gray-600 font-light text-md">Gestión</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">
                {Array.isArray(product.category)
                  ? product.category.map((cat: any) => cat.name).join(',')
                  : product.category}
              </td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                  <Link
                    href={`/superadmin/products/edit/${product.id.toString()}`}
                  >
                    Editar
                  </Link>
                </button>
                <button
                  onClick={() => openDeleteModal(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                   <HiOutlineTrash className="text-4xl"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
        >
          Anterior
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded mr-2"
        >
          Siguiente
        </button>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onConfirm={confirmDelete}
        onCancel={closeModal}
        title="Confirmar eliminación"
        message="¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer."
      />
    </div>
  );
};
export default ProductList;
