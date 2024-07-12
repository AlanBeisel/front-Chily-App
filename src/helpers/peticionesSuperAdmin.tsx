import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async (response: Response) => {
  if(!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }
  return response.json();
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if(!response.ok) {
    throw new Error ('Error al obtener los productos');
  }
  const products: Product[] = await response.json();
  return products;
};

export const createProduct = async (data: any) => {
  try{
    const response = await fetch(`${API_URL}/products/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al crear el producto', error);
    throw error;
  }
};

export const updateProduct = async (id: string, data:any) => {
  try {
    const response = await fetch(`${API_URL}/products/update/${id}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error al actualizar el producto', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/delete/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  }catch (error) {
    console.error('Error al eliminar el producto', error);
    throw error;
  }
};

export const PopularProduct = async (productId: string, status: boolean) => {
  try{
    const productIdNumber = parseInt(productId, 10)
    const statusString = status ? 'true' : 'false';
    console.log('productId (original):', productId);
    console.log('productIdNumber (convertido):', productIdNumber);
    console.log('status (booleano):', status);
    console.log('statusString (convertido a string):', statusString);
     const response = await fetch(`${API_URL}/products/popular?id=${productIdNumber}&status=${statusString}`, {
     method: 'PUT',
     headers: {
      'Content-Type': 'application/json',
    },
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error al marcar el producto como popular', error);
    throw error;
  }
};

export async function updateProductStock(productId: string, newStock:number) {
  try{
    const response = await fetch(`${API_URL}/products/stock?id=${productId}&stock=${newStock}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  } catch(error) {
    console.error('Error en la petición', error);
    throw error;
  }
}